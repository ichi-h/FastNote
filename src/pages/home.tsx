import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import router from "next/router";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import firebase from "firebase/app";

import "firebase/auth";

import theme from "../lib/theme";
import { openNavbarState, posYState } from "../lib/atoms/uiAtoms";
import { localDBState } from "../lib/atoms/localDBAtom";
import { SetupDatabase } from "../lib/firebase/database";

import TopBar from "../components/topbar";
import MemoList from "../components/memo/memoList";
import Editor from "../components/memo/editor";
import SettingsList from "../components/settings/settingsList";
import SettingsContent from "../components/settings/settingsContent";
import ResizeHandle from "../components/memo/resizeHandle";
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

function ListContent() {
  if (window.matchMedia("(max-width: 1050px)").matches) {
    return (
      <>
        <ResizeHandle />
        <Route path="/home" exact component={MemoList} />
        <Route path="/home/settings" exact component={SettingsList} />
      </>
    );
  } else {
    return (
      <>
        <Route path="/home" exact component={MemoList} />
        <Route path="/home/settings" exact component={SettingsList} />
      </>
    );
  }
}

export default function Home() {
  const setLocalDB = useSetRecoilState(localDBState);
  const posY = useRecoilValue(posYState);
  const [isShow, toggle] = useState(false);

  useEffect(() => {
    if (!isShow) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const setupDB = new SetupDatabase(user.uid);
          setupDB
            .run(setLocalDB)
            .then(() => {
              toggle(true);
            })
            .catch((e) => {
              alert(
                `以下の理由によりデータベースのセットアップができませんでした。 \n${e}`
              );
              //router.reload();
            });
        } else {
          router.push("/");
        }
      });
    }
  });

  if (isShow) {
    return (
      <>
        <BlackCover />

        <div className="home">
          <TopBar />

          <BrowserRouter>
            <div className="separator">
              <div>
                <ListContent />
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

            <Navbar />
          </BrowserRouter>
        </div>

        {homeStyle(posY)}
      </>
    );
  } else {
    return <Loading />;
  }
}

const homeStyle = (posY: number) => {
  const clientHeight = document.documentElement.clientHeight;

  const homeHeight = `${clientHeight}px - ${theme.topBarHeight}`;

  return (
    <style jsx>{`
      .home {
        width: 100vw;
        height: 100vh;
      }

      .separator {
        position: relative;
        display: flex;
        width: 100%;
        height: calc(${homeHeight});
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
          width: 100%;
        }

        .separator > div:first-child,
        .separator > div:last-child {
          width: 100%;
        }

        .separator > div:first-child {
          position: absolute;
          bottom: 0;
          height: calc(100% - ${posY}px);
          background-color: white;
          border-top: 1px solid ${theme.gray};
          filter: drop-shadow(5px 5px 3px rgba(0, 0, 0, 0.5));
          z-index: 2;
          transition: 0.1s;
        }

        .separator > div:last-child {
          position: absolute;
          top: 0;
          height: 100%;
          z-index: 1;
        }
      }
    `}</style>
  );
};

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
