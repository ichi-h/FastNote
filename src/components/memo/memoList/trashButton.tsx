import { useRecoilState } from "recoil";

import { localDBState } from "../../../lib/atoms/localDBAtom";

export default function TrashButton(props: { index: number }) {
  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  const handleClick = () => {
    localDB.memos[props.index].trash = true;
    setLocalDB(JSON.stringify(localDB));
  };

  return (
    <>
      <div className="trash-button">
        <button onClick={handleClick}>箱</button>
      </div>
    </>
  );
}
