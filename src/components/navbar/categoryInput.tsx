import { css } from "styled-jsx/css";

export default function CategoryInput() {
  return (
    <>
      <div className="category-input">
        <input type="text" name="" id="" />
        <button>×</button>
      </div>
      <style jsx>{categoryInputStyle}</style>
    </>
  );
}

const categoryInputStyle = css`
  .category-input {
    margin-left: 2rem;
  }
`;
