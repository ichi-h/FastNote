import { css } from "styled-jsx/css";

export default function MemoTitle() {
  return (
    <>
      <div className="memo-title">
        <input
          type="text"
          className="title-area"
          name="title-area"
          id="title-area"
        />
      </div>

      <style jsx>{memoTitleStyle}</style>
    </>
  );
}

const memoTitleStyle = css`
  .title-area {
    width: 100%;
    font-size: 2rem;
  }
`;
