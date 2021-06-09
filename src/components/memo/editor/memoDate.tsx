import { css } from "styled-jsx/css";
import { useRecoilValue } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { localDBState } from "../../../lib/atoms/localDBAtom";
import { DateInfo, FastNoteDB } from "../../../lib/fastNoteDB";
import { addZero } from "../../../lib/fastNoteDate";

const displayDate = (dateInfo: DateInfo) => {
  dateInfo.month += 1;

  const keys = {
    date: ["year", "month", "date"],
    time: ["hours", "minutes", "seconds"],
  };

  const convert = (type: "date" | "time") => {
    const sep = () => {
      switch (type) {
        case "date":
          return "/";
        case "time":
          return ":";
      }
    };

    const res = keys[type]
      .reduce((pre, cur) => {
        pre = pre + sep() + addZero(dateInfo[cur]);
        return pre;
      }, "")
      .slice(1);

    return res;
  };

  const date = convert("date");
  const time = convert("time");

  return `${date} ${time}`;
};

export default function MemoDate() {
  const memoIndex = useRecoilValue(memoIndexState);
  const localDB: FastNoteDB = JSON.parse(useRecoilValue(localDBState));

  const created = localDB.memos[memoIndex].created;
  const updated = localDB.memos[memoIndex].updated;

  return (
    <>
      <div className="memo-date">
        <div className="icon">
          <i className="icon-info-circled" />
        </div>
        <div className="popup">
          <p>
            <i className="icon-calendar" />: {displayDate(created)}
          </p>
          <p>
            <i className="icon-arrows-cw" />: {displayDate(updated)}
          </p>
        </div>
      </div>

      <style jsx>{memoDateStyle}</style>
    </>
  );
}

const memoDateStyle = css`
  p {
    font-size: 1rem;
  }

  .icon-info-circled {
    font-size: 2rem;
  }

  .memo-date {
    position: relative;
  }

  .popup {
    display: none;
    position: absolute;
    background-color: white;
    width: auto;
    margin: auto 0;
    filter: drop-shadow(5px 5px 3px rgba(0, 0, 0, 0.5));
    z-index: 10;
  }

  .icon:hover ~ .popup,
  .popup:hover {
    display: initial;
  }

  .icon-calendar,
  .icon-arrows-cw {
    margin-right: 0.5rem;
  }
`;
