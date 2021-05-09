import { atom, useRecoilValue } from "recoil";

import EditorSettings from "./settingsContent/editorSettings";
import UserSettings from "./settingsContent/userSettings";
import AboutApp from "./settingsContent/aboutApp";

export const settingsContentState = atom({
  key: "settingsContentState",
  default: "",
});

function Default() {
  return <>設定する項目を選んでください。</>;
}

export default function SettingsContent() {
  const contentValue = useRecoilValue(settingsContentState);

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
}
