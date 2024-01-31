import { getInstance, getPublicInstance } from './axios';
//admin
export const getAdminsUnpaidConsults = async () =>
  await getInstance('/admins/unpaid-consults');
export const getAdminsPedningProfilse = async () =>
  await getInstance('/admins/pending-profiles');
export const getAdminsRefundWaiting = async () =>
  await getInstance('/admins/refund-waiting');
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
//Consult Controller
export const getConsultsCustomers = async () =>
  await getPublicInstance('/consults/customers');

export const getConsultsMinder = async () =>
  await getPublicInstance('/consults/counselors ');

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
//편지 상대방 이름 조회
export const getLettersNickname = async (letterId: string | undefined) =>
  await getInstance(`/letters/nickname/${letterId}`);

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

export const getReviews = async (counselorId: number, params: any) =>
  await getPublicInstance(`/reviews/${counselorId}`, params);

// Conuselor Controller
export const getMyInfo = async () => await getInstance('counselors/my-info');
export const getProfiles = async () => await getInstance('counselors/profiles');
export const getIsPassQuiz = async () => await getInstance('counselors/quiz');
export const getCounselorConsults = async (
  counselorId: string | undefined,
  params: any,
) => await getInstance(`/counselors/consults/${counselorId}`, params);
//마인더 프로필 페이지 마인더 프로필 조회
export const getCounselorsAll = async (counselorId: string | undefined) =>
  await getPublicInstance(`/counselors/all/${counselorId}`);
// SearchWord Controller
export const getSearchWords = async () =>
  await getPublicInstance('/searchWords');

//Payment Controller
export const getPaymentsCustomers = async (params: any) =>
  await getInstance('/payments/customers', params);
//Review Controller

export const getMinderReviews = async (params: any) =>
  await getInstance('/reviews/counselors', params);
export const getMinderReviewsHome = async () =>
  await getInstance('/reviews/counselors/home');
