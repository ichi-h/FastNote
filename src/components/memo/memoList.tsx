import { css } from "styled-jsx/css";
import { useRecoilValue, useRecoilState } from "recoil";

import { currentCategoryState, trashboxState } from "../../lib/atoms/uiAtoms";
import { memoIndexState } from "../../lib/atoms/editorAtoms";
import { localDBState } from "../../lib/atoms/localDBAtom";
import { numToStr } from "../../lib/fastNoteDate";

import Tags from "./memoList/tags";
import TrashRevertButton, { FuncType } from "./memoList/trashRevertButton";
import StarButton from "./memoList/starButton";
import DeleteButton from "./memoList/deleteButton";

function getSelectedIndex(memos: object, category: string) {
  if (memos) {
    const keys = Object.keys(memos);

    if (category === "all") {
      return Object.keys(memos).map((value) => Number(value));
    }

    const memosKeyList = keys.filter((key) => memos[key].category === category);

    return memosKeyList.map((i) => Number(i));
  }

  return [];
}

function starOrDel(trashbox: boolean, index: number) {
  if (trashbox) {
    return <DeleteButton index={index} />;
  } else {
    return <StarButton index={index} />;
  }
}

export default function MemoList() {
  const currentCategory = useRecoilValue(currentCategoryState);
  const trashbox = useRecoilValue(trashboxState);
  const [memoIndex, setMemoIndex] = useRecoilState(memoIndexState);

  const localDB = JSON.parse(useRecoilValue(localDBState));

  const index = getSelectedIndex(localDB.memos, currentCategory);

  const funcType: (trashbox: boolean) => FuncType = () => {
    switch (trashbox) {
      case false:
        return "trash";
      case true:
        return "revert";
    }
  };

  const focused = (i: number) => {
    if (String(i) === memoIndex) {
      return "focused";
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const idName = e.currentTarget.id;
    const targetIndex = idName.replace("memo-item-", "");

    setMemoIndex(targetIndex);
  };

  return (
    <>
      <div className="memo-list">
        {index.map((i) => {
          if (localDB.memos[i].trash === trashbox) {
            return (
              <>
                <div
                  className={`memo-item ${focused(i)}`}
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
                    <Tags localDB={localDB} index={i} />

                    <div className="buttons">
                      <div>
                        <TrashRevertButton func={funcType(trashbox)} index={i} />
                      </div>
                      <div>{starOrDel(trashbox, i)}</div>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            );
          }
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
    user-select: none;
  }

  .memo-item {
    display: flex;
    flex-direction: column;
    height: 16vh;
    margin: 1rem;
    cursor: pointer;
  }

  .memo-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .memo-item:active {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .memo-item.focused {
    outline: 2px solid rgb(150, 150, 150);
    background-color: rgba(0, 0, 0, 0.03);
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
    margin-bottom: 1rem;
  }
  .item-bottom {
    height: 25%;
  }

  .title,
  .update-date,
  .content,
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
`;
