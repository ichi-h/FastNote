import { useState } from "react";
import { useRecoilState } from "recoil";

import { localDBState } from "../../../lib/atoms/localDBAtom";

import StarCheckbox from "./starCheckbox";

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
    <StarCheckbox
      id={`star-${props.index}`}
      name="star-button"
      defaultChecked={checked}
      onChange={handleChange}
    />
  );
}
