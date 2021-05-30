import React from "react";
import { useRecoilState } from "recoil";

import { generalStyle } from "../settingsContent";
import { localDBState } from "../../../lib/atoms/localDBAtom";
import { insertionSort } from "../../../lib/sort";

const FontSize = React.memo(() => {
  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("fontSize", e.currentTarget.value);
  };

  return (
    <>
      <div className="font-size">
        <h2>フォントサイズ</h2>
        <p>フォントサイズを変更します（単位: px）。</p>
        <input
          type="number"
          defaultValue={localStorage.getItem("fontSize")}
          onChange={handleChange}
        />
      </div>

      <style jsx>{generalStyle}</style>
    </>
  );
});

export default function EditorSettings() {
  return (
    <div className="editor-settings">
      <FontSize />
    </div>
  );
}
