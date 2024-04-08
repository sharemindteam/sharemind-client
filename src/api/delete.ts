import { deleteInstance } from './axios';

//Auth Controller
export const deleteAuthQuit = async (body: any) =>
  await deleteInstance('/auth/quit', body);
//SearchWord Controller

//검색 결과 반환
export const deleteSearchWords = async (body: any) =>
  await deleteInstance('/searchWords', body);
//WishList Controller

//검색 결과 반환
export const deleteWishLists = async (counselorId: number) =>
  await deleteInstance(`/wishLists?counselorId=${counselorId}`);

export const deletePostScrap = async (postId: any) =>
  await deleteInstance(`/postScraps/${postId}`);

export const deletePostLikes = async (postId: any) =>
  await deleteInstance(`/postLikes/${postId}`);
