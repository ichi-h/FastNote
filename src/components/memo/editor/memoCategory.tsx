import { useRef, useEffect } from "react";
import { css } from "styled-jsx/css";
import { useRecoilValue } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";

export default function MemoCategory() {
  const memoIndex = useRecoilValue(memoIndexState);
  let localDB = JSON.parse(localStorage.getItem("database"));
  const selectRef: React.LegacyRef<HTMLSelectElement> = useRef();

  useEffect(() => {
    selectRef.current.value = localDB.memos[memoIndex].category;
  });

  let categories: string[] = [];
  for (let i = 0; i < Object.keys(localDB.categories).length; i++) {
    categories.push(localDB.categories[i]);
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localDB.memos[memoIndex].category = e.currentTarget.value;
    localStorage.setItem("database", JSON.stringify(localDB));
  };

  return (
    <>
      <div className="memo-category">
        <select
          className="category-area"
          name="category-area"
          id="category-area"
          ref={selectRef}
          defaultValue={localDB.memos[memoIndex].category}
          onChange={handleChange}
        >
          {categories.map((category, i) => {
            return (
              <option value={category} key={i}>
                {category}
              </option>
            );
          })}
        </select>
      </div>

      <style jsx>{memoCategoryStyle}</style>
    </>
  );
}

const memoCategoryStyle = css`
  .category-area {
    width: 100%;
  }
`;
