import { atom, selector } from "recoil";

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

// trashboxを表示するか否か
export const trashboxState = atom({
  key: "trashboxState",
  default: false,
});

// starのみを表示するか否か
export const starState = atom({
  key: "starState",
  default: false,
});

// 新規カテゴリーが追加状態であるか否か
export const categoryInputState = atom({
  key: "categoryInputState",
  default: false,
});

// 現在のURL
export const urlState = atom({
  key: "urlState",
  default: "/home",
});

// ResizeHandleの座標
const posYOriginState = atom({
  key: "posYOriginState",
  default: -1,
});

export const posYState = selector<number>({
  key: "posYState",
  get: ({ get }) => {
    if (get(posYOriginState) === -1) {
      return document.documentElement.clientHeight * 0.3;
    }

    return get(posYOriginState);
  },
  set: ({ set }, input) => set(posYOriginState, input),
});
