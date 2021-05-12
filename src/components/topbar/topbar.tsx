import { useLocation } from "react-router-dom";
import { css } from "styled-jsx/css";
import { useRecoilState, useRecoilValue } from "recoil";

import theme from "../../lib/theme";
import {
  settingsContentState,
  currentCategoryState,
  openNavbarState,
} from "../../lib/atoms/uiAtoms";

export default function TopBar() {
  const [checked, toggleCheck] = useRecoilState(openNavbarState);
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

  const checkHandle = () => {
    toggleCheck(!checked);
  };

  return (
    <>
      <div className="top-bar">
        <label className="checkbox-label" htmlFor="open-navbar">
          <input
            type="checkbox"
            className="open-navbar"
            name="open-navbar"
            id="open-navbar"
            defaultChecked={checked}
            onChange={checkHandle}
          />
          <div className="open-button">
            <div className="bar1" />
            <div className="bar2" />
            <div className="bar3" />
          </div>
        </label>

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

  .open-navbar {
    display: none;
  }

  .open-button {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    border: 1px solid white;
    width: 3rem;
    height: 3rem;
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
