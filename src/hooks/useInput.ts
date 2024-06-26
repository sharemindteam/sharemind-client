import { useState, Dispatch, SetStateAction, useCallback } from 'react';
import {
  isIncludeSpecialLetter,
  isIncludeSpecialLetterOneLiner,
} from 'utils/isIncludeSpecialLetter';

export type UseInputResult = {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onChangePrice: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  isValid: boolean;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  isFocus: boolean;
  setIsFocus: Dispatch<SetStateAction<boolean>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  handleCheckSpecialLetter: any;
  handleCheckOneLiner: any;
  handleCheckExperience: any;
  setValue: Dispatch<SetStateAction<string>>;
  typeValid: boolean;
  setTypeValid: Dispatch<SetStateAction<boolean>>;
  lengthValid: boolean;
  setLengthValid: Dispatch<SetStateAction<boolean>>;
};
//input만 사용할 시 해당 커스텀훅 사용
export const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);
  //영문, 숫자, 특수문자 중 2종 이상 포함
  const [typeValid, setTypeValid] = useState<boolean>(false);
  //10자 이상
  const [lengthValid, setLengthValid] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  const onChangePrice = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPrice = e.target.value
        .replace(/[^0-9]/g, '')
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setValue(newPrice);
    },
    [],
  );

  const handleCheckSpecialLetter = useCallback((str: string) => {
    if (isIncludeSpecialLetter(str) || str.length === 0) {
      setIsValid(false);
      setIsError(true);
    } else {
      setIsValid(true);
      setIsError(false);
    }
  }, []);

  const handleCheckOneLiner = useCallback((str: string) => {
    if (isIncludeSpecialLetterOneLiner(str) || str.length === 0) {
      setIsValid(false);
      setIsError(true);
    } else {
      setIsValid(true);
      setIsError(false);
    }
  }, []);
  const handleCheckExperience = useCallback((str: string) => {
    if (isIncludeSpecialLetterOneLiner(str) || str.length === 0) {
      setIsValid(false);
      setIsError(true);
    } else {
      setIsValid(true);
      setIsError(false);
    }
  }, []);

  return {
    value,
    onChange,
    isFocus,
    setIsFocus,
    isValid,
    setIsValid,
    isError,
    setIsError,
    onChangePrice,
    handleCheckSpecialLetter,
    handleCheckOneLiner,
    handleCheckExperience,
    setValue,
    typeValid,
    setTypeValid,
    lengthValid,
    setLengthValid,
  } as UseInputResult;
};
