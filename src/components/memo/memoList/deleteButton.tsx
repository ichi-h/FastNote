import { useRecoilState, useSetRecoilState } from "recoil";

import { localDBState } from "../../../lib/atoms/localDBAtom";
import { memoIndexState } from "../../../lib/atoms/editorAtoms";

export default function DeleteButton(props: { index: number }) {
  const setIndex = useSetRecoilState(memoIndexState);
  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  const handleClick = () => {
    const deleteMemo = async () => {
      delete localDB.memos[props.index];
    };

    const shiftIndex = async () => {
      setIndex("-1");
    };

    const updateLocalDB = async () => {
      setLocalDB(JSON.stringify(localDB));
    };

    const process = async () => {
      await deleteMemo();
      await shiftIndex();
      await updateLocalDB();
    };

    process();
  };

  return (
    <>
      <div className="delete-button">
        <button onClick={handleClick}>消</button>
      </div>
    </>
  );
}
