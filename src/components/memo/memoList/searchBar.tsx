import { useRecoilState } from "recoil";
import { css } from "styled-jsx/css";

import { searchKeywordState } from "../../../lib/atoms/searchAtom";
import { starState } from "../../../lib/atoms/uiAtoms";

import StarCheckbox from "./starCheckbox";

function TextBox() {
  const [keyword, setKeyword] = useRecoilState(searchKeywordState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  return (
    <>
      <input
        type="text"
        name="search"
        className="textbox"
        placeholder="メモを検索"
        defaultValue={keyword}
        onChange={handleChange}
      />

      <style jsx>{`
        .textbox {
          width: 100%;
        }
      `}</style>
    </>
  );
}

function SearchStarButton() {
  const [star, setStar] = useRecoilState(starState);
  const handleChange = () => setStar(!star);

  return (
    <StarCheckbox
      id="search-star"
      name="search-star"
      defaultChecked={star}
      onChange={handleChange}
    />
  );
}

export default function SearchBar() {
  return (
    <>
      <div className="searchbar">
        <div>
          <TextBox />
        </div>
        <div>
          <SearchStarButton />
        </div>
      </div>

      <hr />

      <style jsx>{SearchBarStyle}</style>
    </>
  );
}

const SearchBarStyle = css`
  .searchbar {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem;
    background-color: white;
  }

  .searchbar > div:last-child {
    flex: 2rem;
  }

  .searchbar > div:first-child {
    flex: 100%;
    margin-right: 1rem;
  }
`;
