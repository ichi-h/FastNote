import { css } from "styled-jsx/css";

interface MenuItem {
  name: string;
  handler: () => void;
  index?: number;
}

interface PulldownMenuProps {
  item: MenuItem[];
  isShow: boolean;
}

export default function PulldownMenu(props: PulldownMenuProps) {
  return (
    <>
      <div className="pulldown-menu"></div>
      <style jsx>{pulldownMenuStyle}</style>
    </>
  );
}

const pulldownMenuStyle = css`
  .pulldown-menu {

  }
`;
