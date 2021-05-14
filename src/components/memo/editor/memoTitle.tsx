import { useRef, useEffect } from "react";
import { css } from "styled-jsx/css";
import { useRecoilValue } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { uidState } from "../../../lib/atoms/userIdAtoms";
import { FastNoteDatabase } from "../../../lib/firebase/database";
import { FastNoteDate } from "../../../lib/fastNoteDate";

export default function MemoTitle() {
  const memoIndex = useRecoilValue(memoIndexState);
  const uid = useRecoilValue(uidState);
  const titleRef: React.RefObject<HTMLInputElement> = useRef();

  let fndb = new FastNoteDatabase(uid);
  let localDB = fndb.getLocalDB();

  useEffect(() => {
    titleRef.current.value = localDB.memos[memoIndex].title;
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fnd = new FastNoteDate();
    localDB.memos[memoIndex].updated = fnd.getCurrentDate();
    localDB.memos[memoIndex].title = e.currentTarget.value;
    localStorage.setItem("database", JSON.stringify(localDB));
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
