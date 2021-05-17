import { css } from "styled-jsx/css";

export default function EllipsisButton() {
  return (
    <>
      <div className="ellipsis">3</div>

      <style jsx>{ellipsisButtonStyle}</style>
    </>
  );
}

const ellipsisButtonStyle = css`
  .ellipsis {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    font-size: 2rem;
  }
`;
