import { useSetRecoilState, useRecoilValue } from "recoil";
import { css } from "styled-jsx/css";
import firebase from "firebase/app";

import "firebase/database";

import { FastNoteDate } from "../../lib/fastNoteDate";
import { memoIndexState } from "../../lib/atoms/editorAtoms";
import { uidState } from "../../lib/atoms/userIdAtoms";

export default function AddMemoButton() {
  const setIndex = useSetRecoilState(memoIndexState);
  const userUid = useRecoilValue(uidState);

  const handleClick = () => {
    const addNewMemo = () => {
      return new Promise<object>((resolve) => {
        const fnd = new FastNoteDate();

        const newMemo = {
          title: "新しいメモ",
          category: "None",
          tags: [""],
          star: false,
          created: fnd.getCurrentDate(),
          updated: fnd.getCurrentDate(),
          content: "",
        };
        let localDB = JSON.parse(localStorage.getItem("database"));
        const nextIndex: string = String(Object.keys(localDB.memos).length);

        localDB.memos[nextIndex] = newMemo;

        console.log({
          nextIndex: nextIndex,
          localDB: localDB,
        });

        resolve({
          nextIndex: nextIndex,
          localDB: localDB,
        });
      });
    };

    const changeTarget = async (nextIndex: string) => {
      setIndex(nextIndex);
    };

    const pushToRemoteDB = (localDB: object) => {
      return new Promise((_, reject) => {
        firebase.database().ref(`users/${userUid}`).set(localDB).catch((e) => reject(e));
      });
    };

    addNewMemo().then(async (res) => {
      await changeTarget(res["nextIndex"]);
      await pushToRemoteDB(res["localDB"]).catch((e) => {
        alert(`下記の理由によりクラウド上にメモをアップロードできませんでした。 \n${e}`);
      });
    });
  };

  return (
    <>
      <label className="add-memo-label" htmlFor="add-memo-button">
        <button
          className="add-memo-button"
          name="add-memo-button"
          id="add-memo-button"
          onClick={handleClick}
        />
        <div className="add-button">
          <div className="cross">
            <div className="bar" />
            <div className="bar" />
          </div>
        </div>
      </label>

      <style jsx>{addButtonStyle}</style>
    </>
  );
}

const addButtonStyle = css`
  .add-memo-label {
    cursor: pointer;
  }

  .add-memo-button {
    display: none;
  }

  .add-button {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    border: 2px solid white;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }

  .add-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transition: 0.2s;
  }

  .cross {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .cross > .bar:first-child,
  .cross > .bar:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: white;
  }

  .cross > .bar:first-child {
    width: 2rem;
    height: 2px;
  }

  .cross > .bar:last-child {
    width: 2px;
    height: 2rem;
  }
`;
