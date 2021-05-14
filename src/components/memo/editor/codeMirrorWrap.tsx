import React, { useState } from "react";
import { css } from "styled-jsx/css";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { useRecoilValue } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { uidState } from "../../../lib/atoms/UserIdAtoms";
import { FastNoteDatabase } from "../../../lib/firebase/database";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/markdown/markdown";

const CodeMirrorWrap = React.memo(() => {
  const memoIndex = useRecoilValue(memoIndexState);
  const uid = useRecoilValue(uidState);

  let fndb = new FastNoteDatabase(uid);
  let localDB = fndb.getLocalDB();

  const [currentTitle, setTitle] = useState(localDB.memos[memoIndex].title);

  let content = localDB.memos[memoIndex].content;

  const handleChangeContent = (
    _editor: CodeMirror.Editor,
    _editorChange: CodeMirror.EditorChange,
    newContent: string
  ) => {
    if (currentTitle !== localDB.memos[memoIndex].title) { // 選択中のメモが変更された場合
      setTitle(localDB.memos[memoIndex].title);
    } else {
      localDB.memos[memoIndex].content = newContent;
      localStorage.setItem("database", JSON.stringify(localDB));
    }
  };

  return (
    <>
      <div className="codemirror-wrap">
        <CodeMirror
          value={content}
          options={{
            mode: "markdown",
            theme: "neat",
            lineNumbers: false,
          }}
          onChange={handleChangeContent}
        />
      </div>

      <style jsx>{codeMirrorWrapStyle}</style>
    </>
  );
});

const codeMirrorWrapStyle = css`
  .codemirror-wrap {
    border: 1px solid black;
    margin: 1rem;
    font-size: 20px;
  }
`;

export default CodeMirrorWrap;
