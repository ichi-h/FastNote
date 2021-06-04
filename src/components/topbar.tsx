import { css } from "styled-jsx/css";
import { useRecoilValue } from "recoil";

import theme from "../lib/theme";
import {
  settingsContentState,
  currentCategoryState,
  trashboxState,
  urlState,
} from "../lib/atoms/uiAtoms";

import OpenNavButton from "./topbar/openNavButton";
import AddMemoButton from "./topbar/addMemoButton";

export default function TopBar() {
  const currentCategory = useRecoilValue(currentCategoryState);
  const settingsContent = useRecoilValue(settingsContentState);
  const trashbox = useRecoilValue(trashboxState);
  const currentURL = useRecoilValue(urlState);

  const displayText = (currentCategory: string) => {
    switch (currentURL) {
      case "/home":
        if (trashbox) return "ごみ箱";
        else if (currentCategory === "all") return "すべてのカテゴリー";
        else return currentCategory;

      case "/home/settings":
        switch (settingsContent) {
          case "":
            return "設定";
          case "editor":
            return "エディター";
          case "user":
            return "ユーザー設定";
          case "about":
            return "このアプリについて";
        }

      case "error":
        return "Fast Note";
    }
  };

  return (
    <>
      <div className="top-bar">
        <OpenNavButton />
        <AddMemoButton />
        <div className="current-category">{displayText(currentCategory)}</div>
      </div>

      <style jsx>{topBarStyle}</style>
    </>
  );
}

const topBarStyle = css`
  .top-bar {
    position: relative;
    width: 100%;
    height: ${theme.topBarHeight};
    background-color: ${theme.mainColor};
  }

  .current-category {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    font-size: 3rem;
    color: white;
  }

  @media screen and (max-width: 550px) {
    .current-category {
      font-size: 2rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;
