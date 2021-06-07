import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

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
  const memoInfoRef: React.RefObject<HTMLDivElement> = useRef();
  const [memoInfoY, setHeight] = useState(0);

  useEffect(() => {
    if (memoInfoRef.current !== undefined) {
      try {
        setHeight(memoInfoRef.current.clientHeight);
      } catch {
        // do nothing
      }
    }
  });

  if (memoIndex !== "-1") {
    return (
      <>
        <div className="editor">
          <div className="memo-info" ref={memoInfoRef}>
            <div>
              <MemoTitle />
            </div>

            <div>
              <MemoCategory />
              <MemoTags />
              <MemoDate />
            </div>
          </div>

          <div>
            <CodeMirrorDyn />
          </div>
        </div>

        {editorStyle(memoInfoY)}
      </>
    );
  } else {
    return <></>;
  }
}

const editorStyle = (memoInfoY: number) => {
  return (
    <style jsx>{`
      .editor {
        position: relative;
        height: 100%;
      }

      .editor > div:first-child {
        position: absolute;
        top: 0;
        width: 100%;
        height: auto;
        padding: 1rem 1rem 0 1rem;
      }

      .editor > div:last-child {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: calc(100% - ${memoInfoY}px);
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

      @media screen and (max-width: 1280px) {
        .memo-info > div:last-child {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          gap: 1rem;
        }
      }
    `}</style>
  );
};
