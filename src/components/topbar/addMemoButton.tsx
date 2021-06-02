import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { css } from "styled-jsx/css";

import { Memo } from "../../lib/databaseInfo";
import { getCurrentDate } from "../../lib/fastNoteDate";
import { memoIndexState } from "../../lib/atoms/editorAtoms";
import { localDBState } from "../../lib/atoms/localDBAtom";
import { trashboxState, urlState } from "../../lib/atoms/uiAtoms";
import { insertionSort } from "../../lib/sort";

export default function AddMemoButton() {
  const trashbox = useRecoilValue(trashboxState);
  const currentURL = useRecoilValue(urlState);
  const setIndex = useSetRecoilState(memoIndexState);
  const [localDBStr, setLocalDB] = useRecoilState(localDBState);

  if (!trashbox && currentURL !== "/home/settings") {
    let localDB = JSON.parse(localDBStr);

    const handleClick = () => {
      const currentDate = getCurrentDate(new Date());

      const newMemo: Memo = {
        title: "新しいメモ",
        category: "None",
        tags: [""],
        star: false,
        trash: false,
        created: currentDate,
        updated: currentDate,
        content: "",
      };

      const keys = () => {
        if (localDB.memos) {
          return Object.keys(localDB.memos).map((value) => Number(value));
        }

        return [];
      };

      const getNewIndex = (keys: number[]) => {
        if (keys.length !== 0) {
          const maxIndex = keys.reduce((pre, cur) => {
            return Math.max(pre, cur);
          });
          return String(maxIndex + 1);
        }

        return "0";
      };

      const newIndex = getNewIndex(keys());

      localDB.memos[newIndex] = newMemo;

      setLocalDB(JSON.stringify(localDB));
      setIndex(newIndex);
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
  } else {
    return <></>;
  }
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
