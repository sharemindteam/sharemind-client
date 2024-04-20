export const ConvertOpenSortType = (typeNum: number) => {
  if (typeNum === 0) {
    return 'LATEST';
  } else if (typeNum === 1) {
    return 'DESC_TOTAL_LIKE';
  } else if (typeNum === 2) {
    return 'DESC_TOTAL_COMMENT';
  } else {
    return '';
  }
};
