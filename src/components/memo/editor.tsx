import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";
import { css } from "styled-jsx/css";

import { memoIndexState } from "../../lib/atoms/editorAtoms";

import MemoTitle from "./editor/memoTitle";
import MemoCategory from "./editor/memoCategory";
import MemoTags from "./editor/memoTags";
import MemoDate from "./editor/memoDate";

const CodeMirrorDyn = dynamic(
  async () => {
    const res = await import("./editor/codeMirrorWrap");
    return res.default;
  },
  { ssr: false }
);

export default function Editor() {
  const memoIndex = useRecoilValue(memoIndexState);

  if (memoIndex !== "-1") {
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
  
          <CodeMirrorDyn />
        </div>
  
        <style jsx>{editorStyle}</style>
      </>
    );
  } else {
    return <></>;
  }
}

const editorStyle = css`
  .editor {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
  }

  .memo-info {
    padding: 1rem;
    height: 10vh;
  }

  .memo-info > div:first-child {
    margin-bottom: 1rem;
  }

  .memo-info > div:last-child {
    display: grid;
    grid-template-columns: 1fr 6fr 1fr;
    gap: 1rem;
  }
`;
