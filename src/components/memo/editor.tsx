import { UnControlled as CodeMirror } from "react-codemirror2";
import { css } from "styled-jsx/css";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";
import "codemirror/mode/markdown/markdown";

export default function Editor() {
  return (
    <>
      <div className="editor">
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

  .codemirror-wrap {
    font-size: 20px;
  }
`;
