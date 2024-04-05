import { useState, Dispatch, SetStateAction, useRef } from 'react';

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
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  lengthValid: boolean;
  setLengthValid: Dispatch<SetStateAction<boolean>>;
  initialRenderRef: React.MutableRefObject<boolean>;
};
//input만 사용할 시 해당 커스텀훅 사용
export const usePwChangeInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);
  //영문, 숫자, 특수문자 중 2종 이상 포함
  const [typeValid, setTypeValid] = useState<boolean>(false);
  //10자 이상
  const [lengthValid, setLengthValid] = useState<boolean>(false);

  const initialRenderRef = useRef(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    lengthValid,
    setLengthValid,
    initialRenderRef,
  } as UsePwChangeInputResult;
};
