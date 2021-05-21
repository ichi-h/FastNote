import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import router from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { css } from "styled-jsx/css";
import firebase from "firebase/app";

import "firebase/auth";

import theme from "../lib/theme";
import { openNavbarState } from "../lib/atoms/uiAtoms";
import { cryptParamsState } from "../lib/atoms/localDBAtom";
import { SetupDatabase } from "../lib/firebase/database";

import TopBar from "../components/topbar";
import MemoList from "../components/memo/memoList";
import Editor from "../components/memo/editor";
import SettingsList from "../components/settings/settingsList";
import SettingsContent from "../components/settings/settingsContent";
import Navbar from "../components/navbar";
import Loading from "../components/loading";

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
  const [isShow, toggle] = useState(false);
  const setCryptParams = useSetRecoilState(cryptParamsState);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const setupDB = new SetupDatabase(user.uid);
        setupDB
          .run()
          .then(async () => {
            await setupDB.getCryptParams().then((cryptParams) => {
              setCryptParams(cryptParams);

              const date = new Date();
              date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
              document.cookie = `commonKey=${
                cryptParams.commonKey
              };expires=${date.toUTCString()}`;
              document.cookie = `iv=${
                cryptParams.iv
              };expires=${date.toUTCString()}`;
            });
          })
          .then(() => {
            toggle(true);
          })
          .catch((e) => {
            if (e.message === "Error: Client is offline.") {
              const localCryptParams = document.cookie
                .split(";")
                .map((value) => value.split("=")[1]);
              if (localCryptParams[0] !== undefined) {
                setCryptParams({
                  commonKey: localCryptParams[0],
                  iv: localCryptParams[1],
                });
                toggle(true);
              } else {
                router.push("/");
              }
            } else {
              alert(
                `以下の理由によりデータベースのセットアップができませんでした。 \n${e}`
              );
            }
            //router.reload();
          });
      } else {
        router.push("/");
      }
    });
  });

  if (isShow) {
    return (
      <>
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
  } else {
    return (
      <>
        <div className="home">
          <Loading />
        </div>
        <style jsx>{loadingLayoutStyle}</style>
      </>
    );
  }
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
  }

  .separator > div:first-child {
    width: 30%;
  }

  .separator > div:last-child {
    width: 70%;
  }

  @media screen and (max-width: 1050px) {
    .separator {
      display: flex;
      flex-direction: column-reverse;
      width: 100%;
      height: calc(100vh - ${theme.topBarHeight});
    }

    .separator > div:first-child,
    .separator > div:last-child {
      height: 50%;
    }

    .separator > div:first-child {
      width: 100%;
    }

    .separator > div:last-child {
      width: 100%;
      border-bottom: 2px solid rgb(150, 150, 150);
    }
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

const loadingLayoutStyle = css`
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: ${theme.mainColor};
  }
`;
