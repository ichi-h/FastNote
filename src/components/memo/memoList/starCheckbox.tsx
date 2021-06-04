import { css } from "styled-jsx/css";

import theme from "../../../lib/theme";

interface StarCheckboxProps {
  id: string;
  name: string;
  onChange: () => void;
  defaultChecked: boolean;
}

export default function StarCheckbox(props: StarCheckboxProps) {
  return (
    <>
      <label className="star-checkbox" htmlFor={props.id}>
        <input
          type="checkbox"
          className="star"
          name={props.name}
          id={props.id}
          defaultChecked={props.defaultChecked}
          onChange={props.onChange}
        />
        <i className="icon-star" />
      </label>

      <style jsx>{starCheckboxStyle}</style>
    </>
  );
}

const starCheckboxStyle = css`
  .star-checkbox {
    cursor: pointer;
    font-size: 2rem;
  }

  .star {
    display: none;
  }

  .star ~ .icon-star::before {
    color: rgba(0, 0, 0, 0.1);
  }

  .star:checked ~ .icon-star::before {
    color: ${theme.subColor};
  }
`;
