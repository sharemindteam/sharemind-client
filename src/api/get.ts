import { getInstance } from './axios';
//admin
export const getAdminsUnpaidConsults = async () =>
  await getInstance('/admins/unpaid-consults');
export const getAdminsPedningProfilse = async () =>
  await getInstance('/admins/pending-profiles');

//buyer
//채팅 목록 반환
export const getChats = async (params: any) =>
  await getInstance('/chats', params);

//Letter Controller
export const getLetters = async (params: any) =>
  await getInstance('/letters', params);

export const getCustomerInfo = async (letterId: string | undefined) =>
  await getInstance(`/letters/customer-info/${letterId}`);

export const getCounselorCategories = async (letterId: number) =>
  await getInstance(`/letters/categories/${letterId}`);

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

// Conuselor Controller

export const getIsPassQuiz = async () => await getInstance('counselors/quiz');

// SearchWord Controller
export const getSearchWords = async () => await getInstance('/searchWords');
