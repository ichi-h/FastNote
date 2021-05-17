import { useRecoilState, useSetRecoilState } from "recoil";

import { localDBState } from "../../../lib/atoms/localDBAtom";
import { memoIndexState } from "../../../lib/atoms/editorAtoms";

export type FuncType = "trash" | "revert";

export default function TrashRevertButton(props: {
  func: FuncType;
  index: number;
}) {
  const setIndex = useSetRecoilState(memoIndexState);

  const trashAtr = (func: FuncType) => {
    switch (func) {
      case "trash":
        return true;
      case "revert":
        return false;
    }
  };

  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  const handleClick = () => {
    setIndex("-1");
    localDB.memos[props.index].trash = trashAtr(props.func);
    setLocalDB(JSON.stringify(localDB));
  };

  return (
    <>
      <div className="trash-revert-button">
        <button onClick={handleClick}>箱</button>
      </div>
    </>
  );
}
