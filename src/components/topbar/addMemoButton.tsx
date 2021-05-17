import { useSetRecoilState, useRecoilState } from "recoil";
import { css } from "styled-jsx/css";

import { Memo } from "../../lib/databaseInfo";
import { FastNoteDate } from "../../lib/fastNoteDate";
import { memoIndexState } from "../../lib/atoms/editorAtoms";
import { localDBState } from "../../lib/atoms/localDBAtom";

export default function AddMemoButton() {
  const setIndex = useSetRecoilState(memoIndexState);
  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  const handleClick = () => {
    const fnd = new FastNoteDate();

    const newMemo: Memo = {
      title: "新しいメモ",
      category: "None",
      tags: [""],
      star: false,
      trash: false,
      created: fnd.getCurrentDate(),
      updated: fnd.getCurrentDate(),
      content: "",
    };

    const keys = Object.keys(localDB.memos).map((value) => Number(value));

    const getNextIndex = (keys: number[]) => {
      if (keys.length !== 0) {
        const maxIndex = keys.reduce((pre, cur) => {
          return Math.max(pre, cur);
        });
        return String(maxIndex + 1);
      } else {
        return "0";
      }
    };

    const nextIndex = getNextIndex(keys);

    localDB.memos[nextIndex] = newMemo;
    setLocalDB(JSON.stringify(localDB));
    setIndex(nextIndex);
  };

  return (
    <>
      <label className="add-memo-label" htmlFor="add-memo-button">
        <button
          className="add-memo-button"
          name="add-memo-button"
          id="add-memo-button"
          onClick={handleClick}
        />
        <div className="add-button">
          <div className="cross">
            <div className="bar" />
            <div className="bar" />
          </div>
        </div>
      </label>

      <style jsx>{addButtonStyle}</style>
    </>
  );
}

const addButtonStyle = css`
  .add-memo-label {
    cursor: pointer;
  }

  .add-memo-button {
    display: none;
  }

  .add-button {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    border: 2px solid white;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }

  .add-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transition: 0.2s;
  }

  .cross {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .cross > .bar:first-child,
  .cross > .bar:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: white;
  }

  .cross > .bar:first-child {
    width: 2rem;
    height: 2px;
  }

  .cross > .bar:last-child {
    width: 2px;
    height: 2rem;
  }
`;
