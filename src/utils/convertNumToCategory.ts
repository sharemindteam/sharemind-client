//카테고리 number => enum 변환 함수
export const convertNumToCategory = (num: number) => {
  switch (num) {
    case 1:
      return '연애갈등';
    case 2:
      return '이별/재회';
    case 3:
      return '여자심리';
    case 4:
      return '남자심리';
    case 5:
      return '썸/연애시작';
    case 6:
      return '짝사랑';
    case 7:
      return '권태기';
    case 8:
      return '기타';
    default:
      return '';
  }
};
