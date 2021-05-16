import { useRecoilState } from "recoil";

import { localDBState } from "../../../lib/atoms/localDBAtom";

export default function DeleteButton(props: { index: number }) {
  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  const handleClick = () => {
    delete localDB.memos[props.index];
    setLocalDB(JSON.stringify(localDB));
  };

  return (
    <>
      <div className="delete-button">
        <button onClick={handleClick}>消</button>
      </div>
    </>
  );
}
