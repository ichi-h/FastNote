interface HandlerProps {
  localDB: any;
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export type Handler = (props: HandlerProps) => Promise<unknown>;

export const deleteCategory: Handler = (props: HandlerProps) => {
  return new Promise((resolve) => {
    const target = props.e.currentTarget.value;

    const trashMemos = async () => {
      if (props.localDB.memos) {
        const keys = Object.keys(props.localDB.memos);
        const selectedKeys = keys.filter(
          (key) => props.localDB.memos[key].category === target
        );

        for (let key of selectedKeys) {
          props.localDB.memos[key].category = "None";
          props.localDB.memos[key].trash = true;
        }
      }
    };

    const delCat = async () => {
      const categoryList = Object.entries(props.localDB.categories)
        .map(([_, category]: [string, string]) => category)
        .filter((category) => category !== target);

      const categoryObj = categoryList.reduce((pre, cur, i) => {
        pre[i] = cur;
        return pre;
      }, {});

      props.localDB.categories = categoryObj;
    };

    const process = async () => {
      await trashMemos();
      await delCat();
    };

    process().then(resolve);
  });
};

export const renameCategory = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {};

export const deleteTrashedMemos = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {};
