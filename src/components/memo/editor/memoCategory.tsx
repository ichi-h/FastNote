import { css } from "styled-jsx/css";

export default function MemoCategory() {
  return (
    <>
      <div className="memo-category">
        <select
          className="category-area"
          name="category-area"
          id="category-area"
        >
          <option value="sample1">sample1</option>
          <option value="sample2">sample2</option>
          <option value="sample3">sample3</option>
        </select>
      </div>

      <style jsx>{memoCategoryStyle}</style>
    </>
  );
}

const memoCategoryStyle = css`
  .category-area {
    width: 100%;
  }
`;
