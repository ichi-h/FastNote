import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import {
  openNavbarState,
  currentCategoryState,
  trashboxState,
} from "../../lib/atoms/uiAtoms";

import EllipsisButton from "./ellipsisButton";

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

  let localDB = JSON.parse(localStorage.getItem("database"));
  const [categories, count] = getCategories(localDB);
  const total = count.reduce((sum, value) => sum + value);

  categories.pop();
  const numberOfNone = count.pop();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    toggleNav(false);
    toggleTrash(false);
    setCategory(e.currentTarget.classList[1]);
  };

  return (
    <>
      <div className="categories-list">
        <ul>
          <li className="category">
            <Link to="/home">
              <div className="category-button all" onClick={handleClick}>
                すべてのカテゴリー ({total})
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
                    {category} ({count[i]})
                  </div>
                </Link>
                <EllipsisButton />
              </li>
            );
          })}
          <li className="category">
            <Link to="/home">
              <div className="category-button None" onClick={handleClick}>
                None ({numberOfNone})
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
          margin-left: 2rem;
          list-style: none;
        }

        .category:hover {
          background-color: rgba(0, 0, 0, 0.1);
          transition: 0.1s;
        }

        .category-button {
          font-size: 2rem;
        }
      `}
    </style>
  );
};
