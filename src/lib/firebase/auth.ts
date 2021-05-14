import firebase from "firebase/app";

import "firebase/auth";

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
      signInSuccessUrl: "/home",
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
