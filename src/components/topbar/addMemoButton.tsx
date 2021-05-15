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
          <div className="bar-col" />
          <div className="bar-row" />
        </div>
      </label>

      <style jsx>{addButtonStyle}</style>
    </>
  );
}

const addButtonStyle = css`
  .add-memo-label {}
`;
