interface HandlerProps {
  localDB: any;
}

interface DelCatProps extends HandlerProps {
  target: string
}

export type Handler = (props: HandlerProps) => void;

export const deleteCategory: Handler = (props: DelCatProps) => {
    const trashMemos = () => {
      if (props.localDB.memos) {
        const keys = Object.keys(props.localDB.memos);
        const selectedKeys = keys.filter(
          (key) => props.localDB.memos[key].category === props.target
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
        .filter((category) => category !== props.target);

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
