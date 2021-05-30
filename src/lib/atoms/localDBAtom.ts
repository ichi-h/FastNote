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
      onSet(async (inputValue, oldValue) => {
        let localDB = JSON.parse(String(inputValue));
        let oldDB = JSON.parse(String(oldValue));

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
              sessionStorage.setItem("hashDB", undefined);
              resolve("データベースの更新が停止");
            } else {
              reject("データベースの更新は続行");
            }
          });
        };

        const createUpdateObj = () => {
          return new Promise<object>((resolve) => {
            const targets = Object.keys(localDB);
            const uid = firebase.auth().currentUser.uid;

            const updateObj = targets.reduce((pre, target) => {
              const current = sha1(JSON.stringify(localDB[target]));
              const old = sha1(JSON.stringify(oldDB[target]));

              if (current !== old) {
                pre[`users/${uid}/${target}`] = localDB[target];
              }
              return pre;
            }, {});

            console.log(updateObj);
            

            resolve(updateObj);
          });
        };

        const update = async (obj: object) => {
          firebase
            .database()
            .ref()
            .update(obj);
        };

        const process = async () => {
          await hashLocalDB();
          await sleep(2000);
          await checkDifference();
          await createUpdateObj()
            .then((obj) => update(obj));
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
