import { css } from "styled-jsx/css";

export default function AddMemoButton() {
  const handleClick = () => {

  };

  return (
    <>
      <label className="add-memo-label" htmlFor="add-memo-button">
        <button
          className="add-memo-button"
          name="add-memo-button"
          id="add-memo-button"
          onClick={handleClick}
        />
        <div className="add-button">
          <div className="cross">
            <div className="bar" />
            <div className="bar" />
          </div>
        </div>
      </label>

      <style jsx>{addButtonStyle}</style>
    </>
  );
}

const addButtonStyle = css`
  .add-memo-label {
    cursor: pointer;
  }

  .add-memo-button {
    display: none;
  }

  .add-button {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    border: 2px solid white;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }

  .add-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transition: 0.2s;
  }

  .cross {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .cross > .bar:first-child,
  .cross > .bar:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: white;
  }

  .cross > .bar:first-child {
    width: 2rem;
    height: 2px;
  }

  .cross > .bar:last-child {
    width: 2px;
    height: 2rem;
  }
`;
