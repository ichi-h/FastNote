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
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
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

  .open-nav-label {
    cursor: pointer;
  }

  .open-button {
    position: absolute;
    top: 50%;
    left: 2rem;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 3rem;
    height: 3rem;
  }

  .bar {
    background-color: white;
    width: 3rem;
    height: 2px;
    transition: 0.2s;
  }

  .bar ~ .bar {
    margin-top: 0.8rem;
  }

  .open-button:hover > .bar ~ .bar {
    margin-top: 1rem;
  }
`;
