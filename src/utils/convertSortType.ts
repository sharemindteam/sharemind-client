export const ConverSortType = (typeNum: number) => {
  if (typeNum === 0) {
    return 'LATEST';
  } else if (typeNum === 1) {
    return 'POPULARITY';
  } else if (typeNum === 2) {
    return 'STAR_RATING';
  } else {
    return '';
  }
};
