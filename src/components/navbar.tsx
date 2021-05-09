import React from "react";
import css from "styled-jsx/css";
import { useRecoilValue } from "recoil";

import { openNavbarState } from "../pages/home";

export default function Navbar() {
  const checked = useRecoilValue(openNavbarState);

  return (
    <>
      <div className="navbar">aaa</div>

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
    `}</style>
  );
};
