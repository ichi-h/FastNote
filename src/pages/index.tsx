import Head from "next/head";
import router from "next/router";
import { useEffect } from "react";
import { css } from "styled-jsx/css";
import { useSetRecoilState } from "recoil";
import firebase from "firebase/app";

import "firebase/auth";
import "firebaseui/dist/firebaseui.css";

import { uidState } from "../lib/atoms/userIdAtoms";
import { startUiAuth } from "../lib/firebase/auth";
import { SetupDatabase } from "../lib/firebase/database";
import theme from "../lib/theme";

export default function LandingPage(): JSX.Element {
  const setUid = useSetRecoilState(uidState);

  useEffect(() => {
    startUiAuth();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);

        const setupDB = new SetupDatabase(user.uid);
        setupDB.run()
          .then(() => router.push("/home"))
          .catch((e) => {
            alert(`以下の理由によりデータベースのセットアップができませんでした。 \n${e}`);
            router.reload();
          });
      }
    });
  });

  return (
    <>
      <Head>
        <title>Fast Note</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
