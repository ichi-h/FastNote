import { atom } from "recoil";

// 現在選択中のメモのインデックス
export const memoIndexState = atom({
  key: "memoIndexState",
  default: "-1",
});
