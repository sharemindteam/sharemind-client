// 서버에서 념겨준 consultStyle을 Character num 으로 mapping..

export const consultStyleToCharNum = (consultStyle: string) => {
  if (consultStyle === '조언') {
    return 9;
  } else if (consultStyle === '공감') {
    return 10;
  } else if (consultStyle === '팩폭') {
    return 11;
  } else {
    return 9;
  }
};

export const consultCategoryToCharNum = (consultCategory: string) => {
  // if (consultCategory==="")
};
