import { css } from "styled-jsx/css";

import AddCategoryButton from "./addCategoryButton";

export default function CategoriesCheckbox(props: {
  categoriesChecked: boolean;
  handleClick: () => void;
}) {
  const icon = () => {
    if (props.categoriesChecked) {
      return "icon-angle-down";
    } else {
      return "icon-angle-right";
    }
  };

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
        <i className={icon()} /> カテゴリー
        <span>
          <AddCategoryButton />
        </span>
      </label>

      <style jsx>{categoriesCheckboxStyle}</style>
    </>
  );
}

const categoriesCheckboxStyle = css`
  .checkbox-label {
    font-size: 2rem;
    cursor: pointer;
    width: 100%;
  }

  .checkbox-label:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .checkbox-label > span:last-child {
    margin-left: 1rem;
  }

  .categories-checkbox {
    display: none;
  }
`;
