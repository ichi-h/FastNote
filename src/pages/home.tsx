import { BrowserRouter, Route, useLocation } from "react-router-dom";
import Head from "next/head";
import { useRecoilState, useRecoilValue } from "recoil";
import { css } from "styled-jsx/css";

import theme from "../lib/theme";
import {
  settingsContentState,
  currentCategoryState,
  openNavbarState,
} from "../lib/atoms/uiAtoms";

import MemoList from "../components/memo/memoList";
import Editor from "../components/memo/editor";
import SettingsList from "../components/settings/settingsList";
import SettingsContent from "../components/settings/settingsContent";
import Navbar from "../components/navbar";

function TopBar() {
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

function BlackCover() {
  const [checked, toggleCheck] = useRecoilState(openNavbarState);

  const handleClick = () => {
    toggleCheck(!checked);
  };

  return (
    <>
      <div className="black-cover" onClick={handleClick} />
      {blackCoverStyle(checked)}
    </>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Fast Note</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BlackCover />

      <div className="home">
        <TopBar />

        <BrowserRouter>
          <div className="home-canvas">
            <div className="separator">
              <div>
                <Route path="/home" exact component={MemoList} />
                <Route path="/home/settings" exact component={SettingsList} />
              </div>
              <div>
                <Route path="/home" exact component={Editor} />
                <Route
                  path="/home/settings"
                  exact
                  component={SettingsContent}
                />
              </div>
            </div>
          </div>

          <Navbar />
        </BrowserRouter>
      </div>

      <style jsx>{homeStyle}</style>
    </>
  );
}

const homeStyle = css`
  .home {
    width: 100vw;
    height: 100vh;
  }

  .home-canvas {
    position: relative;
  }

  .separator {
    display: flex;
    width: 100%;
    height: calc(100vh - ${theme.topBarHeight});
  }

  .separator > div:first-child,
  .separator > div:last-child {
    height: 100%;
    border: 1px solid black;
  }

  .separator > div:first-child {
    width: 33%;
  }

  .separator > div:last-child {
    width: 77%;
  }
`;

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

const blackCoverStyle = (checked: boolean) => {
  const whenOpenNavbar = (bool: boolean) => {
    if (bool) return ["0.5", "visible"];
    else return ["0", "hidden"];
  };

  const [opacity, visibility] = whenOpenNavbar(checked);

  return (
    <style jsx>{`
      .black-cover {
        position: absolute;
        top: 0;
        left: 0;
        background-color: black;
        width: 100%;
        height: 100%;
        transition: 0.3s;
        cursor: pointer;
        z-index: 100;

        opacity: ${opacity};
        visibility: ${visibility};
      }
    `}</style>
  );
};
