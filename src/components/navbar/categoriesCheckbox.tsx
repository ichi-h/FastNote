import { css } from "styled-jsx/css";

export default function CategoriesCheckbox(props: {
  categoriesChecked: boolean;
  handleClick: () => void;
}) {
  return (
    <>
      <label htmlFor="categories-checkbox" className="checkbox-label">
        <input
          type="checkbox"
          className="categories-checkbox"
          name="categories-checkbox"
          id="categories-checkbox"
          defaultChecked={props.categoriesChecked}
          onClick={props.handleClick}
        />
        カテゴリー
      </label>

      <style jsx>{categoriesCheckboxStyle}</style>
    </>
  );
}

const categoriesCheckboxStyle = css`
  .checkbox-label {
    font-size: 2rem;
  }

  .categories-checkbox {
    display: none;
  }
`;
