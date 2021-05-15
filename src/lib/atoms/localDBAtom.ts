import { atom, selector } from "recoil";
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

const localDBOriginState = atom({
  key: "localDBOriginState",
  default: localStorage.getItem("database"),
});

export const localDBState = selector({
  key: "locaDBState",
  get: ({ get }) => get(localDBOriginState),
  set: ({ set }, inputValue: string) => {
    set(localDBOriginState, inputValue);
    localStorage.setItem("database", inputValue);

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
          reject(new Error("データベースの更新は続行"));
        }
      });
    };

    const update = () => {
      return new Promise((resolve, reject) => {
        const uid = firebase.auth().currentUser.uid;

        firebase
          .database()
          .ref(`users/${uid}`)
          .set(JSON.parse(inputValue))
          .then(() => resolve("データベースを更新"))
          .catch((e) => reject(e));
      });
    };

    const process = async () => {
      await sleep(2000);
      await checkDifference();
      await update();
    };

    process().catch((e) => {
      if (e.message !== "データベースの更新は続行") {
        alert(`データベース更新中にエラーが発生しました。 \n${e}`);
      }
    });
  },
});
