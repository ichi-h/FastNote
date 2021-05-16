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
    const updateLocalDB = async (currentDate: number) => {
      localStorage.setItem("database", inputValue);

      let localDB = JSON.parse(inputValue);
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

    const update = (currentDate: number) => {
      return new Promise((resolve, reject) => {
        let localDB = JSON.parse(inputValue);
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
      await update(currentDate);
    };

    process().catch((e) => {
      if (e !== "データベースの更新は続行") {
        alert(`データベース更新中にエラーが発生しました。 \n${e}`);
      }
    });
  },
});
