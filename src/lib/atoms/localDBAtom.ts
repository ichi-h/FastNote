import { atom, selector } from "recoil";
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

import { FastNoteDate } from "../fastNoteDate";
import { CryptParams } from "../databaseInfo";

export const cryptParamsState = atom<CryptParams>({
  key: "cryptParamsState",
  default: { commonKey: "", iv: "" },
});

const localDBOriginState = atom({
  key: "localDBOriginState",
  default: "",
});

export const localDBState = selector({
  key: "locaDBState",
  get: ({ get }) => {
    return get(localDBOriginState);
  },
  set: ({ set, get }, inputValue: string) => {
    let localDB = JSON.parse(inputValue);

    const updateLocalDB = async (currentDate: number) => {
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
        const newLocalDB = JSON.parse(get(localDBOriginState));

        const before = localDB.lastUpdated;
        const after = newLocalDB.lastUpdated;

        if (before === after) {
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
      await update();
    };

    process().catch((e) => {
      if (e !== "データベースの更新は続行") {
        alert(`データベース更新中にエラーが発生しました。 \n${e}`);
      }
    });
  },
});
