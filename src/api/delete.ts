import { deleteInstance } from './axios';
//SearchWord Controller

//검색 결과 반환
export const deleteSearchWords = async (body: any) =>
  await deleteInstance('/searchWords', body);
//WishList Controller

//검색 결과 반환
export const deleteWishLists = async (counselorId: number) =>
  await deleteInstance(`/wishLists?counselorId=${counselorId}`);
