import { useState } from "react";
import { useRecoilState } from "recoil";
import { css } from "styled-jsx/css";

import { localDBState } from "../../../lib/atoms/localDBAtom";
import { insertionSort } from "../../../lib/sort";

export default function StarButton(props: { index: number }) {
  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  const [checked, toggle] = useState(Boolean(localDB.memos[props.index].star));

  const handleChange = () => {
    toggle(!checked);
    localDB.memos[props.index].star = !checked;
    insertionSort(localDB, setLocalDB);
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
  }

  .star {
    display: none;
  }
`;
