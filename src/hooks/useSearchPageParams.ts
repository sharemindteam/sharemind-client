import { ChangeEvent, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { searchKeywordState } from 'utils/atom';

export const useSearchPageParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordParam = searchParams.get('keyword');
  const typeParam = searchParams.get('searchType');
  const sortParam = searchParams.get('sort');
  const openSortParam = searchParams.get('open-sort');
  const keywordFromPrevPage = useRecoilValue(searchKeywordState);
  const initialKeyword = keywordParam ?? keywordFromPrevPage;
  const initialSearchType = typeParam ?? 'counselor';
  const initialSortType =
    sortParam === 'rating' ? 2 : sortParam === 'popular' ? 1 : 0;
  const initialOpenSortType =
    openSortParam === 'comments' ? 2 : openSortParam === 'likes' ? 1 : 0;
  const initialTabState = typeParam === 'open-consult' ? 2 : 1;
  const [input, setInput] = useState(keywordFromPrevPage);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [searchType, setSearchType] = useState<string>(initialSearchType);
  const [openSortType, setOpenSortType] = useState<number>(initialOpenSortType);
  const [sortType, setSortType] = useState<number>(initialSortType);
  const [tabState, setTabState] = useState<number>(initialTabState);
  const handleClickOpenConsult = useCallback(() => {
    setSearchType('open-consult');
    searchParams.set('searchType', 'open-consult');
    setTabState(2);
    setSearchParams(searchParams);
  }, []);
  const handleClickCounselor = useCallback(() => {
    setSearchType('counselor');
    searchParams.set('searchType', 'counselor');
    setSearchParams(searchParams);
    setTabState(1);
    console.log('hi');
  }, []);

  const handleClickTab = useCallback(
    (tabState: number) => {
      if (tabState === 1) {
        handleClickCounselor();
      } else {
        handleClickOpenConsult();
      }
    },
    [tabState],
  );
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyword(input);
    searchParams.set('keyword', input);
    setSearchParams(searchParams);
  };

  return {
    handleClickTab,
    searchParams,
    openSortType,
    setOpenSortType,
    setSearchParams,
    input,
    tabState,
    setTabState,
    keyword,
    setKeyword,
    handleSubmit,
    keywordFromPrevPage,
    searchType,
    sortType,
    setSortType,
    handleChangeInput,
  };
};
