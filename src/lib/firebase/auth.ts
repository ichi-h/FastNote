import router from "next/router";
import firebase from "firebase/app";
import "firebase/auth";

import { FastNoteDatabase } from "./database";

function successCallBack(authResult: any, redirectUrl?: string): boolean {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userDB = new FastNoteDatabase(user.uid);
      userDB.syncDB().catch((e) => {
        if (e.message === "NotFoundRemoteDB") {
          userDB.createNewDB();
        } else {
          alert(`データ取得中に下記のエラーが発生しました。 \n${e.message}`);
          router.reload();
        }
      });
    } else {
      router.push("/");
    }
  });

  return true;
}

export async function startUiAuth() {
  if (typeof window !== "undefined") {
    const firebaseui = await import("firebaseui");

    // Initialize the FirebaseUI Widget using Firebase.
    let ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());

    // FirebaseUI config.
    let uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: successCallBack,
      },
      signInSuccessUrl: "/home",
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInFlow: "popup",
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
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
