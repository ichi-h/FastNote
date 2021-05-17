import { useState } from "react";
import { useRecoilValue } from "recoil";

import { openNavbarState } from "../lib/atoms/uiAtoms";

import CategoriesCheckbox from "./navbar/categories/categoriesCheckbox";
import AddCategoryButton from "./navbar/categories/addCategoryButton";
import CategoryInput from "./navbar/categories/categoryInput";
import CategoriesList from "./navbar/categories/categoriesList";
import SettingsButton from "./navbar/settingsButton";
import TrashboxButton from "./navbar/trashboxButton";
import LogoutButton from "./navbar/logoutButton";

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
            <div>
              <CategoriesCheckbox
                categoriesChecked={categoriesChecked}
                handleClick={handleClick}
              />
            </div>
            <div>
              <AddCategoryButton />
            </div>
          </div>

          <CategoryInput />

          <CategoriesList categoriesChecked={categoriesChecked} />
        </div>

        <TrashboxButton />
        <SettingsButton />
        <LogoutButton />
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
        padding: 2rem;
        border: 1px solid black;
        background-color: white;
        transition: 0.3s;
        z-index: 1000;
      }

      .categories {
        margin-bottom: 2rem;
      }

      .buttons {
        display: flex;
      }

      .buttons > div:last-child {
        margin-left: 1rem;
      }
    `}</style>
  );
};
