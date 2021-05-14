import firebase from "firebase/app";
import "firebase/database";

import { FastNoteDate } from "../fastNoteDate";
import { DatabaseInfo } from "../databaseInfo";

export class FastNoteDatabase {
  private dbRef: firebase.database.Reference;
  private localDB: any;

  public constructor(uid: string) {
    this.dbRef = firebase.database().ref(`users/${uid}`);
    this.localDB = JSON.parse(localStorage.getItem("database"));
    this.implObservers(this.localDB);
  }

  public syncDB() {
    return new Promise((resolve, reject) => {
      this.dbRef
        .get()
        .then((snapshot) => {
          if (snapshot.toJSON()) {
            let remoteDB = snapshot.toJSON();

            const locaUpdated = Number(this.localDB["lastUpdated"]);
            const remoteUpdated = Number(remoteDB["lastUpdated"]);

            if (remoteUpdated < locaUpdated) {
              this.dbRef.set(this.localDB);
              resolve("remoteDBをlocalDBに同期");
            } else {
              localStorage.setItem("database", JSON.stringify(remoteDB));
              resolve("localDBをremoteDBに同期");
            }
          } else {
            reject(new Error("NotFoundRemoteDB"));
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  public createNewDB() {
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

    this.dbRef.set(newDatabase);
    localStorage.setItem("database", JSON.stringify(newDatabase));
  }

  public getLocalDB() {
    return this.localDB;
  }

  private implObservers(obj: object) {
    const implObserver = (obj_: object, prop: string) => {
      let target = obj_[prop];
      Object.defineProperty(obj_, prop, {
        get: () => target,
        set: (newValue) => {
          target = newValue;
          this.updateRemoteDB();
        },
        configurable: true,
      });
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
    const sleep = (ms: number) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };

    const checkDifference = (ms: number) => {
      return new Promise((resolve, reject) => {
        const oldDB = JSON.stringify(this.localDB);

        sleep(ms).then(() => {
          const newDB = JSON.stringify(this.localDB);

          if (oldDB === newDB) {
            resolve("データベースの更新が停止");
          } else {
            reject(new Error("データベースの更新は続行"));
          }
        });
      });
    };

    const update = () => {
      return new Promise((resolve, reject) => {
        this.dbRef
          .set(this.localDB)
          .then(() => resolve("データベースを更新"))
          .catch((e) => reject(e));
      });
    };

    const ms = 2000;

    checkDifference(ms)
      .then(() => {
        update();
      })
      .catch((e) => {
        if (e.message !== "データベースの更新は続行") {
          alert(`データベース更新中にエラーが発生しました。 \n${e}`);
        }
      });
  }
}
