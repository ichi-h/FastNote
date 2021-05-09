import React, { useState } from "react";
import Head from "next/head";
import css from "styled-jsx/css";

function TopBar() {
  const [checked, toggleCheck] = useState(false);
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
      </div>

      <style jsx>{topBarStyle}</style>
    </>
  );
}

export default function HomeCampus() {
  return (
    <>
      <Head>
        <title>Fast Note</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="home-campus">
        <TopBar />
        <div className="separator"></div>
      </div>

      <style jsx>{homeCampusStyle}</style>
    </>
  );
}

const homeCampusStyle = css`
  .home-campus {
    width: 100vw;
    height: 100vh;
  }

  .separator {
    position: relative;
    width: 100%;
  }
`;

const topBarStyle = css`
  .top-bar {
    position: relative;
    width: 100%;
    height: 5rem;
    background-color: #BCD955;
  }

  input#open-navbar {
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
`;
