import { useState } from "react";
import { useRecoilState } from "recoil";
import { css } from "styled-jsx/css";

import { localDBState } from "../../../lib/atoms/localDBAtom";
import { insertionSort } from "../../../lib/sort";
import theme from "../../../lib/theme";

export default function StarButton(props: { index: number }) {
  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  const [checked, toggle] = useState(Boolean(localDB.memos[props.index].star));

  const handleChange = () => {
    toggle(!checked);
    localDB.memos[props.index].star = !checked;
    setLocalDB(JSON.stringify(localDB));
  };

  return (
    <>
      <label className="star-button" htmlFor={`star-${props.index}`}>
        <input
          type="checkbox"
          className={`star`}
          name="star"
          id={`star-${props.index}`}
          defaultChecked={checked}
          onChange={handleChange}
        />
        <i className="icon-star" />
      </label>

      <style jsx>{starButtonStyle}</style>
    </>
  );
}

const starButtonStyle = css`
  .star-button {
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
