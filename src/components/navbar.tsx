import { useState } from "react";
import css from "styled-jsx/css";
import { useRecoilValue } from "recoil";

import { getCategories } from "../lib/getMemo";
import { openNavbarState } from "../pages/home";

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

  return (
    <>
      <div className="categories-list">
        <ul>
          {categories.map((category, i) => {
            return (
              <li className="category">
                {category} ({count[i]})
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
  return (
    <>
      <button>設定</button>

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
          font-size: 2rem;
          margin-left: 4rem;
          list-style: none;
        }
      `}
    </style>
  );
};

const settingsButtonStyle = css`
  button {
    margin-left: 2rem;
    font-size: 2rem;
  }
`;
