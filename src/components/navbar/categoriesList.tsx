import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { openNavbarState, currentCategoryState } from "../../lib/atoms/uiAtoms";

function getCategories(memos: object): [string[], number[]] {
  let categoriesSet: string[] = [];
  for (let i = 0; i < Object.keys(memos).length; i++) {
    categoriesSet.push(memos[i].category);
  }

  const categories = categoriesSet.filter(
    (category, i, self) => self.indexOf(category) === i
  );

  const count = categories.map((category) => {
    return categoriesSet.filter((value) => value === category).length;
  });

  return [categories, count];
}

export default function CategoriesList(props: { categoriesChecked: boolean }) {
  const toggle = useSetRecoilState(openNavbarState);
  const setCategory = useSetRecoilState(currentCategoryState);
  let localDB = JSON.parse(localStorage.getItem("database"));

  const [categories, count] = getCategories(localDB.memos);

  const total = count.reduce((sum, value) => sum + value);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    toggle(false);
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
              <li className="category">
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
          margin-left: 4rem;
          list-style: none;
        }

        .category-button {
          font-size: 2rem;
        }
      `}
    </style>
  );
};
