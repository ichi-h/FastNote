import { useState } from "react";
import { css } from "styled-jsx/css";

export default function EllipsisButton() {
  const [menuIsShow, toggleIsShow] = useState(false);

  const handleClick = () => toggleIsShow(!menuIsShow);

  return (
    <>
      <button className="ellipsis" onClick={handleClick}>3</button>

      <style jsx>{ellipsisButtonStyle}</style>
    </>
  );
}

const ellipsisButtonStyle = css`
  .ellipsis {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    font-size: 2rem;
    color: rgb(160, 160, 160);
  }
`;
