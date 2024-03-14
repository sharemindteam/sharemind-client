import { useStompContext } from 'contexts/StompContext';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Green, Grey1 } from 'styles/color';

export const useConsultParams = () => {
  /** initialize type value */
  const [searchParams, setSearchParams] = useSearchParams();
  const consultParam = searchParams.get('consultType');
  const initialIsLetter = consultParam === 'chat' ? false : true;

  /** is current tag is Letter or not */
  const [isLetter, setIsLetter] = useState<boolean>(initialIsLetter);
  /** sortType by number 0 : 최신순 1: 읽지 않은 순 */
  const [sortType, setSortType] = useState<number>(0);

  const [letterColor, setLetterColor] = useState<string>(Grey1);
  const [chattingColor, setChattingColor] = useState<string>(Grey1);

  const handleLetterClick = () => {
    setIsLetter(true);
    setLetterColor(Green);
    setChattingColor(Grey1);
    searchParams.set('consultType', 'letter');
    setSearchParams(searchParams);
  };

  const handleChatClick = () => {
    setIsLetter(false);
    setLetterColor(Grey1);
    setChattingColor(Green);
    searchParams.set('consultType', 'chat');
    setSearchParams(searchParams);
  };

  /** set values from query string in first mount */
  useEffect(() => {
    if (consultParam === 'letter' || consultParam === null) {
      setLetterColor(Green);
      setChattingColor(Grey1);
    } else if (consultParam === 'chat') {
      setLetterColor(Grey1);
      setChattingColor(Green);
    } else {
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
    letterColor,
    chattingColor,
    handleLetterClick,
    handleChatClick,
  };
};
