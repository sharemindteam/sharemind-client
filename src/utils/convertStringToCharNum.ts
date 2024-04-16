// 서버에서 념겨준 consultStyle을 Character num 으로 mapping..
export const consultStyleToCharNum = (consultStyle: string | undefined) => {
  switch (consultStyle) {
    case '조언':
      return 9;
    case '공감':
      return 10;
    case '팩폭':
      return 11;
    default:
      return undefined; // 처리되지 않은 경우 undefined 반환
  }
};

export const consultCategoryToCharNum = (
  consultCategory: string | undefined,
) => {
  switch (consultCategory) {
    case '연애갈등':
      return 1;
    case '이별/재회':
      return 2;
    case '여자심리':
      return 3;
    case '남자심리':
      return 4;
    case '썸/연애시작':
      return 5;
    case '짝사랑':
      return 6;
    case '권태기':
      return 7;
    case '기타':
      return 8;
    default:
      return undefined;
  }
};
