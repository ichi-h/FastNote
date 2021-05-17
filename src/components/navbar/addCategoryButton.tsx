import { useSetRecoilState } from "recoil";
import { css } from "styled-jsx/css";

import { categoryInputState } from "../../lib/atoms/uiAtoms";

export default function AddCategoryButton() {
  const toggleInputState = useSetRecoilState(categoryInputState);

  const handleClick = () => toggleInputState(true);

  return (
    <>
      <button className="add-category-button" onClick={handleClick}>＋</button>

      <style jsx>{addCategoryButtonStyle}</style>
    </>
  );
}

const addCategoryButtonStyle = css`
  .add-category-button {
    font-size: 2rem;
  }
`;
