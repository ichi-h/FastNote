import router from "next/router";
import { Link } from "react-router-dom";
import { css } from "styled-jsx/css";
import { useSetRecoilState, useRecoilValue } from "recoil";
import firebase from "firebase/app";
import "firebase/auth";

import {
  currentCategoryState,
  openNavbarState,
  trashboxState,
} from "../../lib/atoms/uiAtoms";
import { memoIndexState } from "../../lib/atoms/editorAtoms";
import { localDBState } from "../../lib/atoms/localDBAtom";

type TextButtonType = "trash" | "settings" | "logout";

function countTrashedMemos(memos: any) {
  let count = 0;

  if (memos) {
    count = Object.entries(memos)
      .map(([_, memo]: [string, any]) => memo)
      .reduce((pre: number, memo) => {
        if (memo.trash) {
          pre += 1;
        }
        return pre;
      }, 0);
  }

  return count;
}

export default function TextButton(props: { type: TextButtonType }) {
  const toggleNav = useSetRecoilState(openNavbarState);
  const toggleTrash = useSetRecoilState(trashboxState);
  const setCategory = useSetRecoilState(currentCategoryState);
  const setIndex = useSetRecoilState(memoIndexState);

  const localDB = JSON.parse(useRecoilValue(localDBState));

  const handleClick = () => {
    switch (props.type) {
      case "trash":
        toggleNav(false);
        toggleTrash(true);
        setCategory("all");
        setIndex("-1");
        break;

      case "settings":
        toggleNav(false);
        break;

      case "logout":
        toggleNav(false);
        firebase
          .auth()
          .signOut()
          .then(() => {
            router.push("/");
          })
          .catch((e) => {
            alert(`エラー: ${e}`);
          });
        break;
    }
  };

  const getContent = (): [JSX.Element, string, string] => {
    switch (props.type) {
      case "trash":
        return [
          <Link to="/home">
            <i className="icon-trash-empty" /> ごみ箱 (
            {countTrashedMemos(localDB.memos)})
          </Link>,
          "/home",
          "trash-button",
        ];

      case "settings":
        return [
          <Link to="/home/settings">
            <i className="icon-cog" /> 設定
          </Link>,
          "/home/settings",
          "settings-button",
        ];

      case "logout":
        return [
          <>
            <i className="icon-logout" /> ログアウト
          </>,
          "/home",
          "logout-button",
        ];
    }
  };

  const [Content, link, className] = getContent();

  return (
    <>
      <Link to={link}>
        <div className={className} onClick={handleClick}>
          {Content}
        </div>
      </Link>

      <style jsx>{textButtonStyle}</style>
    </>
  );
}

const textButtonStyle = css`
  .trash-button,
  .settings-button,
  .logout-button {
    font-size: 2rem;
    cursor: pointer;
    transition: 0.1s;
  }

  .logout-button {
    margin-top: 2rem;
  }

  .trash-button:hover,
  .settings-button:hover,
  .logout-button:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
