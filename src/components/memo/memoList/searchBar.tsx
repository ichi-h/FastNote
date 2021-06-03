import { useRecoilState } from 'recoil';
import { css } from 'styled-jsx/css';

import { searchKeywordState } from '../../../lib/atoms/searchAtom';

export default function SearchBar() {
  const [keyword, setKeyword] = useRecoilState(searchKeywordState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  return (
    <>
      <div className="searchbar">
        <input
          type="text"
          name="search"
          className="textbox"
          placeholder="メモを検索"
          defaultValue={keyword}
          onChange={handleChange}
        />
      </div>

      <hr />

      <style jsx>{SearchBarStyle}</style>
    </>
  );
}

const SearchBarStyle = css`
  .searchbar {
    width: 100%;
    padding: 1rem;
    background-color: white;
  }

  .textbox {
    width: 100%;
  }
`;
