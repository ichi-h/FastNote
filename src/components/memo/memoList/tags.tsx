import { css } from "styled-jsx/css";

export default function Tags(props: { localDB: any; index: number }) {
  const tagItems = Object.fromEntries(
    Object.entries(props.localDB.memos[props.index].tags).map(([_, tag], j) => {
      if (tag === "") {
        return [_, <></>];
      }

      return [
        _,
        <>
          <span className="tag-item" key={`tag-item-${j}`}>
            {tag}
          </span>
          <style jsx>{tagItemStyle}</style>
        </>,
      ];
    })
  );

  return (
    <>
      <div className="tags">
        <i className="icon-tags" /> {Object.values(tagItems)}
      </div>
      <style jsx>{tagsStyle}</style>
    </>
  );
}

const tagsStyle = css`
  .tags {
    margin-left: 1rem;
  }

  .icon-tags {
    margin-right: 1rem;
  }
`;

const tagItemStyle = css`
  .tag-item {
    border: 1px solid black;
    padding: 0 1rem;
    margin-right: 1rem;
    border-radius: 1rem;
  }
`;
