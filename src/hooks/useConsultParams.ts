import { useStompContext } from 'contexts/StompContext';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Green, Grey1 } from 'styles/color';

export const useConsultParams = () => {
  /** is current tag is Letter or not */
  const [isLetter, setIsLetter] = useState<boolean>(true);
  /** sortType by number 0 : 최신순 1: 읽지 않은 순 */
  const [sortType, setSortType] = useState<number>(0);

  const [letterColor, setLetterColor] = useState<string>(Grey1);
  const [chattingColor, setChattingColor] = useState<string>(Grey1);

  const [searchParams, setSearchParams] = useSearchParams();

  const { isConnected, connectChat } = useStompContext();

  /** set values from query string in first mount */
  useEffect(() => {
    const consultParam = searchParams.get('consultType');
    if (consultParam === 'letter' || consultParam === null) {
      setIsLetter(true);
      setLetterColor(Green);
      setChattingColor(Grey1);
    } else if (consultParam === 'chat') {
      setIsLetter(false);
      setLetterColor(Grey1);
      setChattingColor(Green);
    } else {
      setIsLetter(true);
      setLetterColor(Green);
      setChattingColor(Grey1);
      searchParams.delete('consultType');
      setSearchParams(searchParams);
    }
  }, []);

  return {
    isLetter,
    setIsLetter,
    sortType,
    setSortType,
    searchParams,
    setSearchParams,
    letterColor,
    setLetterColor,
    chattingColor,
    setChattingColor,
  };
};
