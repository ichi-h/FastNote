import router from "next/router";
import { useEffect, useState } from "react";
import { css } from "styled-jsx/css";
import firebase from "firebase/app";

import "firebase/auth";
import "firebaseui/dist/firebaseui.css";

import { startUiAuth } from "../lib/firebase/auth";
import theme from "../lib/theme";

import Loading from "../components/loading";

export default function LandingPage(): JSX.Element {
  const [isShow, toggle] = useState(false);

  useEffect(() => {
    if (!isShow) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          router.push("/home");
        } else {
          toggle(true);
          startUiAuth();
        }
      });
    }
  });

  if (isShow) {
    return (
      <>
        <div className="bg">
          <div className="login-box">
            <div className="title">
              <h1>Fast Note</h1>
              <h2>素早く、手軽に。いつでも、どこでも。</h2>
            </div>

            <div className="logo"></div>

            <div className="explain">
              <p>
                Fast
                Noteは、マークダウン形式でメモが取れるアプリケーションです。
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
  } else {
    return <Loading />;
  }
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
    background-image: url("/assets/img/logo_black.png");
    background-size: cover;
    width: 20rem;
    height: 20rem;
    margin: 2rem 0;
  }

  .explain {
    margin-bottom: 2rem;
    width: 80%;
    font-size: 2rem;
  }

  @media screen and (max-width: 1050px) {
    .login-box {
      width: 80vw;
    }

    .title > h1 {
      font-size: 3rem;
    }

    .title > h2 {
      font-size: 1rem;
    }

    .logo {
      width: 10rem;
      height: 10rem;
    }

    .explain {
      font-size: 1rem;
    }
  }
`;
