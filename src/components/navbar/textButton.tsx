import router from "next/router";
import { useHistory } from "react-router-dom";
import { css } from "styled-jsx/css";
import { useSetRecoilState, useRecoilValue } from "recoil";
import firebase from "firebase/app";
import "firebase/auth";

import {
  currentCategoryState,
  openNavbarState,
  trashboxState,
  urlState,
} from "../../lib/atoms/uiAtoms";
import { deleteTrashedMemos } from "./ellipse/handler";
import { memoIndexState } from "../../lib/atoms/editorAtoms";
import { localDBState } from "../../lib/atoms/localDBAtom";
import { FastNoteDB, ArrayObject, Memo } from "../../lib/fastNoteDB";

import EllipsisButton from "./ellipse/ellipsisButton";

type TextButtonType = "trash" | "settings" | "logout";

function countTrashedMemos(memos: ArrayObject<Memo>) {
  let count = 0;

  if (memos) {
    count = Object.entries(memos)
      .map(([_, memo]: [string, Memo]) => memo)
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
  const setURL = useSetRecoilState(urlState);

  const localDB: FastNoteDB = JSON.parse(useRecoilValue(localDBState));

  const history = useHistory();

  const handleClick = () => {
    switch (props.type) {
      case "trash":
        toggleNav(false);
        toggleTrash(true);
        setCategory("all");
        setIndex("-1");
        setURL("/home");
        history.push("/home");
        break;

      case "settings":
        toggleNav(false);
        setURL("/home/settings");
        history.push("/home/settings");
        break;

      case "logout":
        toggleNav(false);
        setURL("/home");
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

  const getContent = (): [JSX.Element, string] => {
    switch (props.type) {
      case "trash":
        return [
          <>
            <div className="trash-button-text" onClick={handleClick}>
              <i className="icon-trash-empty" /> ごみ箱 (
              {countTrashedMemos(localDB.memos)})
            </div>
            <EllipsisButton
              items={[
                {
                  type: "deleteTrashedMemos",
                  name: "メモを削除",
                  handler: deleteTrashedMemos,
                  buttonValue: "",
                },
              ]}
            />
          </>,
          "trash-button",
        ];

      case "settings":
        return [
          <div className="settings-button-text" onClick={handleClick}>
            <i className="icon-cog" /> 設定
          </div>,
          "settings-button",
        ];

      case "logout":
        return [
          <div className="logout-button-text" onClick={handleClick}>
            <i className="icon-logout" /> ログアウト
          </div>,
          "logout-button",
        ];
    }
  };

  const [Content, className] = getContent();

  return (
    <>
      <div className={className}>{Content}</div>

      <style jsx>{textButtonStyle}</style>
    </>
  );
}

const textButtonStyle = css`
  .trash-button,
  .settings-button,
  .logout-button {
    position: relative;
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
