import { useState } from "react";
import { Link } from "react-router-dom";
import css from "styled-jsx/css";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { getCategories } from "../lib/getMemo";
import { openNavbarState } from "../pages/home";
import { currentCategoryState } from "../components/memo/memoList";

function CategoriesCheckbox(props: {
  categoriesChecked: boolean;
  clickHandle: () => void;
}) {
  return (
    <>
      <label htmlFor="categories-checkbox" className="checkbox-label">
        <input
          type="checkbox"
          className="categories-checkbox"
          name="categories-checkbox"
          id="categories-checkbox"
          defaultChecked={props.categoriesChecked}
          onClick={props.clickHandle}
        />
        カテゴリー
      </label>

      <style jsx>{categoriesCheckboxStyle}</style>
    </>
  );
}

function CategoriesList(props: { categoriesChecked: boolean }) {
  const [categories, count] = getCategories();
  const toggle = useSetRecoilState(openNavbarState);
  const setCategory = useSetRecoilState(currentCategoryState);

  const total = count.reduce((sum, value) => sum + value);

  const clickHandle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    toggle(false);
    setCategory(e.currentTarget.classList[1]);
  };

  return (
    <>
      <div className="categories-list">
        <ul>
          <li className="category">
            <Link to="/home">
              <div className="category-button all" onClick={clickHandle}>
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
                    onClick={clickHandle}
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

function SettingsButton() {
  const toggle = useSetRecoilState(openNavbarState);

  const clickHandle = () => {
    toggle(false);
  };

  return (
    <>
      <Link to="/home/settings">
        <div className="settings-button" onClick={clickHandle}>
          設定
        </div>
      </Link>

      <style jsx>{settingsButtonStyle}</style>
    </>
  );
}

export default function Navbar() {
  const checked = useRecoilValue(openNavbarState);

  const [categoriesChecked, toggle] = useState(true);

  const clickHandle = () => {
    toggle(!categoriesChecked);
  };

  return (
    <>
      <div className="navbar">
        <div className="categories">
          <CategoriesCheckbox
            categoriesChecked={categoriesChecked}
            clickHandle={clickHandle}
          />

          <CategoriesList categoriesChecked={categoriesChecked} />
        </div>

        <SettingsButton />
      </div>

      {navbarStyle(checked)}
    </>
  );
}

const navbarStyle = (checked: boolean) => {
  const leftPos = (bool: boolean) => {
    if (bool) return "0";
    else return "-20vw";
  };

  return (
    <style jsx>{`
      .navbar {
        position: absolute;
        top: 0;
        left: ${leftPos(checked)};
        width: 20vw;
        height: 100%;
        border: 1px solid black;
        background-color: white;
        transition: 0.3s;
        z-index: 1000;
      }

      .categories {
        margin: 2rem 0;
      }
    `}</style>
  );
};

const categoriesCheckboxStyle = css`
  .checkbox-label {
    font-size: 2rem;
    margin-left: 2rem;
  }

  .categories-checkbox {
    display: none;
  }
`;

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

const settingsButtonStyle = css`
  .settings-button {
    margin-left: 2rem;
    font-size: 2rem;
    cursor: pointer;
  }
`;
