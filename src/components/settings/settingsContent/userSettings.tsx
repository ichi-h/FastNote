import router from "next/router";
import firebase from "firebase/app";

import "firebase/database";
import "firebase/auth";

import { generalStyle } from "../settingsContent";

const UserID = () => {
  const userID  = firebase.auth().currentUser.uid;

  return (
    <>
      <div className="settings-item">
        <h2>ユーザーID</h2>
        <p>あなたの ID は、<b>{userID}</b> です。</p>
      </div>

      <style jsx>{generalStyle}</style>
    </>
  );
};

const RemoveAccout = () => {
  const handleClick = () => {
    const res = confirm("本当によろしいですか？");

    if (res) {
      const user = firebase.auth().currentUser;
      const remoteDB = firebase.database().ref(`users/${user.uid}`);

      remoteDB
        .remove()
        .then(() => {
          localStorage.setItem("database", undefined);

          user
            .delete()
            .then(() => {
              router.push("/");
            })
            .catch((e) => {
              alert(`アカウント削除に失敗しました。 \n${e}`);
            });
        })
        .catch((e) => {
          alert(`データベースの削除に失敗しました。 \n${e}`);
        });
    }
  };

  return (
    <>
      <div className="settings-item">
        <h2>アカウントの削除</h2>
        <p>
          アカウントを削除した場合、保存したメモ、設定等のFast
          Noteに関連する全てのデータが削除されます。
        </p>
        <button onClick={handleClick}>アカウントを削除する</button>
      </div>

      <style jsx>{generalStyle}</style>
    </>
  );
};

export default function UserSettings() {
  return (
    <div className="user-settings">
      <UserID />
      <RemoveAccout />
    </div>
  );
}
