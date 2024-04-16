import { useEffect, useState } from 'react';

const CategoryMap: Record<string, string> = {
  연애갈등: 'DATING',
  '이별/재회': 'BREAKUP',
  여자심리: 'FEMALE_PSYCHOLOGY',
  남자심리: 'MALE_PSYCHOLOGY',
  '썸/연애초기': 'BEGINNING',
  짝사랑: 'ONE_SIDED',
  권태기: 'BOREDOM',
  기타: 'ETC',
};

const StyleMap: Record<string, string> = {
  공감: 'SYMPATHY',
  조언: 'ADVICE',
  팩폭: 'FACT',
};

const TypeMap: Record<string, string> = {
  채팅: 'CHAT',
  편지: 'LETTER',
};

export const useCustomSelect = (
  type: 'category' | 'style' | 'type' | 'time',
) => {
  // 서버로 전달해야 될 값
  const [serverValue, setServerValue] = useState<string | string[] | undefined>(
    undefined,
  );
  // 화면에 띄울 값
  const [viewValue, setViewValue] = useState<string>(''); // 적절한 초기값으로 변경

  useEffect(() => {
    switch (type) {
      case 'category':
        setServerValue(viewValue?.split(', ').map((item) => CategoryMap[item]));
        break;
      case 'style':
        setServerValue(StyleMap[viewValue]);
        break;
      case 'type':
        setServerValue(viewValue?.split(', ').map((item) => TypeMap[item]));
        break;
    }
  }, [viewValue, type]); // type을 의존성 배열에 추가

  return { serverValue, setServerValue, viewValue, setViewValue };
};
