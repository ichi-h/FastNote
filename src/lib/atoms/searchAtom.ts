import { atom } from "recoil";

// 検索するキーワード
export const searchKeywordState = atom({
  key: "searchKeywordState",
  default: "",
});
