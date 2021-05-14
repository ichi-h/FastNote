import router from "next/router";
import { SetterOrUpdater } from "recoil";
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
        await this.remoteIsExit()
          .then((bool) => {
            if (!bool) {
              this.createRemoteDB();
            }
          });
      };
  
      const syncRemoteAndLocal = async () => {
        this.syncDB();
      };
  
      const process = async () => {
        await checkRemoteDB();
        await syncRemoteAndLocal();
      };
  
      process()
        .then(() => resolve("セットアップ完了"))
        .catch((e) => reject(e));
    });
  }

  private remoteIsExit() {
    return new Promise((resolve, reject) => {
      this.dbRef.get().then((snapshot) => {
        if (snapshot.toJSON) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch((e) => {
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
            created: "20210501124512",
            updated: "20210501124512",
            content: "# サンプル1",
          },
          {
            title: "サンプル2",
            category: "None",
            tags: ["def"],
            star: false,
            created: "20210501124513",
            updated: "20210501124519",
            content: "# サンプル2",
          },
          {
            title: "サンプル3",
            category: "None",
            tags: ["ghi"],
            star: false,
            created: "20210501124534",
            updated: "20210501124555",
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

      this.dbRef.set(newDatabase).then(() => {
        resolve("remoteDB作成完了");
      }).catch((e) => {
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
          const localDB = JSON.parse(localDBStr);
          const remoteDB = snapshot.toJSON();

          if (localDBStr === "undefined") {
            localStorage.setItem("database", JSON.stringify(remoteDB));
            resolve("localDBをremoteDBに同期");
          } else {
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

export class ObserveLocalDB {
  private dbRef: firebase.database.Reference;
  private localDB: any;

  public constructor(uid: string) {
    this.dbRef = firebase.database().ref(`users/${uid}`);
    this.localDB = JSON.parse(localStorage.getItem("database"));
    this.implObservers(this.localDB);
  }

  public getLocalDB() {
    return this.localDB;
  }

  private implObservers(obj: object) {
    const implObserver = (obj_: object, prop: string) => {
      if (prop !== "updated") {
        let target = obj_[prop];
        Object.defineProperty(obj_, prop, {
          get: () => target,
          set: () => {
            this.updateRemoteDB();
          },
          configurable: true,
        });
      }
    };

    Object.getOwnPropertyNames(obj).forEach((prop) => {
      let target = obj[prop];
      if (target instanceof Object && !Array.isArray(target)) {
        this.implObservers(target);
      } else {
        implObserver(obj, prop);
      }
    });
  }

  private updateRemoteDB() {
    let oldDB: string;
    let newDB: string;

    const getOldDB = () => {
      return new Promise((resolve) => {
        oldDB = JSON.stringify(this.localDB);
        console.log("oldDB取得");
        resolve("oldDBを取得");
      });
    };

    const sleep = (ms: number) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };

    const checkDifference = () => {
      return new Promise((resolve, reject) => {
        console.log("2秒立った");
        newDB = JSON.stringify(this.localDB);
        if (oldDB === newDB) {
          resolve("データベースの更新が停止");
        } else {
          reject(new Error("データベースの更新は続行"));
        }
      });
    };

    const update = () => {
      return new Promise((resolve, reject) => {
        const fnd = new FastNoteDate();
        this.localDB.lastUpdated = fnd.getCurrentDate();

        console.log("更新したぞい");

        this.dbRef
          .set(this.localDB)
          .then(() => resolve("データベースを更新"))
          .catch((e) => reject(e));
      });
    };

    const process = async () => {
      await getOldDB();
      await sleep(2000);
      await checkDifference();
      await update();
    };

    process().catch((e) => {
      if (e.message !== "データベースの更新は続行") {
        alert(`データベース更新中にエラーが発生しました。 \n${e}`);
      }
    });
  }
}
