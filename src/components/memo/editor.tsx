import { UnControlled as CodeMirror } from "react-codemirror2";
import { css } from "styled-jsx/css";

import MemoTitle from "./editor/memoTitle";
import MemoCategory from "./editor/memoCategory";
import MemoTags from "./editor/memoTags";
import MemoDate from "./editor/memoDate";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";
import "codemirror/mode/markdown/markdown";

export default function Editor() {
  return (
    <>
      <div className="editor">
        <div className="memo-info">
          <div>
            <MemoTitle />
          </div>

          <div>
            <MemoCategory />
            <MemoTags />
            <MemoDate />
          </div>
        </div>

        <div className="codemirror-wrap">
          <CodeMirror
            value={""}
            options={{
              mode: "markdown",
              theme: "base16-light",
              lineNumbers: false,
            }}
          />
        </div>
      </div>

      <style jsx>{editorStyle}</style>
    </>
  );
}

const editorStyle = css`
  .editor {
    height: 100%;
  }

  .memo-info {
    padding: 1rem;
  }

  .memo-info > div:first-child {
    margin-bottom: 1rem;
  }

  .memo-info > div:last-child {
    display: grid;
    grid-template-columns: 1fr 6fr 1fr;
    gap: 1rem;
  }

  .codemirror-wrap {
    border: 1px solid black;
    margin: 1rem;
    font-size: 20px;
  }
`;
