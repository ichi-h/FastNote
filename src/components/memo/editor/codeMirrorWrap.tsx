import React, { useState } from "react";
import { css } from "styled-jsx/css";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { useRecoilState } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { localDBState } from "../../../lib/atoms/localDBAtom";
import { FastNoteDate } from "../../../lib/fastNoteDate";
import { insertionSort } from "../../../lib/sort";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/markdown/markdown";

const CodeMirrorWrap = React.memo(() => {
  const [memoIndex, setIndex] = useRecoilState(memoIndexState);

  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  const [editIndex, setEditIndex] = useState(memoIndex);

  let content = localDB.memos[memoIndex].content;

  const handleChangeContent = (
    _editor: CodeMirror.Editor,
    _editorChange: CodeMirror.EditorChange,
    newContent: string
  ) => {
    if (editIndex !== memoIndex) {
      // 選択中のメモが変更された場合
      setEditIndex(memoIndex);
    } else {
      const fnd = new FastNoteDate();
      localDB.memos[memoIndex].updated = fnd.getCurrentDate();
      localDB.memos[memoIndex].content = newContent;
      insertionSort(localDB, setLocalDB);
      setIndex("0");
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
