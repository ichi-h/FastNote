import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { css } from "styled-jsx/css";

import { localDBState } from "../../../lib/atoms/localDBAtom";
import { MenuItem } from "./ellipsisButton";

interface PulldownMenuProps {
  items: MenuItem[];
  dispatch: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PulldownMenu(props: PulldownMenuProps) {
  const menuRef: React.RefObject<HTMLDivElement> = useRef();
  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  useEffect(() => {
    menuRef.current.focus();
  });

  const handleBlur = () => {
    props.dispatch(false);
  };

  const handleClick = props.items.reduce((pre, cur) => {
    pre.push(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        cur.handler({ localDB: localDB, e: e})
          .then(() => {
            setLocalDB(JSON.stringify(localDB));
            props.dispatch(false);
          });
      }
    );
    return pre;
  }, []);

  return (
    <>
      <div
        className="pulldown-menu"
        ref={menuRef}
        onBlur={handleBlur}
        tabIndex={0}
      >
        {props.items.map((item, i) => {
          return (
            <button
              className={`pulldown-item-${i}`}
              key={`pulldown-item-${i}`}
              value={item.buttonValue}
              onClick={handleClick[i]}
            >
              {item.name}
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
