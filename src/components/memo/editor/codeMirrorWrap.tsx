import { css } from "styled-jsx/css";
import { UnControlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";
import "codemirror/mode/markdown/markdown";

export default function CodeMirrorWrap() {
  return (
    <>
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

      <style jsx>{codeMirrorWrapStyle}</style>
    </>
  );
}

const codeMirrorWrapStyle = css`
  .codemirror-wrap {
    border: 1px solid black;
    margin: 1rem;
    font-size: 20px;
  }
`;
