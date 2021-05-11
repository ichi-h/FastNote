import { css } from "styled-jsx/css";

export default function MemoTags() {
  return (
    <>
      <div className="memo-tags">
        <input
          type="text"
          className="tags-area"
          name="tags-area"
          id="tags-area"
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
