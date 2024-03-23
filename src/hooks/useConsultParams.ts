// import { useStompContext } from 'contexts/StompContext';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Green, Grey1 } from 'styles/color';

// The setSearchParams function works like navigate, but only for the search portion of the URL. Also note that the second arg to setSearchParams is the same type as the second arg to navigate.
// https://reactrouter.com/en/main/hooks/use-search-params

export const useConsultParams = () => {
  /** initialize type value */
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const sortParam = searchParams.get('sort');
  const initialIsLetter = typeParam === 'chat' ? false : true;
  const initialSortType = sortParam === 'unread' ? 1 : 0;
  /** is current tag is Letter or not */
  const [isLetter, setIsLetter] = useState<boolean>(initialIsLetter);
  /** sortType by number 0 : 최신순 1: 읽지 않은 순 */
  const [sortType, setSortType] = useState<number>(initialSortType);

  const handleLetterClick = () => {
    setIsLetter(true);
    searchParams.set('type', 'letter');
    setSearchParams(searchParams);
  };

  const handleChatClick = () => {
    setIsLetter(false);
    searchParams.set('type', 'chat');
    setSearchParams(searchParams);
  };

  /** set values from query string in first mount */
  //   useEffect(() => {
  //     if (consultParam === 'letter' || consultParam === null) {
  //     } else if (consultParam === 'chat') {
  //     } else {
  //       searchParams.delete('type');
  //       setSearchParams(searchParams);
  //     }
  //   }, []);

  return {
    isLetter,
    sortType,
    setSortType,
    handleLetterClick,
    handleChatClick,
    searchParams,
    setSearchParams,
  };
};
