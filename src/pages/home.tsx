import { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Head from "next/head";
import router from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { css } from "styled-jsx/css";
import firebase from "firebase/app";

import "firebase/auth";

import theme from "../lib/theme";
import { openNavbarState } from "../lib/atoms/uiAtoms";
import { uidState } from "../lib/atoms/userIdAtoms";
import { SetupDatabase } from "../lib/firebase/database";

import TopBar from "../components/topbar/topbar";
import MemoList from "../components/memo/memoList";
import Editor from "../components/memo/editor";
import SettingsList from "../components/settings/settingsList";
import SettingsContent from "../components/settings/settingsContent";
import Navbar from "../components/navbar";

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
  const setUid = useSetRecoilState(uidState);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);

        const setupDB = new SetupDatabase(user.uid);
        setupDB.run()
          .catch((e) => {
            alert(`以下の理由によりデータベースのセットアップができませんでした。 \n${e}`);
            router.reload();
          });
      } else {
        router.push("/");
      }
    });
  });

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
