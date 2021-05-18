export const deleteCategory = (localDB: any, target: string) => {
    const trashMemos = () => {
      if (localDB.memos) {
        const keys = Object.keys(localDB.memos);
        const selectedKeys = keys.filter(
          (key) => localDB.memos[key].category === target
        );

        for (let key of selectedKeys) {
          localDB.memos[key].category = "None";
          localDB.memos[key].trash = true;
        }
      }
    };

    const delCat = () => {
      const categoryList = Object.entries(localDB.categories)
        .map(([_, category]: [string, string]) => category)
        .filter((category) => category !== target);

      const categoryObj = categoryList.reduce((pre, cur, i) => {
        pre[i] = cur;
        return pre;
      }, {});

      localDB.categories = categoryObj;
    };

    trashMemos();
    delCat();
};

export const renameCategory = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {};

export const deleteTrashedMemos = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {};
