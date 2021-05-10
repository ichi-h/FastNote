import { UnControlled as CodeMirror } from "react-codemirror2";
import { css } from "styled-jsx/css";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";

export default function Editor() {
  return (
    <>
      <div className="editor">
        <CodeMirror
          value={""}
          options={{
            mode: "gfm",
            theme: "base16-light",
            lineNumbers: false,
          }}
        />
      </div>

      <style jsx>{editorStyle}</style>
    </>
  );
}

const editorStyle = css`
  .editor {
    height: 100%;
  }
`;
