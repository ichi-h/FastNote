import { useState } from "react";
import { css } from "styled-jsx/css";

import PulldownMenu from "../pulldownMenu";

export default function EllipsisButton() {
  const [menuIsShow, toggleIsShow] = useState(false);

  const showMenu = () => {
    if (menuIsShow) {
      return (
        <PulldownMenu
          item={[{ name: "削除", handler: removeCategory, index: 0 }]}
          isShow={menuIsShow}
          dispatch={toggleIsShow}
        />
      );
    }
  };

  const handleClick = () => {
    toggleIsShow(!menuIsShow);
  };

  const removeCategory = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("削除するぞい" + e.currentTarget.value);
    toggleIsShow(false);
  }

  return (
    <>
      <div className="ellipsis">
        <button className="ellipsis-button" onClick={handleClick}>3</button>
        {showMenu()}
      </div>

      <style jsx>{ellipsisButtonStyle}</style>
    </>
  );
}

const ellipsisButtonStyle = css`
  .ellipsis-button {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    font-size: 2rem;
    color: rgb(160, 160, 160);
  }
`;
