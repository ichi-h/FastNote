import { Link } from "react-router-dom";
import { css } from "styled-jsx/css";
import { useSetRecoilState } from "recoil";

import { openNavbarState } from "../../lib/atoms/uiAtoms";

export default function SettingsButton() {
  const toggle = useSetRecoilState(openNavbarState);

  const handleClick = () => {
    toggle(false);
  };

  return (
    <>
      <Link to="/home/settings">
        <div className="settings-button" onClick={handleClick}>
          設定
        </div>
      </Link>

      <style jsx>{settingsButtonStyle}</style>
    </>
  );
}

const settingsButtonStyle = css`
  .settings-button {
    font-size: 2rem;
    cursor: pointer;
  }
`;
