import { Link } from "react-router-dom";
import { css } from "styled-jsx/css";
import { useSetRecoilState, useRecoilValue } from "recoil";

import {
  currentCategoryState,
  openNavbarState,
  trashboxState,
} from "../../lib/atoms/uiAtoms";
import { localDBState } from "../../lib/atoms/localDBAtom";

function countTrashedMemos(memos: any) {
  let count = 0;

  if (memos) {
    count = Object.entries(memos)
      .map(([_, memo]: [string, any]) => memo)
      .reduce((pre: number, memo) => {
        if (memo.trash) {
          pre += 1;
        }
        return pre;
      }, 0);
  }

  return count;
}

export default function TrashboxButton() {
  const toggleNav = useSetRecoilState(openNavbarState);
  const toggleTrash = useSetRecoilState(trashboxState);
  const setCategory = useSetRecoilState(currentCategoryState);

  const localDB = JSON.parse(useRecoilValue(localDBState));

  const count = countTrashedMemos(localDB.memos);

  const handleClick = () => {
    toggleNav(false);
    toggleTrash(true);
    setCategory("all");
  };

  return (
    <>
      <Link to="/home">
        <div className="trashbox-button" onClick={handleClick}>
          ごみ箱 ({count})
        </div>
      </Link>

      <style jsx>{trashboxButtonStyle}</style>
    </>
  );
}

const trashboxButtonStyle = css`
  .trashbox-button {
    font-size: 2rem;
    cursor: pointer;
  }
`;
