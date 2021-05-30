interface HandlerProps {
  localDB: any;
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

interface DelTrashMemosProps extends HandlerProps {
  setIndex: (index: string) => void;
}

export type HandlerType =
  | "deleteCategory"
  | "renameCategory"
  | "deleteTrashedMemos";

export type Handler = (
  props: HandlerProps | DelTrashMemosProps
) => Promise<unknown>;

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

export const renameCategory: Handler = (props: HandlerProps) => {
  return new Promise((resolve) => {
    const oldCatName = props.e.currentTarget.value;

    const getNewName = () => {
      return new Promise<string>((res) => {
        const ans = prompt(`
          "${oldCatName}" の新しいカテゴリー名を入力してください。
        `);

        res(ans);
      });
    };

    const updateCategory = async (target: string, newName: string) => {
      const keys = Object.keys(props.localDB[target]);

      props.localDB[target] = keys.reduce((pre, key) => {
        switch (target) {
          case "memos":
            let memo = props.localDB[target][key];
            if (memo.category === oldCatName) {
              memo.category = newName;
            }

            pre[key] = memo;
            return pre;

          case "categories":
            if (props.localDB[target][key] === oldCatName) {
              pre[key] = newName;
            } else {
              pre[key] = props.localDB[target][key];
            }

            return pre;
        }
      }, {});
    };

    getNewName()
      .then(async (newName) => {
        if (Boolean(newName)) {
          await updateCategory("memos", newName);
          await updateCategory("categories", newName);
        }
      })
      .then(resolve);
  });
};

export const deleteTrashedMemos: Handler = (props: DelTrashMemosProps) => {
  return new Promise((resolve) => {
    const deleteMemos = async () => {
      if (props.localDB.memos) {
        props.localDB.memos = Object.keys(props.localDB.memos)
          .filter((key) => props.localDB.memos[key].trash === false)
          .reduce((pre, cur) => {
            pre[cur] = props.localDB.memos[cur];
            return pre;
          }, {});
      }
    };

    deleteMemos()
      .then(() => props.setIndex("-1"))
      .then(resolve);
  });
};
