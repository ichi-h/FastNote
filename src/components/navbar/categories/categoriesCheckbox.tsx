import { css } from "styled-jsx/css";

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
