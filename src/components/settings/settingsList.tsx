import { css } from "styled-jsx/css";
import { useSetRecoilState } from "recoil";

import { settingsContentState } from "../../lib/atoms/uiAtoms";

export default function SettingsList() {
  const switchContent = useSetRecoilState(settingsContentState);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    switchContent(e.currentTarget.classList[2]);
  };

  return (
    <>
      <div className="settings-list">
        <div className="settings-item editor" onClick={handleClick}>
          <div className="title">
            <i className="icon-pencil" />
            エディター
          </div>
          <div className="explain">
            フォント等のエディターの設定を行います。
          </div>
        </div>
        <hr />
        <div className="settings-item user" onClick={handleClick}>
          <div className="title">
            <i className="icon-user" />
            ユーザー設定
          </div>
          <div className="explain">ユーザーの管理を行います。</div>
        </div>
        <hr />
        <div className="settings-item about" onClick={handleClick}>
          <div className="title">
            <i className="icon-info" />
            このアプリについて
          </div>
        </div>
        <hr />
      </div>

      <style jsx>{memoListStyle}</style>
    </>
  );
}

const memoListStyle = css`
  .settings-list {
    height: 100%;
    overflow-y: scroll;
    user-select: none;
  }

  .settings-item {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 7vh;
    cursor: pointer;
  }

  .settings-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .settings-item:active {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .title {
    margin-left: 1rem;
    font-size: 2rem;
  }

  .explain {
    margin-left: 1rem;
  }
`;
