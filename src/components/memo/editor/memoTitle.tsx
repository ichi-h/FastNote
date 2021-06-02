import { useRef, useEffect } from "react";
import { css } from "styled-jsx/css";
import { useRecoilState, useRecoilValue } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { localDBState } from "../../../lib/atoms/localDBAtom";
import { getCurrentDate } from "../../../lib/fastNoteDate";

export default function MemoTitle() {
  const memoIndex = useRecoilValue(memoIndexState);
  const titleRef: React.RefObject<HTMLInputElement> = useRef();

  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  useEffect(() => {
    titleRef.current.value = localDB.memos[memoIndex].title;
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentDate = getCurrentDate(new Date());
    localDB.memos[memoIndex].updated = currentDate;
    localDB.memos[memoIndex].title = e.currentTarget.value;
    setLocalDB(JSON.stringify(localDB));
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
