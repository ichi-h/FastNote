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

  const Content = () => {
    switch (props.type) {
      case "trash":
        return (
          <Link to="/home">
            ごみ箱 ({countTrashedMemos(localDB.memos)})
          </Link>
        );

      case "settings":
        return (
          <Link to="/home/settings">
            設定
          </Link>
        );

      case "logout":
        return <>ログアウト</>;
    }
  };

  return (
    <>
      <div className="text-button" onClick={handleClick}>
        <Content />
      </div>

      <style jsx>{textButtonStyle}</style>
    </>
  );
}

const textButtonStyle = css`
  .text-button {
    font-size: 2rem;
    cursor: pointer;
    transition: 0.1s;
  }

  .text-button:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
