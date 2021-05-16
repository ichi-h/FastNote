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
    const updateLocalDB = async () => {
      const fnd = new FastNoteDate();

      let localDB = JSON.parse(inputValue);
      localDB.lastUpdated = fnd.getCurrentDate();

      localStorage.setItem("database", JSON.stringify(localDB));
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
      await updateLocalDB();
      await sleep(2000);
      await checkDifference();
      await update();
    };

    process().catch((e) => {
      if (e !== "データベースの更新は続行") {
        alert(`データベース更新中にエラーが発生しました。 \n${e}`);
      }
    });
  },
});
