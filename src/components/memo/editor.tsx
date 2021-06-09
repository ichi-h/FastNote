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
            <div className="top">
              <MemoTitle />
            </div>

            <div className="bottom">
              <div>
                <MemoCategory />
              </div>
              <div>
                <MemoTags />
                <MemoDate />
              </div>
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

      .top {
        margin-bottom: 1rem;
      }

      .bottom {
        display: grid;
        grid-template-columns: 1fr 6fr;
        gap: 1rem;
        width: 100%;
      }

      .bottom > div:last-child {
        display: flex;
        width: 100%;
      }
    `}</style>
  );
};
