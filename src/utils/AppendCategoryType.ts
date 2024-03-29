import { CartegoryState } from './type';

export const AppendCategoryType = (categories: string[], type: string) => {
  const updatedCategories = [...categories, type];
  const typeConvertCategories = updatedCategories as CartegoryState[];
  return typeConvertCategories;
};

export const AppendCategoryTypeUndefined = (
  categories: string[] | undefined,
  type: string | undefined,
) => {
  if (categories === undefined || type === undefined) {
    return [''];
  }
  const updatedCategories = [...categories, type];
  const typeConvertCategories = updatedCategories as CartegoryState[];
  return typeConvertCategories;
};
