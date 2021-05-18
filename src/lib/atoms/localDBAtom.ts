import { atom, selector } from "recoil";
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

import { FastNoteDate } from "../fastNoteDate";

const localDBOriginState = atom({
  key: "localDBOriginState",
  default: "",
});

export const localDBState = selector({
  key: "locaDBState",
  get: ({ get }) => {
    if (get(localDBOriginState) === "") {
      return localStorage.getItem("database");
    }

    return get(localDBOriginState);
  },
  set: ({ set }, inputValue: string) => {
    let localDB = JSON.parse(inputValue);

    const updateLocalDB = async (currentDate: number) => {
      localStorage.setItem("database", inputValue);

      localDB.lastUpdated = currentDate;

      set(localDBOriginState, JSON.stringify(localDB));
    };

    const sleep = (ms: number) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };

    const checkDifference = () => {
      return new Promise((resolve, reject) => {
        const currentValue = localStorage.getItem("database");
        if (inputValue === currentValue) {
          resolve("データベースの更新が停止");
        } else {
          reject("データベースの更新は続行");
        }
      });
    };

    const sort = async () => {
      if (localDB.memos) {
        const keys = Object.keys(localDB.memos);

        let tmp = Number.MAX_SAFE_INTEGER;
        const sortedKeyList = keys.reduce((sorted, key) => {
          const updated = Number(localDB.memos[key].updated);
          if (updated <= tmp) {
            tmp = updated;
            sorted = sorted.concat(key);
          } else {
            const index = () => {
              for (let i = 0; i < sorted.length; i++) {
                if (localDB.memos[sorted[i]].updated <= updated) {
                  if (i === 0) return 0;
                  else return i - 1;
                }
              }
            };
            sorted.splice(index(), 0, key);
          }
          return sorted;
        }, []);

        localDB.memos = sortedKeyList.reduce((pre, key, i) => {
          pre[i] = localDB.memos[key];
          return pre;
        }, {});
      }
    };

    const update = (currentDate: number) => {
      return new Promise((resolve, reject) => {
        localDB.lastUpdated = currentDate;

        localStorage.setItem("database", JSON.stringify(localDB));

        const uid = firebase.auth().currentUser.uid;

        firebase
          .database()
          .ref(`users/${uid}`)
          .set(localDB)
          .then(() => resolve("データベースを更新"))
          .catch((e) => reject(e));
      });
    };

    const process = async () => {
      const fnd = new FastNoteDate();
      const currentDate = fnd.getCurrentDate();

      await updateLocalDB(currentDate);
      await sleep(2000);
      await checkDifference();
      await sort();
      await update(currentDate);
    };

    process().catch((e) => {
      if (e !== "データベースの更新は続行") {
        alert(`データベース更新中にエラーが発生しました。 \n${e}`);
      }
    });
  },
});
