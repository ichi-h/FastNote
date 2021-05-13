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
          title: "サンプル",
          category: "None",
          tags: ["sample"],
          star: false,
          created: "",
          updated: "",
          content: "# サンプル",
        },
      ],
      categories: ["None"],
      settings: {
        theme: "",
        fontSize: "20px",
        font: "",
      },
      lastUpdated: fnd.getCurrentDate(),
    };

    this.dbRef.set(newDatabase);
    localStorage.setItem("database", JSON.stringify(newDatabase));
  }
}
