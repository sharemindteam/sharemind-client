import { CartegoryState } from './type';

export const AppendCategoryType = (categories: string[], type: string) => {
  const updatedCategories = [...categories, type];
  const typeConvertCategories = updatedCategories as CartegoryState[];
  return typeConvertCategories;
};
