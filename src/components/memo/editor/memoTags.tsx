import { useRef, useEffect } from "react";
import { css } from "styled-jsx/css";
import { useRecoilState } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { localDBState } from "../../../lib/atoms/localDBAtom";
import { getCurrentDate } from "../../../lib/fastNoteDate";
import { insertionSort } from "../../../lib/sort";

export default function MemoTags() {
  const [memoIndex, setIndex] = useRecoilState(memoIndexState);
  const tagsRef: React.RefObject<HTMLInputElement> = useRef();

  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  let tags: string[] = [];

  const updateTags = () => {
    let newTags: string[] = [];
    const tagsSize = Object.keys(localDB.memos[memoIndex].tags).length;
    for (let i = 0; i < tagsSize; i++) {
      newTags.push(localDB.memos[memoIndex].tags[i]);
    }
    tags = newTags;
  };

  useEffect(() => {
    updateTags();
    tagsRef.current.value = tags.join(", ");
  });

  const handleChangeTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentDate = getCurrentDate(new Date());
    localDB.memos[memoIndex].updated = currentDate;
    localDB.memos[memoIndex].tags = e.currentTarget.value.split(", ");
    insertionSort(localDB, setLocalDB);
    setIndex("0");
  };

  return (
    <>
      <div className="memo-tags">
        <input
          type="text"
          className="tags-area"
          name="tags-area"
          id="tags-area"
          ref={tagsRef}
          defaultValue={tags.join(", ")}
          onChange={handleChangeTags}
        />
      </div>

      <style jsx>{memoTagsStyle}</style>
    </>
  );
}

const memoTagsStyle = css`
  .memo-tags {
    margin: auto 0;
  }

  .tags-area {
    width: 100%;
  }
`;
