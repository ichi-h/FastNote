import React, { useEffect } from "react";
import { css } from "styled-jsx/css";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { useRecoilValue } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";
import "codemirror/mode/markdown/markdown";

const CodeMirrorWrap = React.memo(() => {
  const memoIndex = useRecoilValue(memoIndexState);
  const localDB = JSON.parse(localStorage.getItem("database"));
  let content = localDB.memos[memoIndex].content;

  const handleChangeContent = (
    _editor: CodeMirror.Editor,
    _editorChange: CodeMirror.EditorChange,
    newContent: string
  ) => {
    localDB.memos[memoIndex].content = newContent;
    localStorage.setItem("database", JSON.stringify(localDB));
  };

  return (
    <>
      <div className="codemirror-wrap">
        <CodeMirror
          value={content}
          options={{
            mode: "markdown",
            theme: "base16-light",
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
