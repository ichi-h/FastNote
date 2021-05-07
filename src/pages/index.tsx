import React from "react";
import Head from "next/head";
import css from "styled-jsx/css";

export const StartButton = () => {
  return (
    <div className="login-form">
      <button data-testid="start-button">メモを取る</button>
      <style jsx>{buttonStyle}</style>
    </div>
  );
};

export default function LandingPage(): JSX.Element {
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

          <StartButton />
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
    background-color: #bcd955;
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

const buttonStyle = css`
  button {
    background-color: #f2b950;
    border-radius: 3px;
    padding: 1rem;
    font-size: 2rem;
    transition: 0.1s;
    cursor: pointer;
  }

  button:hover {
    background-color: #ddaa4b;
  }
`;