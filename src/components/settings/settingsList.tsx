import { css } from "styled-jsx/css";
import { useSetRecoilState } from "recoil";

import { settingsContentState } from "./settingsContent";
import React from "react";

export default function SettingsList() {
  const switchContent = useSetRecoilState(settingsContentState);

  const clickHandle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e.currentTarget.classList[2]);
    switchContent(e.currentTarget.classList[2]);
  };

  return (
    <>
      <div className="settings-list">
        <div className="settings-item editor" onClick={clickHandle}>
          <div className="title">エディター</div>
          <div className="explain">
            フォント等のエディターの設定を行います。
          </div>
        </div>
        <div className="settings-item user" onClick={clickHandle}>
          <div className="title">ユーザー設定</div>
          <div className="explain">ユーザーの管理を行います。</div>
        </div>
        <div className="settings-item about" onClick={clickHandle}>
          <div className="title">このアプリについて</div>
        </div>
      </div>

      <style jsx>{memoListStyle}</style>
    </>
  );
}

const memoListStyle = css`
  .settings-list {
    height: 100%;
    overflow-y: scroll;
  }

  .settings-item {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 7vh;
    border: 1px solid black;
    cursor: pointer;
  }

  .title {
    margin-left: 1rem;
    font-size: 2rem;
  }

  .explain {
    margin-left: 1rem;
  }
`;
