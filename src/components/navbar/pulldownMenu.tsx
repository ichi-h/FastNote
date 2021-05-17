import { css } from "styled-jsx/css";

export default function PulldownMenu() {
  return (
    <>
      <div className="pulldown-menu">3</div>

      <style jsx>{pulldownMenuStyle}</style>
    </>
  );
}

const pulldownMenuStyle = css`
  .pulldown-menu {
    font-size: 2rem;
  }
`;
