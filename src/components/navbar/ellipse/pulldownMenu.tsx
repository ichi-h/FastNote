import { useEffect, useRef } from "react";
import { css } from "styled-jsx/css";

import { MenuItem } from "./ellipsisButton";

interface PulldownMenuProps {
  items: MenuItem[];
  dispatch: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PulldownMenu(props: PulldownMenuProps) {
  const menuRef: React.RefObject<HTMLDivElement> = useRef();

  const handleBlur = () => {
    props.dispatch(false);
  };

  useEffect(() => {
    menuRef.current.focus();
  });

  return (
    <>
      <div
        className="pulldown-menu"
        ref={menuRef}
        onBlur={handleBlur}
        tabIndex={0}
      >
        {props.item.map((menuIteml) => {
          return (
            <button
              className={`pulldown-item-${menuIteml.index}`}
              key={`pulldown-item-${menuIteml.index}`}
              value={menuIteml.index}
              onClick={menuIteml.handler}
            >
              {menuIteml.name}
            </button>
          );
        })}
      </div>
      <style jsx>{pulldownMenuStyle}</style>
    </>
  );
}

const pulldownMenuStyle = css`
  .pulldown-menu {
    position: absolute;
    bottom: 0;
    right: -8rem;
    line-height: 0;

    background-color: white;
    font-size: 2rem;
    padding: 0;
    width: 10rem;
    text-align: center;
    z-index: 10000;
    filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.2));
  }

  button[class*="pulldown-item-"] {
    width: 100%;
  }

  button[class*="pulldown-item-"]:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
