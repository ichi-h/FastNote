import React from "react";
import Head from "next/head";
import css from "styled-jsx/css";
import getMemo from "../../lib/getMemo";

export default function MemoList() {
  const memo = getMemo();

  return (
    <>
      <div className="memo-list">
        {memo.map((value, i) => {
          return (
            <div className={`memo-item-${i}`} id={`memo-item-${i}`}>
              {value.title}
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
    height: 15%;
    border: 1px solid black;
  }
`;
