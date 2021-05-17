import { useState } from "react";
import { useRecoilState } from "recoil";
import { css } from "styled-jsx/css";

import { localDBState } from "../../../lib/atoms/localDBAtom";

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
        ☆
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