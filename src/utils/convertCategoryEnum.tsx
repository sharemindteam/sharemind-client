//카테고리 number => enum 변환 함수
export const convertCategoryEnum = (category: string) => {
  switch (category) {
    case '연애갈등':
      return 'DATING';
    case '이별/재회':
      return 'BREAKUP';
    case '여자심리':
      return 'FEMALE_PSYCHOLOGY';
    case '남자심리':
      return 'MALE_PSYCHOLOGY';
    case '썸/연애시작':
      return 'BEGINNING';
    case '짝사랑':
      return 'ONE_SIDED';
    case '권태기':
      return 'BOREDOM';
    case '기타':
      return 'ETC';
    default:
      // 기본값이 필요한 경우에 대한 처리
      return category;
  }
};
// DATING("연애갈등"),
//     BREAKUP("이별/재회"),
//     FEMALE_PSYCHOLOGY("여자심리"),
//     MALE_PSYCHOLOGY("남자심리"),
//     BEGINNING("썸/연애시작"),
//     ONE_SIDED("짝사랑"),
//     BOREDOM("권태기"),
//     ETC("기타");
