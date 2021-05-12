import { useState } from "react";
import { useRecoilValue } from "recoil";

import { openNavbarState } from "../lib/atoms/uiAtoms";

import CategoriesCheckbox from "./navbar/categoriesCheckbox";
import CategoriesList from "./navbar/categoriesList";
import SettingsButton from "./navbar/settingsButton";
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
          <CategoriesCheckbox
            categoriesChecked={categoriesChecked}
            handleClick={handleClick}
          />

          <CategoriesList categoriesChecked={categoriesChecked} />
        </div>

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
