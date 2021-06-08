import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { getCurrentDate } from "../fastNoteDate";
import { FastNoteDB } from "../fastNoteDB";

export class SetupDatabase {
  private dbRef: firebase.database.Reference;

  public constructor(uid: string) {
    this.dbRef = firebase.database().ref(`users/${uid}`);
  }

  public run(callback: (db: string) => void) {
    return new Promise((resolve, reject) => {
      const checkRemoteDB = async () => {
        await this.remoteIsExist().then(async (bool) => {
          if (!bool) {
            await this.createRemoteDB();
          }
        });
      };

      const getRemoteDB = () => {
        return new Promise<string>((resolve, reject) => {
          this.dbRef
            .get()
            .then((snapshot) => {
              resolve(JSON.stringify(snapshot.toJSON()));
            })
            .catch((e) => reject(e));
        });
      };

      const checkFontSize = async () => {
        const fontSize: string = localStorage.getItem("fontSize");
        if (!parseInt(fontSize)) {
          localStorage.setItem("fontSize", "20");
        }
      };

      checkRemoteDB()
        .then(getRemoteDB)
        .then((snapshot) => callback(snapshot))
        .then(checkFontSize)
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
      const currentDate = getCurrentDate(new Date());

      const newDatabase: FastNoteDB = {
        memos: {
          "0": {
            title: "ようこそ、Fast Noteへ！",
            category: "FastNote",
            tags: {
              "0": "FastNote",
              "1": "HowToUse",
            },
            star: false,
            trash: false,
            created: currentDate,
            updated: currentDate,
            content: memoContent,
          },
        },
        categories: {
          "0": "FastNote",
          "1": "None",
        },
        lastUpdated: currentDate,
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

Fast Noteはオートセーブ機能に対応しており、変更が加わった際には自動的にデータをクラウドにアップロードします。`;
