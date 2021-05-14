import router from "next/router";
import { SetterOrUpdater } from "recoil";
import firebase from "firebase/app";

import "firebase/auth";

import { FastNoteDatabase, createNewLocalDB } from "../firebase/database";

export async function startUiAuth() {
  if (typeof window !== "undefined") {
    const firebaseui = await import("firebaseui");

    // Initialize the FirebaseUI Widget using Firebase.
    let ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());

    // FirebaseUI config.
    let uiConfig = {
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInFlow: "popup",
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      signInSuccessUrl: "/",
      // Terms of service url/callback.
      tosUrl: "/tos/",
      // Privacy policy url/callback.
      privacyPolicyUrl: function () {
        window.location.assign("/pp/");
      },
    };

    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
  }
}

export function checkUserState(setUid: SetterOrUpdater<string>) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);

      if (localStorage.getItem("database") === "undefined") {
        console.log("作ったで");
        createNewLocalDB();
      }

      const userDB = new FastNoteDatabase(user.uid);
      userDB
        .syncDB()
        .then(() => {
          router.push("/home");
        })
        .catch((e) => {
          if (e.message === "NotFoundRemoteDB") {
            userDB
              .createNewDB()
              .then(() => {
                router.push("/home");
              })
              .catch((e) => {
                alert(
                  `データベース作成中にエラーが発生しました。 \n${e.message}`
                );
              });
          } else {
            alert(`データ取得中に下記のエラーが発生しました。 \n${e.message}`);
            router.reload();
          }
        });
    } else {
      router.push("/");
    }
  });
}
