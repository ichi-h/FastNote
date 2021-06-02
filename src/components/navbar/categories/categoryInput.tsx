import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { css } from "styled-jsx/css";

import { categoryInputState } from "../../../lib/atoms/uiAtoms";
import { localDBState } from "../../../lib/atoms/localDBAtom";

export default function CategoryInput() {
  const [inputIsShow, toggleIsShow] = useRecoilState(categoryInputState);
  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);
  const inputRef: React.RefObject<HTMLInputElement> = useRef();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  const handleClick = () => toggleIsShow(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const categoryName = e.currentTarget.value;

      if (categoryName !== "") {
        const categoryList = Object.entries(localDB.categories)
          .map(([_, value]: [string, string]) => value)
          .filter((category) => category !== "None")
          .concat(categoryName)
          .sort()
          .concat("None");

        const categoryObj = categoryList.reduce((pre, cur, i) => {
          pre[i] = cur;
          return pre;
        }, {});

        localDB.categories = categoryObj;
        setLocalDB(JSON.stringify(localDB));
      }

      toggleIsShow(false);
    }
  };

  if (inputIsShow) {
    return (
      <>
        <div className="category-input">
          <input
            type="text"
            name="input"
            placeholder="新しいカテゴリー名"
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <button className="cancel" onClick={handleClick}>
            ×
          </button>
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
    height: 3rem;
    margin-left: 2rem;
  }

  .category-input > input {
    width: 80%;
    font-size: 1.5rem;
  }

  .cancel {
    font-size: 2rem;
    margin-left: 0.5rem;
  }
`;
