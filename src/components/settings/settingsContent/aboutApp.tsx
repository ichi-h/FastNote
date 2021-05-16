import { generalStyle } from "../settingsContent";

export default function AboutApp() {
  return (
    <>
      <div className="about-app">
        <h2>Fast Note</h2>
        <p>Copyright &copy; 2021 Ippee</p>
        <p>
          このアプリケーションは{" "}
          <a
            href="https://www.mozilla.org/en-US/MPL/2.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Public License 2.0
          </a>
          {" "}の下で公開されています。
        </p>
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/ippee/FastNote"
            target="_blank"
            rel="noopener noreferrer"
          >
            ippee / FastNote
          </a>
        </p>
      </div>

      <style jsx>{generalStyle}</style>
    </>
  );
}
