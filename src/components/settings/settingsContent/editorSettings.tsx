import React from "react";
import { css } from "styled-jsx/css";
import { useRecoilValue } from "recoil";

import { uidState } from "../../../lib/atoms/userIdAtoms";
import { FastNoteDatabase } from "../../../lib/firebase/database";

const FontSize = React.memo(() => {
  const uid = useRecoilValue(uidState);

  let fndb = new FastNoteDatabase(uid);
  let localDB = fndb.getLocalDB();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    localDB.settings.fontSize = e.currentTarget.value;
    localStorage.setItem("database", JSON.stringify(localDB));
  };

  return (
    <>
      <div className="font-size">
        <h2>フォントサイズ</h2>
        <p>フォントサイズを変更します（単位: px）。</p>
        <input
          type="number"
          defaultValue={localDB.settings.fontSize}
          onChange={handleChange}
        />
      </div>

      <style jsx>{generalStyle}</style>
    </>
  );
});

export default function EditorSettings() {
  return (
    <>
      <div className="editor-settings">
        <FontSize />
      </div>

      <style jsx>{editorSettingsStyle}</style>
    </>
  );
}

const editorSettingsStyle = css`
  .editor-settings {
    padding: 3rem;
  }
`;

const generalStyle = css`
  h2 {
    font-size: 1.5rem;
  }

  p {
    margin: 0.5rem 0;
  }
`;
