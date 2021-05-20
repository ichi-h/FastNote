import { useState } from "react";
import { useRecoilValue } from "recoil";

import { openNavbarState } from "../lib/atoms/uiAtoms";

import CategoriesCheckbox from "./navbar/categories/categoriesCheckbox";
import CategoryInput from "./navbar/categories/categoryInput";
import CategoriesList from "./navbar/categories/categoriesList";
import TextButton from "./navbar/textButton";

export default function Navbar() {
  const checked = useRecoilValue(openNavbarState);

  const [categoriesChecked, toggle] = useState(true);

  const handleClick = () => {
    toggle(!categoriesChecked);
  };

  return (
    <>
      <div className="navbar">
        <div className="categories">
          <div className="buttons">
            <CategoriesCheckbox
              categoriesChecked={categoriesChecked}
              handleClick={handleClick}
            />
          </div>

          <CategoryInput />

          <CategoriesList categoriesChecked={categoriesChecked} />
        </div>

        <TextButton type="trash" />
        <TextButton type="settings" />
        <TextButton type="logout" />
      </div>

      {navbarStyle(checked)}
    </>
  );
}

const navbarStyle = (checked: boolean) => {
  const leftPos = (bool: boolean) => {
    if (window.matchMedia('(max-width: 550px)').matches) {
      if (bool) return "0";
      else return "-50vw";
    } else {
      if (bool) return "0";
      else return "-20vw";
    }
  };

  return (
    <style jsx>{`
      .navbar {
        position: absolute;
        top: 0;
        left: ${leftPos(checked)};
        width: 20vw;
        height: 100%;
        padding: 2rem;
        background-color: white;
        font-size: 2rem;
        transition: 0.3s;
        z-index: 1000;
        user-select: none;
      }

      .categories {
        margin-bottom: 2rem;
      }

      .buttons {
        display: flex;
      }

      @media screen and (max-width: 550px) {
        .navbar {
          left: ${leftPos(checked)};
          width: 50vw;
          padding: 1rem;
          font-size: 1.5rem;
        }
      }
    `}</style>
  );
};
