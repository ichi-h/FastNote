import { css } from "styled-jsx/css";
import { useRecoilValue } from "recoil";

import { getMemo } from "../../lib/getMemo";
import { currentCategoryState } from "../../lib/atoms/uiAtoms";

export default function MemoList() {
  const currentCategory = useRecoilValue(currentCategoryState);
  const memo = getMemo(currentCategory);

  return (
    <>
      <div className="memo-list">
        {memo.map((value, i) => {
          return (
            <div className={`memo-item-${i}`} id={`memo-item-${i}`}>
              <div className="item-top">
                <p className="title">{value.title}</p>
                <p className="update-date">{value.updateDate}</p>
              </div>

              <div className="item-mid">
                <p className="content">{value.content}</p>
              </div>

              <div className="item-bottom">
                <div className="tags">
                  {value.tags.map((tag) => {
                    return <span className="tag-item">{tag}</span>;
                  })}
                </div>

                <div className="buttons">
                  <div>
                    <button>箱</button>
                  </div>
                  <div>
                    <label htmlFor="">
                      <input
                        type="checkbox"
                        className={`star-${i}`}
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

  div[class*="memo-item-"] {
    height: 15vh;
    border: 1px solid black;
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

  .tag-item {
    border: 1px solid black;
    padding: 0 1rem;
    margin-right: 1rem;
    border-radius: 1rem;
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

  input[class*="star-"] {
    display: none;
  }
`;
