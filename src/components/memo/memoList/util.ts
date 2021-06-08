import { ArrayObject, Memo } from "../../../lib/fastNoteDB";

function joinObjectValues(obj: object): string {
  const res = Object.values(obj).reduce(
    (pre: string, value: string | object) => {
      if (typeof value === "object") {
        const valueStr = joinObjectValues(value);
        pre = pre.concat(valueStr);
      } else {
        pre = pre.concat(value);
      }
      return pre;
    },
    ""
  );

  return res;
}

export function getSelectedIndex(
  memos: ArrayObject<Memo>,
  sortedKeys: string[],
  category: string,
  keyword: string,
  star: boolean
) {
  if (!memos) {
    return [];
  }

  const narrowWithKeyword = (keys: string[]): string[] => {
    if (keyword === "") {
      return keys;
    }

    return keys.filter((key) => {
      const target = [
        memos[key].title,
        memos[key].category,
        joinObjectValues(memos[key].tags),
        memos[key].content,
      ].join("");
      return target.includes(keyword);
    });
  };

  const narrowWithCat = (keys: string[]): string[] => {
    if (category === "all") {
      return keys;
    }

    return keys.filter((key) => memos[key].category === category);
  };

  const narrowWithStar = (keys: string[]): string[] => {
    if (!star) {
      return keys;
    }

    return keys.filter((key) => memos[key].star);
  };

  const withKeyword = narrowWithKeyword(sortedKeys);
  const withCat = narrowWithCat(withKeyword);
  const withStar = narrowWithStar(withCat);

  return withStar.map((i) => Number(i));
}
