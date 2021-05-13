import { css } from "styled-jsx/css";

import theme from "../../../lib/theme";

export default function AboutApp() {
  return (
    <>
      <div className="about-app">
        <h2>Fast Note</h2>
        <p>Copyright &copy; 2021 Ippee</p>
        <p>このアプリケーションは<a href="https://www.mozilla.org/en-US/MPL/2.0/" target="_blank" rel="noopener noreferrer">Mozilla Public License 2.0</a>の下で公開されています。</p>
        <p>GitHub: <a href="https://github.com/ippee/FastNote" target="_blank" rel="noopener noreferrer">ippee / FastNote</a></p>
      </div>

      <style jsx>{aboutAppStyle}</style>
    </>
  );
}

const aboutAppStyle = css`
  .about-app {
    padding: 3rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    margin: 0.5rem 0;
  }

  a {
    text-decoration: dotted;
    color: ${theme.subColor};
  }
`;
