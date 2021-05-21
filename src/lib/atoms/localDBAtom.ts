import { atom, selector } from "recoil";
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

import { FastNoteDate } from "../fastNoteDate";
import { encrypt, decrypt } from "../crypt";
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
    if (get(localDBOriginState) !== "") {
      return get(localDBOriginState);
    }

    const cryptParams = get(cryptParamsState);
    const encrypted = localStorage.getItem("database");

    return decrypt(encrypted, cryptParams.commonKey, cryptParams.iv);
  },
  set: ({ set, get }, inputValue: string) => {
    let localDB = JSON.parse(inputValue);
    const cryptParams = get(cryptParamsState);

    const updateLocalDB = async (currentDate: number) => {
      const encrypted = encrypt(
        inputValue,
        cryptParams.commonKey,
        cryptParams.iv
      );

      localStorage.setItem("database", encrypted);

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
        const encrypted = localStorage.getItem("database");

        const currentValue = decrypt(
          encrypted,
          cryptParams.commonKey,
          cryptParams.iv
        );

        if (inputValue === currentValue) {
          resolve("データベースの更新が停止");
        } else {
          reject("データベースの更新は続行");
        }
      });
    };

    const update = (currentDate: number) => {
      return new Promise((resolve, reject) => {
        localDB.lastUpdated = currentDate;

        const encrypted = encrypt(
          JSON.stringify(localDB),
          cryptParams.commonKey,
          cryptParams.iv
        );

        localStorage.setItem("database", encrypted);

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
