import { Link } from "react-router-dom";
import { css } from "styled-jsx/css";
import { useSetRecoilState } from "recoil";

import { openNavbarState } from "../../lib/atoms/uiAtoms";

export default function TrashboxButton() {
  const toggle = useSetRecoilState(openNavbarState);

  const handleClick = () => {
    toggle(false);
  };

  return (
    <>
      <Link to="/home/">
        <div className="trashbox" onClick={handleClick}>
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
