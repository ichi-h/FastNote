interface HandlerProps {
  localDB: any;
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
}

export type Handler = (props: HandlerProps) => void;

export const deleteCategory: Handler = (props: HandlerProps) => {
  const target = props.e.currentTarget.value;

  const trashMemos = () => {
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

  const delCat = () => {
    const categoryList = Object.entries(props.localDB.categories)
      .map(([_, category]: [string, string]) => category)
      .filter((category) => category !== target);

    const categoryObj = categoryList.reduce((pre, cur, i) => {
      pre[i] = cur;
      return pre;
    }, {});

    props.localDB.categories = categoryObj;
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
