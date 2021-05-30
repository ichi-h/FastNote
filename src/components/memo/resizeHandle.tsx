import { useRef, useState } from "react";
import { useRecoilState } from "recoil";

import theme, { remToPx } from "../../lib/theme";
import { posYState } from "../../lib/atoms/uiAtoms";

export default function ResizeHandle() {
  const ref: React.RefObject<HTMLDivElement> = useRef();
  const [pos, setPos] = useRecoilState(posYState);
  const [posStatus, setPosStatus] = useState(true);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches;
    const homeHeight =
      document.documentElement.clientHeight - remToPx(theme.topBarHeight);

    if (homeHeight / 2 < touch[0].clientY) {
      setPos(touch[0].clientY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches;
    const homeHeight =
      document.documentElement.clientHeight - remToPx(theme.topBarHeight);

    const topThred = homeHeight / 2 + (homeHeight / 2) / 3;
    const bottomThred = homeHeight / 2 + (homeHeight / 2) * (2 / 3);

    const setTop = () => {
      setPosStatus(true)
      setPos(homeHeight / 2);
    };

    const setBottom = () => {
      setPosStatus(false);
      setPos(homeHeight);
    };

    if (bottomThred < touch[0].clientY) {
      setBottom();
    } else if (touch[0].clientY < topThred) {
      setTop();
    } else {
      if (posStatus) {
        setBottom();
      } else {
        setTop();
      }
    }
  };

  return (
    <>
      <div
        className="resize-handle"
        ref={ref}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {resizeHandleStyle(pos)}
    </>
  );
}

const resizeHandleStyle = (pos: number) => {
  const rect = "20vw";

  return (
    <style jsx>{`
      @media screen and (max-width: 1050px) {
        .resize-handle {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(calc(-${rect} / 3));
          width: ${rect};
          height: calc(${rect} / 3);
          background-color: ${theme.mainColor};
          border-radius: 20%;
          transition: 0.1s;
          z-index: 3;
        }
      }
    `}</style>
  );
};
