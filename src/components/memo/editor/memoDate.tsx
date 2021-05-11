import { css } from "styled-jsx/css";

export default function MemoDate() {
  return (
    <>
      <div className="memo-date">
        {`2021/05/01`} - {`2021/05/04`}
      </div>

      <style jsx>{memoDateStyle}</style>
    </>
  );
}

const memoDateStyle = css`
  .memo-date {
    text-align: right;
    margin: auto 0;
  }
`;
