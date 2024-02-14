import { useRef } from 'react';

export const useDebounce = <T extends any[]>(
  callback: (...params: T) => void,
  time: number,
) => {
  //ReturnType: typescript 제네릭 유틸 함수
  //setTimeout의 return type으로 지정
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...params: T) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      callback(...params);
      timer.current = null;
    }, time);
  };
};
