import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { FastNoteDate } from "../fastNoteDate";
import { DatabaseInfo, CryptParams } from "../databaseInfo";
import { encrypt, decrypt, getRandStr } from "../crypt";

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

  public getCryptParams() {
    return new Promise<CryptParams>((resolve, reject) => {
      this.dbRef
        .get()
        .then((snapshot) => {
          resolve(snapshot.toJSON()["cryptParams"]);
        })
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
            title: "ようこそ、Fast Noteへ！",
            category: "FastNote",
            tags: ["FastNote", "HowToUse"],
            star: false,
            trash: false,
            created: fnd.getCurrentDate(),
            updated: fnd.getCurrentDate(),
            content: memoContent,
          },
        ],
        categories: ["FastNote", "None"],
        settings: {
          theme: "",
          fontSize: "20",
          font: "",
        },
        lastUpdated: fnd.getCurrentDate(),
        cryptParams: {
          commonKey: getRandStr(32),
          iv: getRandStr(32),
        },
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
          const localDBStr = String(localStorage.getItem("database"));
          const remoteDB = snapshot.toJSON();
          const cryptParams: CryptParams = remoteDB["cryptParams"];

          if (localDBStr === "undefined" || localDBStr === "null") {
            const encrypted = encrypt(
              JSON.stringify(remoteDB),
              cryptParams.commonKey,
              cryptParams.iv
            );

            localStorage.setItem("database", encrypted);
            resolve("localDBをremoteDBに同期");
          } else {
            const decrypted = decrypt(
              localDBStr,
              cryptParams.commonKey,
              cryptParams.iv
            );

            const localDB = JSON.parse(decrypted);

            const locaUpdated = Number(localDB["lastUpdated"]);
            const remoteUpdated = Number(remoteDB["lastUpdated"]);

            if (remoteUpdated < locaUpdated) {
              this.dbRef.set(localDB);
              resolve("remoteDBをlocalDBに同期");
            } else {
              const encrypted = encrypt(
                JSON.stringify(remoteDB),
                cryptParams.commonKey,
                cryptParams.iv
              );
              localStorage.setItem("database", encrypted);
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

const memoContent = `# ようこそ、Fast Noteへ！

## Fast Noteとは？

Fast Noteとは、**マークダウン形式で取ったメモをクラウド上に保存し管理できるメモアプリ** です。  
保存したメモはログインしたどの端末からでもアクセス・更新ができます。

### 簡単な使い方

まずは右上のプラスボタンから、新しいメモを追加してみましょう！

エディター画面の上部でタイトル・カテゴリー・タグといったメモの情報、下部で本文を入力できます。  
カテゴリーの追加は左上にある三線ボタンからメニューバーを表示し、「カテゴリー」横にあるプラスボタンから行えます。  
また、タグは ", （カンマ+半角空白）" で区切ることで追加できます。

Fast Noteはオートセーブ機能に対応しており、変更が加わった際には自動的にデータをクラウドにアップロードします。  
また、データはブラウザ内のストレージにも保存されるため、オフライン時でも使用することができます。`;
