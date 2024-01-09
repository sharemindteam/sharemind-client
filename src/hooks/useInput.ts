import { useState, Dispatch, SetStateAction } from 'react';
import { isIncludeSpecialLetter } from 'utils/isIncludeSpecialLetter';
import { passwordLengthValid, passwordTypeValid } from 'utils/signupValidCheck';

type UseInputResult = {
  value: string;
  onChange: (
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
  setValue: Dispatch<SetStateAction<string>>;
  typeValid: boolean;
  setTypeValid: Dispatch<SetStateAction<boolean>>;
  lengthValid: boolean;
  setLengthValid: Dispatch<SetStateAction<boolean>>;
  handlePasswordValid: () => void;
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleCheckSpecialLetter = (str: string) => {
    if (isIncludeSpecialLetter(str)) {
      setIsValid(false);
      setIsError(true);
    } else {
      setIsValid(true);
      setIsError(false);
    }
  };

  const handlePasswordValid = () => {
    if (passwordTypeValid(value)) {
      setTypeValid(true);
    } else {
      setTypeValid(false);
    }
    if (passwordLengthValid(value)) {
      setLengthValid(true);
    } else {
      setLengthValid(false);
    }
  };
  return {
    value,
    onChange,
    isFocus,
    setIsFocus,
    isValid,
    setIsValid,
    isError,
    setIsError,
    handleCheckSpecialLetter,
    setValue,
    typeValid,
    setTypeValid,
    lengthValid,
    setLengthValid,
    handlePasswordValid,
  } as UseInputResult;
};
