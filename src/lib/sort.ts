import { dateInfoToNum } from "./fastNoteDate";

export function insertionSort(localDB: any): string[] {
  if (localDB.memos) {
    const keys = Object.keys(localDB.memos);

    let tmp = Number.MAX_SAFE_INTEGER;
    const sortedKeyList = keys.reduce((sorted, key) => {
      const updated = dateInfoToNum(localDB.memos[key].updated);

      if (updated <= tmp) {
        tmp = updated;
        sorted = sorted.concat(key);
      } else {
        const index = () => {
          for (let i = 0; i < sorted.length; i++) {
            const updated2 = dateInfoToNum(localDB.memos[sorted[i]].updated);
            if (updated2 <= updated) {
              return i;
            }
          }
        };
        sorted.splice(index(), 0, key);
      }
      return sorted;
    }, []);

    return sortedKeyList;
  }

  return [];
}
