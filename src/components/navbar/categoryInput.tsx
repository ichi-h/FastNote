import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { css } from "styled-jsx/css";

import { categoryInputState } from "../../lib/atoms/uiAtoms";

export default function CategoryInput() {
  const [inputIsShow, toggleIsShow] = useRecoilState(categoryInputState);
  const inputRef: React.RefObject<HTMLInputElement> = useRef();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  const handleClick = () => toggleIsShow(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {

      const categoryName = e.currentTarget.value;

      if (categoryName !== "") {

      }

      toggleIsShow(false);
    }
  };

  if (inputIsShow) {
    return (
      <>
        <div className="category-input">
          <input type="text" name="input" onKeyDown={handleKeyDown} ref={inputRef} />
          <button onClick={handleClick}>×</button>
        </div>
        <style jsx>{categoryInputStyle}</style>
      </>
    );
  } else {
    return <></>;
  }
}

const categoryInputStyle = css`
  .category-input {
    margin-left: 2rem;
  }
`;
