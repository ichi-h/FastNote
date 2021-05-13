import { atom } from "recoil";

import { Memo } from "../databaseInfo";

// 選択中のメモの情報
export const currentMemoState = atom({
  key: "currentMemoState",
  default: {
    title: "",
    category: "",
    tags: [""],
    star: false,
    created: "",
    updated: "",
    content: "",
  } as Memo,
});

// 現在選択中のメモのインデックス
export const memoIndexState = atom({
  key: "memoIndexState",
  default: "0"
});
