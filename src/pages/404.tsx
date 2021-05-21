import { css } from "styled-jsx/css";

import theme from "../lib/theme";

export default function PageNotFound() {
  return (
    <>
      <div className="not-found">
        <h1>Page not found.</h1>
        <p>お探しのページは見つかりませんでした。</p>
      </div>

      <footer>
        <p>Copyright &copy; 2021 Ippee</p>
      </footer>

      <style jsx>{pageNotFoundStyle}</style>
    </>
  );
}

const pageNotFoundStyle = css`
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    width: 100vw;
    height: 100vh;
    background-color: ${theme.mainColor};
  }

  h1 {
    font-size: 5rem;
  }

  p {
    font-size: 2rem;
    margin: 1rem 0;
  }

  footer {
    position: absolute;
    bottom: 1rem;
    width: 100vw;
    text-align: center;
  }
`;
