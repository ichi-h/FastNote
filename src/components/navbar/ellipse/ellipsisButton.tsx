import { useState } from "react";
import { css } from "styled-jsx/css";

import { Handler } from "./handler";

import PulldownMenu from "./pulldownMenu";

interface MenuItem {
  name: string;
  handler: Handler;
  buttonValue: string;
}

export interface EllipsisButtonProps {
  items: MenuItem[];
}

export default function EllipsisButton(props: EllipsisButtonProps) {
  const [menuIsShow, toggleIsShow] = useState(false);

  const handleClick = () => {
    toggleIsShow(!menuIsShow);
  };

  const showMenu = () => {
    if (menuIsShow) {
      return <PulldownMenu items={props.items} dispatch={toggleIsShow} />;
    }
  };

  return (
    <>
      <div className="ellipsis">
        <button className="ellipsis-button" onClick={handleClick}>
          <i className="icon-ellipsis-vert" />
        </button>
        {showMenu()}
      </div>

      <style jsx>{ellipsisButtonStyle}</style>
    </>
  );
}

const ellipsisButtonStyle = css`
  .ellipsis-button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 2rem;
    color: rgb(160, 160, 160);
  }
`;
