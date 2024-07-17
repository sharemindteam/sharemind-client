import { axiosDelete } from './axios';
import { deleteInstance } from './axios.deprecated';

//Auth Controller
export const deleteAuthQuit = async (body: any) =>
  await deleteInstance('/auth/quit', body);
//SearchWord Controller

//검색 결과 반환
export const deleteSearchWords = async (body: any) =>
  await deleteInstance('/searchWords', body);
//WishList Controller

//검색 결과 반환
export const deleteWishListsDeprecated = async (counselorId: number) =>
  await deleteInstance(`/wishLists?counselorId=${counselorId}`);

export const deleteWishLists = async (counselorId: number) =>
  await axiosDelete(`/wishLists?counselorId=${counselorId}`);

// 일대다상담
// CommentLike Controller
export const deleteCommentLikes = async (commentId: any) =>
  await deleteInstance(`/commentLikes/${commentId}`);
// PostLike Controller
export const deletePostLikes = async (postId: any) =>
  await deleteInstance(`/postLikes/${postId}`);

// PostScrap Controller
export const deletePostScraps = async (postId: any) =>
  await deleteInstance(`/postScraps/${postId}`);
