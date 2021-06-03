import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useRecoilState, useRecoilValue } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { localDBState } from "../../../lib/atoms/localDBAtom";
import { searchKeywordState, posPairsState, getMarkerPos } from "../../../lib/atoms/searchAtom"
import { getCurrentDate } from "../../../lib/fastNoteDate";
import theme from "../../../lib/theme";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/gfm/gfm";
import "codemirror/addon/edit/continuelist";
import "codemirror/addon/selection/mark-selection";

const CodeMirrorWrap = React.memo(() => {
  const memoIndex = useRecoilValue(memoIndexState);
  const keyword = useRecoilValue(searchKeywordState);
  const [posPairs, setPosPairs] = useRecoilState(posPairsState);
  const [localDBStr, setLocalDB] = useRecoilState(localDBState);

  let localDB = JSON.parse(localDBStr);
  let content = localDB.memos[memoIndex].content;

  const markKeyword = (editor: CodeMirror.Editor) => {
    posPairs.forEach((pos) => {
      editor.markText(pos.start, pos.end).clear();
    });

    const newPosPairs = getMarkerPos(keyword, content);
    newPosPairs.forEach((pos) => {
      editor.markText(pos.start, pos.end, {
        className: "marked",
        css: `background-color: ${theme.subColor};`,
      });
    });

    setPosPairs(newPosPairs);
  };

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
            styleSelectedText: true,
            extraKeys: {
              "Enter": "newlineAndIndentContinueMarkdownList",
              "Tab": (cm) => cm.execCommand("indentMore"),
              "Shift-Tab": (cm) => cm.execCommand("indentLess"),
            }
          }}
          onBeforeChange={handleChangeContent}
          onChange={markKeyword}
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
