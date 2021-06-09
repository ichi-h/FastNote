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

        <div className="logout-button">
          <TextButton type="logout" />
        </div>
      </div>

      {navbarStyle(checked)}
    </>
  );
}

const navbarStyle = (checked: boolean) => {
  const leftPos = (bool: boolean) => {
    if (bool) return "0";

    if (window.matchMedia("(max-width: 550px)").matches) {
      return "-70vw";
    } else if (window.matchMedia("(max-width: 1050px)").matches) {
      return "-50vw";
    } else {
      return "-30vw";
    }
  };

  return (
    <style jsx>{`
      .navbar {
        position: absolute;
        top: 0;
        left: ${leftPos(checked)};
        width: 30vw;
        height: 100%;
        padding: 2rem;
        background-color: white;
        font-size: 1.8rem;
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

      .logout-button {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
      }

      @media screen and (max-width: 1050px) {
        .navbar {
          width: 50vw;
        }
      }

      @media screen and (max-width: 550px) {
        .navbar {
          width: 70vw;
          padding: 1rem;
          font-size: 1.5rem;
        }
      }
    `}</style>
  );
};
