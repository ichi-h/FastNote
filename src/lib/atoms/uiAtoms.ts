import { atom } from "recoil";

// 選択されているカテゴリー
export const currentCategoryState = atom({
  key: "currentCategoryState",
  default: "all",
});

// 選択されている設定項目
export const settingsContentState = atom({
  key: "settingsContentState",
  default: "",
});

// navbarの開閉状態
export const openNavbarState = atom({
  key: "openNavbarState",
  default: false,
});
