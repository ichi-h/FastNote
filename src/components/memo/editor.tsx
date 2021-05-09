
import css from "styled-jsx/css";

export default function Home() {
  return (
    <>
      <div className="editor">Editor</div>

      <style jsx>{editorStyle}</style>
    </>
  );
}

const editorStyle = css`
  .editor {
    height: 100%;
  }
`;
