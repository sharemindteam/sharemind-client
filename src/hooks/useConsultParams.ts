import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// The setSearchParams function works like navigate, but only for the search portion of the URL. Also note that the second arg to setSearchParams is the same type as the second arg to navigate.
// https://reactrouter.com/en/main/hooks/use-search-params

export const useConsultParams = () => {
  /** initialize type value */
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const sortParam = searchParams.get('sort');
  const checkParam = searchParams.get('check');
  // if there is any query string, set letter, unread, checked
  const initialConsultType = typeParam ?? 'letter'
  const initialSortType = sortParam === 'unread' ? 1 : 0;
  const initialIsChecked = checkParam === 'false' ? false : true;
  /** is current tag is Letter or not */
  const [consultType, setConsultType] = useState<string>(initialConsultType);
  /** sortType by number 0 : 최신순 1: 읽지 않은 순 */
  const [sortType, setSortType] = useState<number>(initialSortType);
  /** 완료 제외 체크 여부 */
  const [isChecked, setIsChecked] = useState<boolean>(initialIsChecked);

  const handleLetterClick = () => {
    setConsultType('letter');
    searchParams.set('type', 'letter');
    setSearchParams(searchParams);
  };

  const handleChatClick = () => {
    setConsultType('chat');
    searchParams.set('type', 'chat');
    setSearchParams(searchParams);
  };

  const handleOpenChatClick = () => {
    setConsultType('open-chat');
    searchParams.set('type', 'open-consult');
    setSearchParams(searchParams);
  };

  return {
    consultType,
    sortType,
    setSortType,
    handleLetterClick,
    handleOpenChatClick,
    handleChatClick,
    searchParams,
    setSearchParams,
    isChecked,
    setIsChecked,
  };
};
