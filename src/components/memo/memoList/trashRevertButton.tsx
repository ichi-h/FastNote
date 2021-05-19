import { useRecoilState, useSetRecoilState } from "recoil";
import { css } from "styled-jsx/css";

import { localDBState } from "../../../lib/atoms/localDBAtom";
import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { insertionSort } from "../../../lib/sort";

export type FuncType = "trash" | "revert";

export default function TrashRevertButton(props: {
  func: FuncType;
  index: number;
}) {
  const setIndex = useSetRecoilState(memoIndexState);
  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  const trashAtr = (func: FuncType) => {
    switch (func) {
      case "trash":
        return true;
      case "revert":
        return false;
    }
  };

  const icon = () => {
    switch (props.func) {
      case "trash":
        return "icon-trash-empty";
      case "revert":
        return "icon-ccw";
    }
  };

  const handleClick = () => {
    setIndex("-1");
    localDB.memos[props.index].trash = trashAtr(props.func);
    insertionSort(localDB, setLocalDB);
  };

  return (
    <>
      <div className="trash-revert-button">
        <button onClick={handleClick}>
          <i className={icon()} />
        </button>
      </div>
      <style jsx>{tshRevBtnStyle}</style>
    </>
  );
}

const tshRevBtnStyle = css`
  .trash-revert-button > button {
    font-size: 2rem;
  }
`;
