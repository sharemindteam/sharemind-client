export const categoryInputMaker = (enumList: number[]) => {
  const categoryList = [
    '연애갈등',
    '이별/재회',
    '여자심리',
    '남자심리',
    '썸/연애제조기',
    '짝사랑',
    '권태기',
    '기타',
  ];

  const result = enumList.map((enumValue) => {
    if (enumValue >= 0 && enumValue < categoryList.length) {
      return categoryList[enumValue-1];
    }
  });

  return result.join(', ');
};
