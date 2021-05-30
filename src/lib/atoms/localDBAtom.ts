import { atom, selector } from "recoil";
import sha1 from "js-sha1";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { FastNoteDate } from "../fastNoteDate";

const localDBOriginState = atom({
  key: "localDBOriginState",
  default: "",
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((inputValue: string, oldValue: string) => {
        let localDB = JSON.parse(inputValue);
        let oldDB = JSON.parse(oldValue);

        const hashLocalDB = async () => {
          sessionStorage.setItem("hashDB", sha1(inputValue));
        };

        const sleep = (ms: number) => {
          return new Promise((resolve) => {
            setTimeout(resolve, ms);
          });
        };

        const checkDifference = () => {
          return new Promise((resolve, reject) => {
            const before = sha1(inputValue);
            const after = sessionStorage.getItem("hashDB");

            if (before === after) {
              resolve("データベースの更新が停止");
            } else {
              reject("データベースの更新は続行");
            }
          });
        };

        const update = () => {
          return new Promise((resolve, reject) => {
            sessionStorage.setItem("hashDB", undefined);
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
          await hashLocalDB();
          await sleep(2000);
          await checkDifference();
          await update();
        };

        process().catch((e) => {
          if (e !== "データベースの更新は続行") {
            alert(`データベース更新中にエラーが発生しました。 \n${e}`);
          }
        });
      });
    },
  ],
});

export const localDBState = selector({
  key: "locaDBState",
  get: ({ get }) => {
    return get(localDBOriginState);
  },
  set: ({ set }, inputValue: string) => {
    let localDB = JSON.parse(inputValue);

    const fnd = new FastNoteDate();
    localDB.lastUpdated = fnd.getCurrentDate();

    set(localDBOriginState, JSON.stringify(localDB));
  },
});
