import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Head from "next/head";
import css from "styled-jsx/css";

import MemoList from "../components/memo/memoList";
import Editor from "../components/memo/editor";
import SettingsList from "../components/settings/settingsList";
import SettingsItem from "../components/settings/settingsItem";

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
        <BrowserRouter>
          <div className="separator">
            <div>
              <Route path="/home" exact component={MemoList} />
              <Route path="/home/settings" exact component={SettingsList} />
            </div>
            <div>
              <Route path="/home" exact component={Editor} />
              <Route path="/home/settings" exact component={SettingsItem} />
            </div>
          </div>
        </BrowserRouter>
      </div>

      <style jsx>{homeCampusStyle}</style>
    </>
  );
}

const TOP_BAR_HEIGHT = "5rem";

const homeCampusStyle = css`
  .home-campus {
    width: 100vw;
    height: 100vh;
  }

  .separator {
    display: flex;
    width: 100%;
    height: calc(100vh - ${TOP_BAR_HEIGHT});
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
    height: ${TOP_BAR_HEIGHT};
    background-color: #bcd955;
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
