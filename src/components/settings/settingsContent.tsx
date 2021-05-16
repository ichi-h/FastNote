import { useRecoilValue } from "recoil";
import { css } from "styled-jsx/css";

import { settingsContentState } from "../../lib/atoms/uiAtoms";

import EditorSettings from "./settingsContent/editorSettings";
import UserSettings from "./settingsContent/userSettings";
import AboutApp from "./settingsContent/aboutApp";

function Default() {
  return <>設定する項目を選んでください。</>;
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
    font-size: 1.5rem;
  }

  p {
    margin: 0.5rem 0;
  }

  button {
    background-color: rgb(255, 96, 57);
    color: white;
    border-radius: 3px;
    padding: 1rem;
    transition: 0.1s;
    cursor: pointer;
  }

  button:hover {
    background-color: rgb(224, 84, 49);
  }
`;
