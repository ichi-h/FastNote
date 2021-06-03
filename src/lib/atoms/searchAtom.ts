import { atom } from "recoil";
import { Position } from "codemirror";

interface PositionPairs {
  start: Position;
  end: Position;
}

// 検索するキーワード
export const searchKeywordState = atom({
  key: "searchKeywordState",
  default: "",
});

export const posPairsState = atom<PositionPairs[]>({
  key: "posPairsState",
  default: [] as PositionPairs[],
});

export const getMarkerPos = (
  keyword: string,
  content: string
): PositionPairs[] => {
  if (keyword === "" || content === "") {
    return [];
  }

  const res = content.split(/\r\n|\n/).reduce((pre: PositionPairs[], text, i) => {
    let start = 0;

    while (true) {
      const index = text.indexOf(keyword, start);

      if (index === -1) {
        break;
      }

      pre.push({
        start: {
          line: i,
          ch: index,
        },
        end: {
          line: i,
          ch: index + keyword.length,
        }
      });

      start = index + keyword.length;
    }

    return pre;
  }, []);

  return res;
};
