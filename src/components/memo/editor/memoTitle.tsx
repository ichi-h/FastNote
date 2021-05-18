import { useRef, useEffect } from "react";
import { css } from "styled-jsx/css";
import { useRecoilValue, useRecoilState } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { localDBState } from "../../../lib/atoms/localDBAtom";
import { FastNoteDate } from "../../../lib/fastNoteDate";
import { insertionSort } from "../../../lib/sort";

export default function MemoTitle() {
  const memoIndex = useRecoilValue(memoIndexState);
  const titleRef: React.RefObject<HTMLInputElement> = useRef();

  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  useEffect(() => {
    titleRef.current.value = localDB.memos[memoIndex].title;
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fnd = new FastNoteDate();
    localDB.memos[memoIndex].updated = fnd.getCurrentDate();
    localDB.memos[memoIndex].title = e.currentTarget.value;
    insertionSort(localDB, setLocalDB);
  };

  return (
    <>
      <div className="memo-title">
        <input
          type="text"
          className="title-area"
          name="title-area"
          id="title-area"
          ref={titleRef}
          defaultValue={localDB.memos[memoIndex].title}
          onChange={handleChangeTitle}
        />
      </div>

      <style jsx>{memoTitleStyle}</style>
    </>
  );
}

const memoTitleStyle = css`
  .title-area {
    width: 100%;
    font-size: 2rem;
  }
`;
