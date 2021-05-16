import { useRecoilState } from "recoil";

import { localDBState } from "../../../lib/atoms/localDBAtom";
import { memoIndexState } from "../../../lib/atoms/editorAtoms";

export default function DeleteButton(props: { index: number }) {
  const [memoIndex, setIndex] = useRecoilState(memoIndexState);
  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  const handleClick = () => {
    if (Number(memoIndex) === props.index) {
      const keys = Object.keys(localDB.memos).map((value) => Number(value));
      const maxValue = keys.reduce((pre, cur) => {
        return Math.max(pre, cur);
      });
      setIndex(String(maxValue));
    }

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
