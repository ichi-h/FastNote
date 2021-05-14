import { atom, selector, useSetRecoilState } from "recoil";

export const uidState = atom({
  key: "uidState",
  default: "",
});
