import { atom } from "recoil";

import { Memo } from "../databaseInfo";

// 選択中のメモの情報
export const memoState = atom({
  key: "memoState",
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
