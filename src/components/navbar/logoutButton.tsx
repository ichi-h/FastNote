import router from "next/router";
import { css } from "styled-jsx/css";
import firebase from "firebase/app";
import "firebase/auth";

export default function LogoutButton() {
  const handleClick = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        alert(`エラー: ${e}`);
      });
  };

  return (
    <>
      <div className="logout-button" onClick={handleClick}>
        ログアウト
      </div>

      <style jsx>{logoutButtonStyle}</style>
    </>
  );
}

const logoutButtonStyle = css`
  .logout-button {
    margin-left: 2rem;
    font-size: 2rem;
    cursor: pointer;
  }
`;
