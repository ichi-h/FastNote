import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useRecoilState, useRecoilValue } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { localDBState } from "../../../lib/atoms/localDBAtom";
import { getCurrentDate } from "../../../lib/fastNoteDate";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/gfm/gfm";
import "codemirror/addon/edit/continuelist";

const CodeMirrorWrap = React.memo(() => {
  const memoIndex = useRecoilValue(memoIndexState);

  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  let content = localDB.memos[memoIndex].content;

  const handleChangeContent = (
    _editor: CodeMirror.Editor,
    _editorChange: CodeMirror.EditorChange,
    newContent: string
  ) => {
    const currentDate = getCurrentDate(new Date());
    localDB.memos[memoIndex].updated = currentDate;
    localDB.memos[memoIndex].content = newContent;
    setLocalDB(JSON.stringify(localDB));
  };

  return (
    <>
      <div className="codemirror-wrap">
        <CodeMirror
          value={content}
          options={{
            mode: "gfm",
            theme: "neat",
            lineNumbers: false,
            lineWrapping: true,
            extraKeys: {
              "Enter": "newlineAndIndentContinueMarkdownList",
              "Tab": (cm) => cm.execCommand("indentMore"),
              "Shift-Tab": (cm) => cm.execCommand("indentLess"),
            }
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
