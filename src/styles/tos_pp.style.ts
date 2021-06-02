import { css } from "styled-jsx/css";

import theme from "../lib/theme";

export const tosPPStyle = css`
  .pp {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${theme.mainColor};
    width: 100%;
    height: 100%;
  }

  .content {
    width: 60%;
    background-color: white;
    box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.2);
    padding: 5rem;
    font-size: 1.5rem;
    margin: 5rem;
  }

  h1 {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 2rem;
    margin: 2rem 0 1rem 0;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: ${theme.subColor};
    text-decoration: underline;
  }

  ul,
  ol {
    margin-bottom: 1rem;
    margin-left: 4rem;
  }

  @media screen and (max-width: 1050px) {
    .content {
      width: 90%;
    }
  }

  @media screen and (max-width: 550px) {
    .content {
      padding: 3rem;
      margin: 3rem;
      font-size: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    ul,
    ol {
      margin-left: 3rem;
    }
  }
`;
