import { useState } from 'react';

export const useCustomSelect = () => {
  // 서버로 전달해야 될값
  const [serverValue, setServerValue] = useState('');
  // 화면에 띄울 값
  const [viewValue, setViewValue] = useState('');
  return { serverValue, setServerValue, viewValue, setViewValue };
};
