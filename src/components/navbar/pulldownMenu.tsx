import { useEffect, useRef } from "react";
import { css } from "styled-jsx/css";

interface MenuItem {
  name: string;
  handler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  index: number;
}

interface PulldownMenuProps {
  item: MenuItem[];
  isShow: boolean;
  dispatch: React.Dispatch<React.SetStateAction<boolean>>;
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
      <div className="pulldown-menu" ref={menuRef} onBlur={handleBlur} tabIndex={0}>
        {
          props.item.map((menuIteml) => {
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
          })
        }
      </div>
      <style jsx>{pulldownMenuStyle}</style>
    </>
  );
}

const pulldownMenuStyle = css`
  .pulldown-menu {
    position: absolute;
    bottom: -2rem;
    right: -8rem;
    background-color: white;
    border: 1px solid #000;
    font-size: 2rem;
    width: 10rem;
    z-index: 10000;
    text-align: center;
  }
`;
