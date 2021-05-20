import { Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";

import { deleteCategory } from "../ellipse/handler";
import { localDBState } from "../../../lib/atoms/localDBAtom";
import {
  openNavbarState,
  currentCategoryState,
  trashboxState,
  urlState,
} from "../../../lib/atoms/uiAtoms";

import EllipsisButton from "../ellipse/ellipsisButton";

function getCategories(localDB: any): [string[], number[]] {
  const categories = Object.entries(localDB.categories).map(
    ([_, category]: [string, string]) => category
  );

  let count = new Array<number>(categories.length).fill(0);

  if (localDB.memos) {
    const keys = Object.keys(localDB.memos);

    const selectedKeys = keys.filter(
      (key) => localDB.memos[key].trash === false // trash属性がtrue ＝ 捨てられている
    );

    if (selectedKeys.length !== 0) {
      // trash属性がfalseのメモが存在しない場合
      count = selectedKeys.reduce((pre, key) => {
        const index = categories.indexOf(localDB.memos[key].category);
        if (index !== -1) {
          pre[index] += 1;
        }
        return pre;
      }, count);
    }
  }

  return [categories, count];
}

export default function CategoriesList(props: { categoriesChecked: boolean }) {
  const toggleNav = useSetRecoilState(openNavbarState);
  const toggleTrash = useSetRecoilState(trashboxState);
  const setCategory = useSetRecoilState(currentCategoryState);
  const setURL = useSetRecoilState(urlState);

  let localDB = JSON.parse(useRecoilValue(localDBState));
  const [categories, count] = getCategories(localDB);
  const total = count.reduce((sum, value) => sum + value);

  categories.pop();
  const numberOfNone = count.pop();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    toggleNav(false);
    toggleTrash(false);
    setURL("/home");
    setCategory(e.currentTarget.classList[1]);
  };

  return (
    <>
      <div className="categories-list">
        <ul>
          <li className="category">
            <Link to="/home">
              <div className="category-button all" onClick={handleClick}>
              <span className="category-name">すべてのカテゴリー</span> ({total})
              </div>
            </Link>
          </li>
          {categories.map((category, i) => {
            return (
              <li className="category" key={`category-${i}`}>
                <Link to="/home">
                  <div
                    className={`category-button ${category}`}
                    onClick={handleClick}
                  >
                    <span className="category-name">{category}</span> ({count[i]})
                  </div>
                </Link>
                <EllipsisButton
                  items={[
                    {
                      name: "削除",
                      handler: deleteCategory,
                      buttonValue: category,
                    },
                  ]}
                />
              </li>
            );
          })}
          <li className="category">
            <Link to="/home">
              <div className="category-button None" onClick={handleClick}>
              <span className="category-name">None</span> ({numberOfNone})
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {categoriesListStyle(props.categoriesChecked)}
    </>
  );
}

const categoriesListStyle = (categoriesChecked: boolean) => {
  const showCategories = (bool: boolean) => {
    if (bool) return "initial";
    else return "none";
  };

  return (
    <style jsx>
      {`
        .categories-list {
          display: ${showCategories(categoriesChecked)};
          transition: 0.3s;
        }

        .category {
          position: relative;
          margin-left: 2rem;
          height: 3rem;
          list-style: none;
        }

        .category:hover {
          background-color: rgba(0, 0, 0, 0.1);
          transition: 0.1s;
        }

        .category-button {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }

        .category-name {
          display: inline-block;
          max-width: 15vw;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          vertical-align: bottom;
        }

        @media screen and (max-width: 550px) {
          .category-name {
            max-width: 30vw;
          }
        }
      `}
    </style>
  );
};
