import { css } from "styled-jsx/css";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { currentCategoryState } from "../../lib/atoms/uiAtoms";
import { memoIndexState } from "../../lib/atoms/editorAtoms";
import { uidState } from "../../lib/atoms/userIdAtoms";
import { numToStr } from "../../lib/fastNoteDate";
import { ObservedLocalDB } from "../../lib/firebase/database";

function getSelectedIndex(memos: object, category: string) {
  const memosLen = Object.keys(memos).length;

  if (category === "all") {
    return new Array(memosLen).fill(0).map((_, i) => i);
  }

  let index: number[] = [];
  for (let i = 0; i < memosLen; i++) {
    if (memos[i].category === category) index.push(i);
  }

  return index;
}

function getTagsElements(localDB: any, i: number) {
  const options = Object.fromEntries(
    Object.entries(localDB.memos[i].tags).map(([_, tag], j) => {
      return [
        _,
        <>
          <span className="tag-item" key={`tag-item-${j}`}>
            {tag}
          </span>
          <style jsx>{tagItemStyle}</style>
        </>,
      ];
    })
  );

  const tagsSize = Object.keys(options).length;
  let res: JSX.Element[] = [];
  for (let j = 0; j < tagsSize; j++) {
    res.push(options[j]);
  }

  return res;
}

export default function MemoList() {
  const currentCategory = useRecoilValue(currentCategoryState);
  const setMemoIndex = useSetRecoilState(memoIndexState);
  const uid = useRecoilValue(uidState);

  let observedDB = new ObservedLocalDB(uid);
  let localDB = observedDB.getLocalDB();

  const index = getSelectedIndex(localDB.memos, currentCategory);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const classNeme = e.currentTarget.classList[1];
    const targetIndex = classNeme.replace("memo-item-", "");

    setMemoIndex(targetIndex);
  };

  return (
    <>
      <div className="memo-list">
        {index.map((i) => {
          return (
            <div
              className={`memo-item`}
              id={`memo-item-${i}`}
              key={`memo-item-${i}`}
              onClick={handleClick}
            >
              <div className="item-top">
                <p className="title">{localDB.memos[i].title}</p>
                <p className="update-date">
                  {numToStr(localDB.memos[i].updated, false)}
                </p>
              </div>

              <div className="item-mid">
                <p className="content">{localDB.memos[i].content}</p>
              </div>

              <div className="item-bottom">
                <div className="tags">{getTagsElements(localDB, i)}</div>

                <div className="buttons">
                  <div>
                    <button>箱</button>
                  </div>
                  <div>
                    <label htmlFor="">
                      <input
                        type="checkbox"
                        className={`star`}
                        name="star"
                        id={`star-${i}`}
                      />
                      ☆
                    </label>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{memoListStyle}</style>
    </>
  );
}

const memoListStyle = css`
  .memo-list {
    height: 100%;
    overflow-y: scroll;
  }

  .memo-item {
    height: 15vh;
    border: 1px solid black;
    cursor: pointer;
  }

  .item-top,
  .item-mid,
  .item-bottom {
    position: relative;
  }

  .item-top {
    height: 25%;
  }
  .item-mid {
    height: 50%;
  }
  .item-bottom {
    height: 25%;
  }

  .title,
  .update-date,
  .content,
  .tags,
  .buttons {
    position: absolute;
  }

  .title {
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    font-size: 2rem;
  }

  .update-date {
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
  }

  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    height: 100%;
    width: 100%;
    padding: 1rem;
  }

  .tags {
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }

  .buttons {
    display: flex;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
  }

  .buttons > div:first-child,
  .buttons > div:last-child {
    margin-left: 1rem;
  }

  .star {
    display: none;
  }
`;

const tagItemStyle = css`
  .tag-item {
    border: 1px solid black;
    padding: 0 1rem;
    margin-right: 1rem;
    border-radius: 1rem;
  }
`;
