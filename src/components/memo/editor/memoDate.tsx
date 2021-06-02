import { css } from "styled-jsx/css";
import { useRecoilValue } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { localDBState } from "../../../lib/atoms/localDBAtom";
import { DateInfo } from "../../../lib/databaseInfo";

const displayDate = (dateInfo: DateInfo) => {
  dateInfo.month += 1;

  const keys = {
    date: ["year", "month", "date"],
    time: ["hours", "minutes", "seconds"],
  };

  const convertTo = (type: "date" | "time") => {
    const sep = () => {
      switch (type) {
        case "date":
          return "/";
        case "time":
          return ":";
      }
    };

    const res = keys[type].reduce((pre, cur) => {
      pre = pre + sep() + dateInfo[cur];
      return pre;
    }, "").slice(1);

    return res;
  }

  const date = convertTo("date");
  const time = convertTo("time");

  return `${date} ${time}`;
}

export default function MemoDate() {
  const memoIndex = useRecoilValue(memoIndexState);
  const localDB = JSON.parse(useRecoilValue(localDBState));

  const created = localDB.memos[memoIndex].created;
  const updated = localDB.memos[memoIndex].updated;

  return (
    <>
      <div className="memo-date">
        <p>
          <i className="icon-calendar" />: {displayDate(created)}
        </p>
        <p>
          <i className="icon-arrows-cw" />: {displayDate(updated)}
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
