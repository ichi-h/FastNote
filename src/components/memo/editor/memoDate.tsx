import { css } from "styled-jsx/css";
import { useRecoilValue } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { localDBState } from "../../../lib/atoms/localDBAtom";
import { numToStr } from "../../../lib/fastNoteDate";

export default function MemoDate() {
  const memoIndex = useRecoilValue(memoIndexState);
  const localDB = JSON.parse(useRecoilValue(localDBState));

  const created = localDB.memos[memoIndex].created;
  const updated = localDB.memos[memoIndex].updated;

  return (
    <>
      <div className="memo-date">
        <p>
          <i className="icon-calendar" />: {numToStr(Number(created), false)}
        </p>
        <p>
          <i className="icon-arrows-cw" />: {numToStr(Number(updated), false)}
        </p>
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

  .icon-calendar,
  .icon-arrows-cw {
    margin-right: 0.5rem;
  }
`;
