import { useLocation } from "react-router-dom";
import { css } from "styled-jsx/css";
import { useRecoilValue } from "recoil";

import theme from "../lib/theme";
import {
  settingsContentState,
  currentCategoryState,
} from "../lib/atoms/uiAtoms";

export default function TopBar() {
  const currentCategory = useRecoilValue(currentCategoryState);
  const settingsContent = useRecoilValue(settingsContentState);

  const displayText = (currentCategory: string) => {
    const getURL = () => {
      try {
        return useLocation().pathname;
      } catch (e) {
        return "error";
      }
    };

    switch (getURL()) {
      case "/home":
        if (currentCategory === "all") return "すべてのカテゴリー";
        else return currentCategory;

      case "/home/settings":
        switch (settingsContent) {
          case "":
            return "設定";
          case "editor":
            return "efitor";
          case "user":
            return "user";
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
`;
