import router from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { css } from "styled-jsx/css";
import firebase from "firebase/app";

import "firebase/auth";
import "firebaseui/dist/firebaseui.css";

import { startUiAuth } from "../lib/firebase/auth";
import { SetupDatabase } from "../lib/firebase/database";
import { cryptParamsState } from "../lib/atoms/localDBAtom";
import theme from "../lib/theme";

export default function LandingPage(): JSX.Element {
  const setCryptParams = useSetRecoilState(cryptParamsState);

  useEffect(() => {
    startUiAuth();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const setupDB = new SetupDatabase(user.uid);
        setupDB
          .run()
          .then(() => {
            setupDB.getCryptParams().then((cryptParams) => {
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
            router.push("/home");
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
                router.push("/home");
              }
            } else {
              alert(
                `以下の理由によりデータベースのセットアップができませんでした。 \n${e}`
              );
            }
            //router.reload();
          });
      }
    });
  });

  return (
    <>
      <div className="bg">
        <div className="login-box">
          <div className="title">
            <h1>Fast Note</h1>
            <h2>素早く、手軽に。いつでも、どこでも。</h2>
          </div>

          <div className="logo">ロゴマーク</div>

          <div className="explain">
            <p>
              Fast Noteは、マークダウン形式でメモが取れるアプリケーションです。
            </p>
            <p>
              取ったメモはクラウド上に保存され、ログインしたどの端末からでも簡単にアクセスできます。
            </p>
          </div>

          <div id="firebaseui-auth-container" />
          <div id="loader" />
        </div>

        <style jsx>{homeStyle}</style>
      </div>
    </>
  );
}

const homeStyle = css`
  .bg,
  .login-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .bg {
    background-color: ${theme.mainColor};
    width: 100vw;
    height: 100vh;
  }

  .login-box {
    background-color: white;
    width: 30vw;
    padding: 2rem 0;
    text-align: center;
    box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.3);
  }

  .title > h1 {
    font-size: 4rem;
  }

  .title > h2 {
    font-size: 2rem;
    font-weight: normal;
  }

  .logo {
    border: 1px solid black;
    width: 20rem;
    height: 20rem;
    margin: 2rem 0;
  }

  .explain {
    margin-bottom: 2rem;
    width: 80%;
    font-size: 2rem;
  }
`;
