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
          this.dbRef.get().then((snapshot) => {
            resolve(JSON.stringify(snapshot.toJSON()));
          }).catch((e) => reject(e));
        })
      }

      checkRemoteDB()
        .then(getRemoteDB)
        .then((snapshot) => callback(snapshot))
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

Fast Noteはオートセーブ機能に対応しており、変更が加わった際には自動的にデータをクラウドにアップロードします。  
また、メモデータはキャッシュとして保持されるため、オフライン時でも使用することができます。`;
