import { axiosGet, axiosPublicGet } from './axios';
import { getInstance, getPublicInstance } from './axios.deprecated';

/**
 * Admin Controller
 */
export const getAdminsUnpaidConsults = async () =>
  await getInstance('/admins/unpaid-consults');
export const getAdminsUnpaidPosts = async () =>
  await getInstance(`/admins/unpaid-posts`);
export const getAdminsPedningProfilse = async () =>
  await getInstance('/admins/pending-profiles');
export const getAdminsRefundWaiting = async () =>
  await getInstance('/admins/refund-waiting');
export const getIsServerShutdown = async () =>
  await axiosGet('/admins/managements');

// 판매자 사이드 letter list
export const getConselorLetters = async (params: any) =>
  await getInstance('/letters/counselors', params);

/**
 * Chat Controller
 */
//채팅 목록 반환
export const getChatsCustomers = async (params: any) =>
  await getInstance('/chats/customers', params);
//상담사 사이드 채팅방 정보 반환
export const getChatsCounselors = async (chatId: string) =>
  await getInstance(`/chats/counselors/${chatId}`);
//ChatMessage Controller
export const getChatMessagesCustomers = async (chatId: string, params: any) =>
  await getInstance(`/chatMessages/customers/${chatId}`, params);

export const getChatMessagesCounselors = async (chatId: string, params: any) =>
  await getInstance(`/chatMessages/counselors/${chatId}`, params);

export const getChatsMinder = async (params: any) =>
  await getInstance('/chats/counselors', params);

/**
 * Consult Controller
 */
export const getConsultsCustomers = async () =>
  await getPublicInstance('/consults/customers');

export const getConsultsMinder = async () =>
  await getPublicInstance('/consults/counselors');

/**
 * Letter Controller
 */
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

/**
 * Customer Controller
 */
export const getCustomers = async () => await getInstance('customers');
export const getCustomersNickname = async () =>
  await getPublicInstance('/customers/nickname');

/**
 * LetterMessage Controller
 */
export const getLetterMessages = async (
  params: any,
  letterId: string | undefined,
) => await getInstance(`/letterMessages/${letterId}`, params);

export const getLetterRecentType = async (letterId: string | undefined) =>
  await getInstance(`/letterMessages/recent-type/${letterId}`);
//Review Controller
export const getReviewsCustomer = async (params: any) =>
  await getInstance('/reviews/customers', params);

export const getReviewsAll = async (counselorId: number, params: any) =>
  await getPublicInstance(`/reviews/all/${counselorId}`, params);

/**
 * Counselor Controller
 */
export const getCounselors = async () => await getInstance('counselors');
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
export const getRandomCounselors = async (params: any) =>
  await axiosPublicGet(`/counselors/all/random`, params);

/**
 * SearchWord Controller
 */
export const getSearchWords = async () =>
  await getPublicInstance('/searchWords');
export const getCounselorsChats = async (chatId: string, params: any) =>
  await getInstance(`/counselors/chats/${chatId}`, params);

/**
 * Payment Controller
 */
export const getPaymentsCustomers = async (params: any) =>
  await getInstance('/payments/customers', params);

export const getCounselorsAccount = async () =>
  await getInstance('/counselors/account');

export const getPaymentsMinder = async (params: any) =>
  await getInstance('/payments/counselors', params);

export const getPaymentsHome = async () =>
  await getInstance('/payments/counselors/home');

/**
 * Review Controller
 */
export const getMinderReviews = async (params: any) =>
  await getInstance('/reviews/counselors', params);
export const getMinderReviewsHome = async () =>
  await getInstance('/reviews/counselors/home');

// 일대다상담 컨트롤러

// Comment Controller

export const getCounselorsComments = async (postId: any) =>
  await getInstance(`/comments/counselors/${postId}`);
export const getCustomersComments = async (postId: any) =>
  await getInstance(`/comments/customers/${postId}`);

export const getCounselorsIsWriteComments = async (postId: any) =>
  await getInstance(`/comments/counselors/authentication/${postId}`);

// Post Controller
export const getOneOpenConsult = async (id: string | undefined) =>
  await getInstance(`/posts/${id}`);

export const getCounselorsOpenConsultList = async (params: any) =>
  await getInstance(`/posts/counselors`, params);
export const getCounselorsOneConsult = async (postId: any) =>
  await getInstance(`/posts/counselors/${postId}`);

export const getCounselorsRandomConsult = async () =>
  await getInstance(`/posts/counselors/random`);

export const getCustomerOpenConsultList = async (params: any) =>
  await getInstance('/posts/customers', { params });

export const getPostsCutsomers = async (params: any) =>
  axiosGet('/posts/customers', params);

export const getPostsCustomersPublicLikes = (params: any) =>
  axiosPublicGet('/posts/customers/public/likes', params);

export const getPostsCustomersPublic = (params: any) =>
  axiosPublicGet('/posts/customers/public', params);

export const getCustomerIsWriter = async (postId: any) =>
  await getInstance(`/posts/customers/public/${postId}`);

export const getOpenConsultDraft = async (postId: any) =>
  await getInstance(`/posts/drafts/${postId}`);

// Post Scrap Controller

export const getPostScraps = async (params: any) =>
  getInstance(`/postScraps`, params);
