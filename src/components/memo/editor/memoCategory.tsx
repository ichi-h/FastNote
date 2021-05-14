import { useRef, useEffect } from "react";
import { css } from "styled-jsx/css";
import { useRecoilValue } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { uidState } from "../../../lib/atoms/userIdAtoms";
import { ObservedLocalDB } from "../../../lib/firebase/database";
import { FastNoteDate } from "../../../lib/fastNoteDate";

export default function MemoCategory() {
  const memoIndex = useRecoilValue(memoIndexState);
  const uid = useRecoilValue(uidState);
  const selectRef: React.LegacyRef<HTMLSelectElement> = useRef();

  let observedDB = new ObservedLocalDB(uid);
  let localDB = observedDB.getLocalDB();

  useEffect(() => {
    selectRef.current.value = localDB.memos[memoIndex].category;
  });

  let categories: string[] = [];
  for (let i = 0; i < Object.keys(localDB.categories).length; i++) {
    categories.push(localDB.categories[i]);
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fnd = new FastNoteDate();
    localDB.memos[memoIndex].updated = fnd.getCurrentDate();
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
              <option value={category} key={`option-category-${i}`}>
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
