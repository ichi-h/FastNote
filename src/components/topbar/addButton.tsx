import { css } from "styled-jsx/css";

export default function AddButton() {
  const handleClick = () => {

  };

  return (
    <>
      <label className="add-button-label" htmlFor="add-memo">
        <button
          className="add-memo"
          name="add-memo"
          id="add-memo"
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
  .add-button-label {}
`;
