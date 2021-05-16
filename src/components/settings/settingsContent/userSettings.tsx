import router from "next/router";
import { useRecoilValue } from "recoil";
import firebase from "firebase/app";

import "firebase/database";
import "firebase/auth";

import { generalStyle } from "../settingsContent";
import { localDBState } from "../../../lib/atoms/localDBAtom";

const UserID = () => {
  const userID = firebase.auth().currentUser.uid;

  return (
    <>
      <div className="settings-item">
        <h2>ユーザーID</h2>
        <p>
          あなたの ID は、<b>{userID}</b> です。
        </p>
      </div>

      <style jsx>{generalStyle}</style>
    </>
  );
};

const RemoveAccout = () => {
  const localDB = JSON.parse(useRecoilValue(localDBState));

  const handleClick = () => {
    const res = confirm(
      "本当によろしいですか？ \n（アカウントを削除するためには、再度ログインを行う必要があります。）"
    );

    if (res) {
      const user = firebase.auth().currentUser;
      const remoteDB = firebase.database().ref(`users/${user.uid}`);

      const reautholize = async () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().languageCode = "jp";

        await firebase.auth().signInWithPopup(provider);
      };

      const removeLocalDB = async () => {
        localStorage.setItem("database", undefined);
      };

      const removeRemoteDB = async () => {
        await remoteDB.remove();
      };

      const removeAccount = async () => {
        await user.delete();
      };

      const process = async () => {
        await reautholize();
        await removeLocalDB();
        await removeRemoteDB();
        await removeAccount();
      };

      process()
        .then(() => {
          alert("アカウントは正常に削除されました。");
          router.push("/");
        })
        .catch((e) => {
          localStorage.setItem("database", JSON.stringify(localDB));
          remoteDB.set(localDB);
          alert(`下記の理由によりアカウント削除に失敗しました。 \n${e}`);
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
