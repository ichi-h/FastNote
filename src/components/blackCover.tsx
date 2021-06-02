import { useRecoilState } from "recoil";

import { openNavbarState } from "../lib/atoms/uiAtoms";

export default function BlackCover() {
  const [checked, toggleCheck] = useRecoilState(openNavbarState);

  const handleClick = () => {
    toggleCheck(!checked);
  };

  return (
    <>
      <div className="black-cover" onClick={handleClick} />
      {blackCoverStyle(checked)}
    </>
  );
}

const blackCoverStyle = (checked: boolean) => {
  const whenOpenNavbar = (bool: boolean) => {
    if (bool) return ["0.5", "visible"];
    else return ["0", "hidden"];
  };

  const [opacity, visibility] = whenOpenNavbar(checked);

  return (
    <style jsx>{`
      .black-cover {
        position: absolute;
        top: 0;
        left: 0;
        background-color: black;
        width: 100%;
        height: 100%;
        transition: 0.3s;
        cursor: pointer;
        z-index: 100;

        opacity: ${opacity};
        visibility: ${visibility};
      }
    `}</style>
  );
};
