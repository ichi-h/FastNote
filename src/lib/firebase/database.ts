import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { FastNoteDate } from "../fastNoteDate";
import { DatabaseInfo } from "../databaseInfo";

export class SetupDatabase {
  private dbRef: firebase.database.Reference;

  public constructor(uid: string) {
    this.dbRef = firebase.database().ref(`users/${uid}`);
  }

  public run() {
    return new Promise((resolve, reject) => {
      const checkRemoteDB = async () => {
        await this.remoteIsExist().then(async (bool) => {
          if (!bool) {
            await this.createRemoteDB();
          }
        });
      };

      const process = async () => {
        await checkRemoteDB();
        await this.syncDB();
      };

      process()
        .then(() => resolve("セットアップ完了"))
        .catch((e) => reject(e));
    });
  }

  private remoteIsExist() {
    return new Promise((resolve, reject) => {
      this.dbRef
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  private createRemoteDB() {
    return new Promise((resolve, reject) => {
      const fnd = new FastNoteDate();

      const newDatabase: DatabaseInfo = {
        memos: [
          {
            title: "サンプル1",
            category: "sample",
            tags: ["abc", "def", "ghi"],
            star: false,
            trash: false,
            created: fnd.getCurrentDate(),
            updated: fnd.getCurrentDate(),
            content: "# サンプル1",
          },
          {
            title: "サンプル2",
            category: "None",
            tags: ["def"],
            star: false,
            trash: false,
            created: fnd.getCurrentDate(),
            updated: fnd.getCurrentDate(),
            content: "# サンプル2",
          },
          {
            title: "サンプル3",
            category: "None",
            tags: ["ghi"],
            star: false,
            trash: false,
            created: fnd.getCurrentDate(),
            updated: fnd.getCurrentDate(),
            content: "# サンプル3",
          },
        ],
        categories: ["None", "sample"],
        settings: {
          theme: "",
          fontSize: "20",
          font: "",
        },
        lastUpdated: fnd.getCurrentDate(),
      };

      this.dbRef
        .set(newDatabase)
        .then(() => {
          resolve("remoteDB作成完了");
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  private syncDB() {
    return new Promise((resolve, reject) => {
      this.dbRef
        .get()
        .then((snapshot) => {
          const localDBStr = localStorage.getItem("database");
          const remoteDB = snapshot.toJSON();

          if (localDBStr === "undefined" || localDBStr === "null") {
            localStorage.setItem("database", JSON.stringify(remoteDB));
            resolve("localDBをremoteDBに同期");
          } else {
            const localDB = JSON.parse(localDBStr);

            const locaUpdated = Number(localDB["lastUpdated"]);
            const remoteUpdated = Number(remoteDB["lastUpdated"]);

            if (remoteUpdated < locaUpdated) {
              this.dbRef.set(localDB);
              resolve("remoteDBをlocalDBに同期");
            } else {
              localStorage.setItem("database", JSON.stringify(remoteDB));
              resolve("localDBをremoteDBに同期");
            }
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
