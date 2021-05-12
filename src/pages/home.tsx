import { BrowserRouter, Route } from "react-router-dom";
import { useEffect } from "react";
import router from "next/router";
import Head from "next/head";
import { useRecoilState } from "recoil";
import { css } from "styled-jsx/css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import theme from "../lib/theme";
import { FastNoteDate } from "../lib/fastNoteDate";
import { DatabaseInfo } from "../lib/databaseInfo";
import { openNavbarState } from "../lib/atoms/uiAtoms";

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
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let dbRef = firebase.database().ref(`users/${user.uid}`);

        dbRef
          .get()
          .then((snapshot) => {
            if (snapshot.toJSON()) {
              const jsonStr = localStorage.getItem("database");
              let localDB = JSON.parse(jsonStr);
              let remoteDB = snapshot.toJSON();

              const locaUpdated = Number(localDB["lastUpdated"]);
              const remoteUpdated = Number(remoteDB["lastUpdated"]);

              if (remoteUpdated < locaUpdated) {
                remoteDB = localDB;
                dbRef.set(remoteDB);
              } else {
                localDB = remoteDB;
                localStorage.setItem("database", JSON.stringify(localDB));
              }
            } else {
              const fnd = new FastNoteDate();

              const newDatabase: DatabaseInfo = {
                memos: [
                  {
                    title: "サンプル",
                    category: "None",
                    tags: [],
                    star: false,
                    created: "",
                    updated: "",
                    content: "# サンプル",
                  },
                ],
                categories: ["None"],
                settings: {
                  theme: "",
                  fontSize: "20px",
                  font: "",
                },
                lastUpdated: fnd.getCurrentDate()
              };

              dbRef.set(newDatabase);
              localStorage.setItem("database", JSON.stringify(newDatabase));
            }
          })
          .catch((e) => {
            alert(`データベースからデータ取得時にエラーが発生しました。${e}`);
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
