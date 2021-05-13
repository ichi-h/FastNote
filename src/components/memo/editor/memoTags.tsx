import { useRef, useEffect } from "react";
import { css } from "styled-jsx/css";
import { useRecoilValue } from "recoil";

import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import React from "react";

export default function MemoTags() {
  const memoIndex = useRecoilValue(memoIndexState);
  let localDB = JSON.parse(localStorage.getItem("database"));
  const tagsRef: React.RefObject<HTMLInputElement> = useRef();
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
    localDB.memos[memoIndex].tags = e.currentTarget.value.split(", ");
    localStorage.setItem("database", JSON.stringify(localDB));
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
  .tags-area {
    width: 100%;
  }
`;
