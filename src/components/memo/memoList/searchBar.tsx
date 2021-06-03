import { useRecoilState } from 'recoil';
import { css } from 'styled-jsx/css';

import { searchKeywordState } from '../../../lib/atoms/uiAtoms';

export default function SearchBar() {
  const [keyword, setKeyword] = useRecoilState(searchKeywordState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  return (
    <>
      <div className='searchbar'>
        <input
          type="text"
          name="search"
          placeholder="メモを検索"
          defaultValue={keyword}
          onChange={handleChange}
        />
      </div>

      <style jsx>{SearchBarStyle}</style>
    </>
  );
}

const SearchBarStyle = css`
  .searchbar {}
`;
