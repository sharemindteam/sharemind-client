import { useState, Dispatch, SetStateAction } from 'react';
import { usePrevious } from 'react-use';

//
//
//

type UsePwChangeInputResult = {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  isValid: boolean;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string>>;
  typeValid: boolean;
  setTypeValid: Dispatch<SetStateAction<boolean>>;
  isFocused: boolean;
  lengthValid: boolean;
  setLengthValid: Dispatch<SetStateAction<boolean>>;
  handleFirstChange: () => void;
  prevValue: string;
};

//
//
//

export const usePwChangeInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);
  //영문, 숫자, 특수문자 중 2종 이상 포함
  const [typeValid, setTypeValid] = useState<boolean>(false);
  //10자 이상
  const [lengthValid, setLengthValid] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const prevValue = usePrevious(value);

  /**
   *
   */
  const handleFirstChange = () => {
    if (!isFocused) {
      setIsFocused(true);
    }
  };

  /**
   *
   * @param e
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isFocused) {
      setIsFocused(true);
    }
    setValue(e.target.value);
  };

  //
  //
  //

  return {
    value,
    onChange,
    isValid,
    setIsValid,
    setValue,
    typeValid,
    setTypeValid,
    isFocused,
    lengthValid,
    setLengthValid,
    handleFirstChange,
    prevValue,
  } as UsePwChangeInputResult;
};
