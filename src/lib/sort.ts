export async function insertionSort(localDB: any, callback: (localDBStr: string) => void) {
  const sort = async () => {
    if (localDB.memos) {
      const keys = Object.keys(localDB.memos);
  
      let tmp = Number.MAX_SAFE_INTEGER;
      const sortedKeyList = keys.reduce((sorted, key) => {
        const updated = Number(localDB.memos[key].updated);
        if (updated <= tmp) {
          tmp = updated;
          sorted = sorted.concat(key);
        } else {
          const index = () => {
            for (let i = 0; i < sorted.length; i++) {
              if (localDB.memos[sorted[i]].updated <= updated) {
                if (i === 0) return 0;
                else return i - 1;
              }
            }
          };
          sorted.splice(index(), 0, key);
        }
        return sorted;
      }, []);
  
      localDB.memos = sortedKeyList.reduce((pre, key, i) => {
        pre[i] = localDB.memos[key];
        return pre;
      }, {});
    }
  }

  await sort().then(() => {callback(JSON.stringify(localDB))});
}