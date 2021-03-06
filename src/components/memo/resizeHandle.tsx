import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

import theme, { remToPx } from "../../lib/theme";
import { posYState } from "../../lib/atoms/uiAtoms";

export default function ResizeHandle() {
  const ref: React.RefObject<HTMLDivElement> = useRef();
  const setPos = useSetRecoilState(posYState);
  const [posStatus, setPosStatus] = useState(true);

  const homeHeight =
    document.documentElement.clientHeight - remToPx(theme.topBarHeight);

  const setTop = () => {
    setPosStatus(true);
    setPos(homeHeight * 0.3);
  };

  const setBottom = () => {
    setPosStatus(false);
    setPos(homeHeight);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches;

    if (homeHeight * 0.3 < touch[0].clientY) {
      setPos(touch[0].clientY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches;
    const scrollAmount = remToPx("2rem");

    const topThred = homeHeight * 0.3 + scrollAmount;
    const bottomThred = homeHeight - scrollAmount;

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
      >
        <div className="line" />
        <div className="line" />
      </div>

      {resizeHandleStyle()}
    </>
  );
}

const resizeHandleStyle = () => {
  const rect = "20vw";

  return (
    <style jsx>{`
      @media screen and (max-width: 1050px) {
        .resize-handle {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(calc(-${rect} / 3));

          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          width: ${rect};
          height: calc(${rect} / 3);
          border: 1px solid ${theme.gray};
          background-color: white;
          transition: 0.1s;
          z-index: 3;
        }

        .line {
          height: 1px;
          width: 50%;
          background-color: rgb(150, 150, 150);
          margin: 0.2rem;
        }
      }
    `}</style>
  );
};
