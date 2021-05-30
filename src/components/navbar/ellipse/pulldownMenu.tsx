import { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { css } from "styled-jsx/css";

import { localDBState } from "../../../lib/atoms/localDBAtom";
import { memoIndexState } from "../../../lib/atoms/editorAtoms";
import { EllipsisButtonProps } from "./ellipsisButton";
import { insertionSort } from "../../../lib/sort";

interface PulldownMenuProps extends EllipsisButtonProps {
  dispatch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PulldownMenu(props: PulldownMenuProps) {
  const menuRef: React.RefObject<HTMLDivElement> = useRef();
  const setIndex = useSetRecoilState(memoIndexState);
  const [localDBStr, setLocalDB] = useRecoilState(localDBState);
  let localDB = JSON.parse(localDBStr);

  useEffect(() => {
    menuRef.current.focus();
  });

  const handleBlur = () => {
    setTimeout(() => props.dispatch(false), 100, false);
  };

  const handleClick = props.items.reduce((pre, cur) => {
    const handler = () => {
      switch (cur.type) {
        case "deleteCategory":
        case "renameCategory":
          return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            cur.handler({ localDB: localDB, e: e }).then(() => {
              insertionSort(localDB, setLocalDB);
              props.dispatch(false);
            });
          };

        case "deleteTrashedMemos":
          return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            cur
              .handler({ localDB: localDB, e: e, setIndex: setIndex })
              .then(() => {
                insertionSort(localDB, setLocalDB);
                props.dispatch(false);
              });
          };
      }
    };

    pre.push(handler());

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
