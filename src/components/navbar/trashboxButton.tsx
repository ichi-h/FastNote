import { Link } from "react-router-dom";
import { css } from "styled-jsx/css";
import { useSetRecoilState } from "recoil";

import { currentCategoryState, openNavbarState, trashboxState } from "../../lib/atoms/uiAtoms";

export default function TrashboxButton() {
  const toggleNav = useSetRecoilState(openNavbarState);
  const toggleTrash = useSetRecoilState(trashboxState);
  const setCategory = useSetRecoilState(currentCategoryState);

  const handleClick = () => {
    toggleNav(false);
    toggleTrash(true);
    setCategory("all");
  };

  return (
    <>
      <Link to="/home">
        <div className="trashbox-button" onClick={handleClick}>
          ごみ箱
        </div>
      </Link>

      <style jsx>{trashboxButtonStyle}</style>
    </>
  );
}

const trashboxButtonStyle = css`
  .trashbox-button {
    margin-left: 2rem;
    font-size: 2rem;
    cursor: pointer;
  }
`;
