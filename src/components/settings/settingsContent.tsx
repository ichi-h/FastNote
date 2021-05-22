import { useRecoilValue } from "recoil";
import { css } from "styled-jsx/css";

import { settingsContentState } from "../../lib/atoms/uiAtoms";

import EditorSettings from "./settingsContent/editorSettings";
import UserSettings from "./settingsContent/userSettings";
import AboutApp from "./settingsContent/aboutApp";
import theme from "../../lib/theme";

function Default() {
  return (
    <>
      <p>設定する項目を選択してください。</p>
      <style jsx>{generalStyle}</style>
    </>
  );
}

export default function SettingsContent() {
  const contentValue = useRecoilValue(settingsContentState);

  const content = () => {
    switch (contentValue) {
      case "editor":
        return <EditorSettings />;
      case "user":
        return <UserSettings />;
      case "about":
        return <AboutApp />;
      default:
        return <Default />;
    }
  };

  return (
    <>
      <div className="settings-content">{content()}</div>

      <style jsx>{settingsContentStyle}</style>
    </>
  );
}

const settingsContentStyle = css`
  .settings-content {
    padding: 3rem;
  }
`;

export const generalStyle = css`
  .settings-item {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 2rem;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1.5rem;
  }

  a,
  .link {
    color: ${theme.subColor};
    text-decoration: underline;
    cursor: pointer;
  }

  .user-del-button {
    background-color: rgb(255, 63, 63);
    color: white;
    border-radius: 3px;
    padding: 1rem;
    transition: 0.1s;
    cursor: pointer;
  }

  .user-del-button:hover {
    background-color: rgb(230, 63, 63);
  }

  .user-del-button:active {
    background-color: rgb(210, 63, 63);
  }
`;
