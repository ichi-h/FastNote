import { useRef } from "react";
import { useRecoilState } from "recoil";

import theme, { remToPx } from "../../lib/theme";
import { posYState } from "../../lib/atoms/uiAtoms";

export default function ResizeHandle() {
  const ref: React.RefObject<HTMLDivElement> = useRef();
  const [pos, setPos] = useRecoilState(posYState);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches;
    const homeHeight =
      document.documentElement.clientHeight - remToPx(theme.topBarHeight);

    if (homeHeight / 2 < touch[0].clientY) {
      setPos(touch[0].clientY);
    }
  }

  return (
    <>
      <div
        className="resize-handle"
        ref={ref}
        onTouchMove={handleTouchMove}
      />

      {resizeHandleStyle(pos)}
    </>
  );
}

const resizeHandleStyle = (pos: number) => {
  const rect = "10rem";

  return (
    <style jsx>{`
      @media screen and (max-width: 1050px) {
        .resize-handle {
          position: absolute;
          top: calc(${pos}px - ${theme.topBarHeight});
          left: 50%;
          transform: translateX(-50%);
          width: ${rect};
          height: ${rect};
          background-color: ${theme.mainColor};
          border-radius: 20%;
          transition: 0.1s;
          z-index: 3;
        }
      }
    `}</style>
  );
};
