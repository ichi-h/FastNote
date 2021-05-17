import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { css } from "styled-jsx/css";

import { categoryInputState } from "../../lib/atoms/uiAtoms";

export default function CategoryInput() {
  const [inputIsShow, toggleIsShow] = useRecoilState(categoryInputState);
  const selectRef: React.LegacyRef<HTMLInputElement> = useRef();

  useEffect(() => {});

  const handleClick = () => toggleIsShow(false);

  if (inputIsShow) {
    return (
      <>
        <div className="category-input">
          <input type="text" name="" id="" ref={selectRef} />
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
