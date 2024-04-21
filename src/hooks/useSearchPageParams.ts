import { ChangeEvent, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

//
//
//

export const useSearchPageParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /** get query-string */
  const keywordParam = searchParams.get('keyword');
  const typeParam = searchParams.get('searchType');
  const sortParam = searchParams.get('sort');
  const openSortParam = searchParams.get('open-sort');

  /** get initial values */
  const initialKeyword = keywordParam ?? '';
  const initialSearchType = typeParam ?? 'counselor';
  const initialSortType =
    sortParam === 'rating' ? 2 : sortParam === 'popular' ? 1 : 0;
  const initialOpenSortType =
    openSortParam === 'comments' ? 2 : openSortParam === 'likes' ? 1 : 0;
  const initialTabState = typeParam === 'open-consult' ? 2 : 1;

  /** states with iniitial value */
  const [input, setInput] = useState(initialKeyword);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [searchType, setSearchType] = useState<string>(initialSearchType);
  const [openSortType, setOpenSortType] = useState<number>(initialOpenSortType);
  const [sortType, setSortType] = useState<number>(initialSortType);
  const [tabState, setTabState] = useState<number>(initialTabState);

  /** event handler*/
  const handleClickOpenConsult = useCallback(() => {
    setSearchType('open-consult');
    searchParams.set('searchType', 'open-consult');
    setTabState(2);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);
  const handleClickCounselor = useCallback(() => {
    setSearchType('counselor');
    searchParams.set('searchType', 'counselor');
    setSearchParams(searchParams);
    setTabState(1);
  }, [searchParams, setSearchParams]);

  const handleClickTab = useCallback(
    (tabState: number) => {
      if (tabState === 1) {
        handleClickCounselor();
      } else {
        handleClickOpenConsult();
      }
    },
    [handleClickCounselor, handleClickOpenConsult],
  );
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    },
    [],
  );
  const handleSubmit = useCallback(
    (
      event: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGSVGElement>,
    ) => {
      event.preventDefault();
      setKeyword(input);
      searchParams.set('keyword', input);
      setSearchParams(searchParams);
    },
    [input, searchParams, setSearchParams],
  );

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
    searchType,
    sortType,
    setSortType,
    handleChangeInput,
  };
};
