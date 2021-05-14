import { css } from "styled-jsx/css";
import { useRecoilValue } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { uidState } from "../../../lib/atoms/userIdAtoms";
import { FastNoteDatabase } from "../../../lib/firebase/database";
import { numToStr } from "../../../lib/fastNoteDate";

export default function MemoDate() {
  const memoIndex = useRecoilValue(memoIndexState);
  const uid = useRecoilValue(uidState);

  let fndb = new FastNoteDatabase(uid);
  let localDB = fndb.getLocalDB();

  const created = localDB.memos[memoIndex].created;
  const updated = localDB.memos[memoIndex].updated;

  return (
    <>
      <div className="memo-date">
        <p>作成日: {numToStr(Number(created), false)}</p>
        <p>更新日: {numToStr(Number(updated), false)}</p>
      </div>

      <style jsx>{memoDateStyle}</style>
    </>
  );
}

const memoDateStyle = css`
  .memo-date {
    text-align: right;
    margin: auto 0;
  }
`;
