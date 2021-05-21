import { css } from "styled-jsx/css";

export default function Loading() {
  return (
    <>
      <div className="loading">
        <div className="circle1" />
        <div className="circle2" />
      </div>

      <style jsx>{loadingStyle}</style>
    </>
  );
}

const loadingStyle = css`
  .loading {
    position: relative;
    width: 50vw;
    height: 50vh;
  }

  .circle1,
  .circle2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 50%;
    border-style: solid;
    border-color: white;
    animation: loading 2s ease infinite;
  }

  .circle1 {
    animation-delay: 0ms;
  }
  .circle2 {
    animation-delay: 300ms;
  }

  @keyframes loading {
    0% {
      width: 0;
      height: 0;
      border-width: 0px;

      opacity: 0;
    }
    50% {
      border-width: 3px;
      opacity: 1;
    }
    100% {
      width: 10vw;
      height: 10vw;
      border-width: 0px;
      opacity: 0;
    }
  }
`;