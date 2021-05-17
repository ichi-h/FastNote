import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import {
  openNavbarState,
  currentCategoryState,
  trashboxState,
} from "../../lib/atoms/uiAtoms";

function getCategories(memos: object): [string[], number[]] {
  if (memos) {
    const keys = Object.keys(memos);

    const selectedKeys = keys.filter(
      (key) => memos[key].trash === false // trash属性がtrue ＝ 捨てられている
    );
  
    if (selectedKeys.length !== 0) { // trash属性がfalseのメモが存在しない場合
      const categoriesSet = selectedKeys.map((key) => memos[key].category);
  
      const categories = categoriesSet.filter(
        (category, i, self) => self.indexOf(category) === i
      );
  
      const count = categories.map((category) => {
        return categoriesSet.filter((value) => value === category).length;
      });
  
      return [categories, count];
    }
  }

  return [["None"], [0]];
}

export default function CategoriesList(props: { categoriesChecked: boolean }) {
  const toggleNav = useSetRecoilState(openNavbarState);
  const toggleTrash = useSetRecoilState(trashboxState);
  const setCategory = useSetRecoilState(currentCategoryState);

  let localDB = JSON.parse(localStorage.getItem("database"));
  const [categories, count] = getCategories(localDB.memos);
  const total = count.reduce((sum, value) => sum + value);

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
              </li>
            );
          })}
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

        .category-button {
          font-size: 2rem;
        }
      `}
    </style>
  );
};
