import firebase from "firebase/app";
import "firebase/database";

import { FastNoteDate } from "../fastNoteDate";
import { DatabaseInfo } from "../databaseInfo";

export class FastNoteDatabase {
  private dbRef: firebase.database.Reference;

  public constructor(uid: string) {
    this.dbRef = firebase.database().ref(`users/${uid}`);
  }

  public syncDB() {
    return new Promise((resolve, reject) => {
      this.dbRef
        .get()
        .then((snapshot) => {
          if (snapshot.toJSON()) {
            const jsonStr = localStorage.getItem("database");
            let localDB = JSON.parse(jsonStr);
            let remoteDB = snapshot.toJSON();

            const locaUpdated = Number(localDB["lastUpdated"]);
            const remoteUpdated = Number(remoteDB["lastUpdated"]);

            if (remoteUpdated < locaUpdated) {
              remoteDB = localDB;
              this.dbRef.set(remoteDB);
              resolve("remoteDBをlocalDBに同期");
            } else {
              localDB = remoteDB;
              localStorage.setItem("database", JSON.stringify(localDB));
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
}
