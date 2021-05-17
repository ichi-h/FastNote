import { atom, selector } from "recoil";

// 現在選択中のメモのインデックス
const memoIndexOriginState = atom({
  key: "memoIndexOriginState",
  default: "0",
});

export const memoIndexState = selector<string>({
  key: "memoIndexState",
  get: ({ get }) => {
    return get(memoIndexOriginState);
  },
  set: ({ set }, inputValue) => {
    console.log("set");

    const localDB = JSON.parse(localStorage.getItem("database"));
    const keys = Object.keys(localDB.memos).map((value) => Number(value));

    const res = binSearch(Number(inputValue), keys);
    console.log(res);

    if (res === "NotFound") {
      set(memoIndexOriginState, getlatestMemoIndex(keys, localDB));
    } else {
      set(memoIndexOriginState, inputValue);
    }
  },
});

const binSearch = (target: number, array: number[]) => {
  let res = "NotFound";
  let head = 0;
  let tail = array.length;

  console.log(target);
  console.log(array);

  while (head <= tail) {
    let center = Math.floor((head + tail) / 2);

    console.log(
      `head: ${head}, tail: ${tail}, center: ${center}, array[center]: ${array[center]}`
    );

    if (target === array[center]) {
      res = String(array[center]);
      break;
    }

    if (array[center] < target) {
      head = center + 1;
    } else if (target < array[center]) {
      tail = center - 1;
    }
  }

  return res;
};

const getlatestMemoIndex = (keys: number[], localDB: any) => {
  const latestMemoIndex = keys.reduce((pre, cur) => {
    const preUpdated = Number(localDB.memos[pre].updated);
    const curUpdated = Number(localDB.memos[cur].updated);

    if (preUpdated < curUpdated) return cur;
    else return pre;
  }, Math.min(...keys));

  return String(latestMemoIndex);
};
