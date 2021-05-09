import React from "react";
import Head from "next/head";
import css from "styled-jsx/css";
import getMemo from "../../lib/getMemo"

export default function MemoList() {
  const memo = getMemo();

  return (
    <>
      <div className="memo-list">
        MomeList
      </div>

      <style jsx>{memoListStyle}</style>
    </>
  );
}

const memoListStyle = css`
  .memo-list {
    height: 100%;
  }
`;
