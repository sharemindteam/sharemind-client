import { getInstance, getPublicInstance } from './axios';
//admin
export const getAdminsUnpaidConsults = async () =>
  await getInstance('/admins/unpaid-consults');
export const getAdminsPedningProfilse = async () =>
  await getInstance('/admins/pending-profiles');

//밑에 두개 지우기
export const getChats = async (params: any) =>
  await getInstance('/chats', params);
export const getLetters = async (params: any) =>
  await getInstance('/letters', params);

// 판매자 사이드 letter list
export const getConselorLetters = async (params: any) =>
  await getInstance('/letters/counselors', params);

//Chat Controller
//채팅 목록 반환
export const getChatsCustomers = async (params: any) =>
  await getInstance('/chats/customers', params);

export const getChatsMinder = async (params: any) =>
  await getInstance('/chats/counselors', params);

//Letter Controller
//편지 목록 반환
export const getLettersCustomers = async (params: any) =>
  await getInstance('/letters/customers', params);

export const getCustomerInfo = async (letterId: string | undefined) =>
  await getInstance(`/letters/counselors/customer-info/${letterId}`);

export const getCounselorCategories = async (letterId: number) =>
  await getInstance(`/letters/counselor-categories/${letterId}`);

export const getLetterCustomerCategory = async (letterId: string) =>
  await getInstance(`/letters/customer-category/${letterId}`);
export const getDraftsLetter = async (
  params: any,
  letterId: string | undefined,
) => await getInstance(`/letterMessages/drafts/${letterId}`, params);

export const getLetterDeadline = async (letterId: string | undefined) =>
  await getInstance(`/letters/deadline/${letterId}`);
//Customer Controller
export const getCustomersNickname = async () =>
  await getPublicInstance('/customers/nickname');
//LetterMessage Controller

export const getLetterMessages = async (
  params: any,
  letterId: string | undefined,
) => await getInstance(`/letterMessages/${letterId}`, params);

export const getLetterRecentType = async (letterId: string | undefined) =>
  await getInstance(`/letterMessages/recent-type/${letterId}`);
//Review Controller
export const getReviewsCustomer = async (params: any) =>
  await getInstance('/reviews/customers', params);

// Conuselor Controller
export const getMyInfo = async () => await getInstance('counselors/my-info');
export const getProfiles = async () => await getInstance('counselors/profiles');
export const getIsPassQuiz = async () => await getInstance('counselors/quiz');
export const getCounselorConsults = async (
  counselorId: string | undefined,
  params: any,
) => await getInstance(`/counselors/consults/${counselorId}`, params);

// SearchWord Controller
export const getSearchWords = async () => await getInstance('/searchWords');

//Review Controller

export const getMinderReviews = async (params: any) =>
  await getInstance('/reviews/counselors', params);
export const getMinderReviewsHome = async () =>
  await getInstance('/reviews/counselors/home');
