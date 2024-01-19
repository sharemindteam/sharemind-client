import { getInstance } from './axios';
//admin
export const getAdmins = async () => await getInstance('/admins');

//buyer
//채팅 목록 반환
export const getChats = async (params: any) =>
  await getInstance('/chats', params);

//Letter Controller
export const getLetters = async (params: any) =>
  await getInstance('/letters', params);

export const getCustomerInfo = async (letterId: string | undefined) =>
  await getInstance(`/letters/customer-info/${letterId}`);

export const getCounselorCategories = async (params: any, letterId: number) =>
  await getInstance(`/letters/categories/${letterId}`, params);

export const getDraftsLetter = async (
  params: any,
  letterId: string | undefined,
) => await getInstance(`/letterMessages/drafts/${letterId}`, params);

export const getLetterDeadline = async (letterId: string | undefined) =>
  await getInstance(`/letters/deadline/${letterId}`);

//LetterMessage Controller

export const getLetterMessages = async (
  params: any,
  letterId: string | undefined,
) => await getInstance(`/letterMessages/${letterId}`, params);

export const getLetterRecentType = async (letterId: string | undefined) =>
  await getInstance(`/letterMessages/recent-type/${letterId}`);
