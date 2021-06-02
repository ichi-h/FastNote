import { useRef, useEffect } from "react";
import { css } from "styled-jsx/css";
import { useRecoilState, useRecoilValue } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { localDBState } from "../../../lib/atoms/localDBAtom";
import { getCurrentDate } from "../../../lib/fastNoteDate";

export default function MemoCategory() {
  const memoIndex = useRecoilValue(memoIndexState);
  const selectRef: React.LegacyRef<HTMLSelectElement> = useRef();

  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  useEffect(() => {
    selectRef.current.value = localDB.memos[memoIndex].category;
  });

  let categories: string[] = [];
  for (let i = 0; i < Object.keys(localDB.categories).length; i++) {
    categories.push(localDB.categories[i]);
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentDate = getCurrentDate(new Date());
    localDB.memos[memoIndex].updated = currentDate;
    localDB.memos[memoIndex].category = e.currentTarget.value;
    setLocalDB(JSON.stringify(localDB));
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
  .memo-category {
    margin: auto 0;
  }

  .category-area {
    width: 100%;
  }
`;
