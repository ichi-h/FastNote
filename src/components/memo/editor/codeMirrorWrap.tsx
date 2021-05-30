import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
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
      // 選択中のメモが変更されてCodeMirror内のテキストが変わった場合
      setEditIndex(memoIndex);
    } else {
      // CodeMirrorのテキストが更新された場合
      const fnd = new FastNoteDate();
      localDB.memos[memoIndex].updated = fnd.getCurrentDate();
      localDB.memos[memoIndex].content = newContent;
      insertionSort(localDB, setLocalDB);
      if (memoIndex !== "0") {
        setIndex("0");
      }
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
            lineWrapping: true,
          }}
          onBeforeChange={handleChangeContent}
        />
      </div>

      {codeMirrorWrapStyle(localStorage.getItem("fontSize"))}
    </>
  );
});

const codeMirrorWrapStyle = (fontSize: string) => {
  return (
    <style jsx>{`
      .codemirror-wrap {
        border: 1px solid black;
        height: 100%;
        font-size: ${fontSize}px;
      }
    `}</style>
  );
};

export default CodeMirrorWrap;
