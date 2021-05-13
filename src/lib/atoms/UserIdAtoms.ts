import { atom, selector, useSetRecoilState } from "recoil";
import firebase from "firebase/app";
import "firebase/auth";

const uidOriginState = atom({
  key: "uidOriginState",
  default: "",
});

export const uidState = selector({
  key: "uidState",
  get: ({ get }) => {
    const uid = get(uidOriginState);

    if (uid === "") {
      const user = firebase.auth().currentUser;
      const setUid = useSetRecoilState(uidOriginState);
      setUid(user.uid);

      return user.uid;
    } else {
      return uid;
    }
  },
  set: ({ set }, uid) => set(uidOriginState, uid),
});
