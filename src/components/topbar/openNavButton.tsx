import { css } from "styled-jsx/css";
import { useRecoilState } from "recoil";

import { openNavbarState } from "../../lib/atoms/uiAtoms";

export default function OpenNavButton() {
  const [checked, toggle] = useRecoilState(openNavbarState);

  const handleChange = () => {
    toggle(!checked);
  };

  return (
    <>
      <label className="open-nav-label" htmlFor="open-nav-button">
        <input
          type="checkbox"
          className="open-nav-button"
          name="open-nav-button"
          id="open-nav-button"
          defaultChecked={checked}
          onChange={handleChange}
        />
        <div className="open-button">
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar3" />
        </div>
      </label>

      <style jsx>{openNavButtonStyle}</style>
    </>
  );
}

const openNavButtonStyle = css`
  .open-nav-button {
    display: none;
  }

  .open-button {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    border: 1px solid white;
    width: 3rem;
    height: 3rem;
  }
`;
