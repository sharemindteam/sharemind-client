import { axiosPatch } from './axios';
import { patchInstance, patchPublicInstance } from './axios.deprecated';
//Admin Controller
//admin 미결제 상담 승인
export const patchAdminsUnpaidConsults = async (consultId: number) =>
  await patchInstance(`/admins/unpaid-consults/${consultId}`);

export const patchAdminsUnpaidPosts = async (postId: number) =>
  await patchInstance(`/admins/unpaid-posts/${postId}`);
//admin 프로필 수정 승인
export const patchAdminsPendingProfiles = async (
  counselorId: number,
  params: any,
) =>
  await patchInstance(
    `/admins/pending-profiles/${counselorId}`,
    undefined,
    params,
  );
//admin 결제 환불 완료 수정
export const patchAdminsRefundWaiting = async (paymentId: number) =>
  await patchInstance(`/admins/refund-waiting/${paymentId}`);

/*Auth Controller*/

export const patchAuthPassword = async (body: any) =>
  await patchInstance('/auth/password', body);

//비밀번호 찾기
export const patchAuthFindPassword = async (body: any) =>
  await patchPublicInstance('/auth/find-password', body);
//로그아웃
export const patchAuthSignOut = async (body: any) =>
  await patchInstance('/auth/signOut', body);

//Counselor Controller
//카테고리/들준마 상담사 리스트 반환
export const patchCounselorsAllDeprecated = async (
  sortType: string,
  body: any,
) => await patchPublicInstance(`/counselors/all?sortType=${sortType}`, body);

export const patchCounselorsAll = async (sortType: string, body: any) =>
  await axiosPatch(`/counselors/all?sortType=${sortType}`, body);

//LetterMessage Controller
//Message 최초 생성
export const patchLetterMessage = async (body: any) =>
  await patchInstance('/letterMessages', body);

export const patchCounselorsAccount = async (body: any) =>
  await patchInstance('/counselors/account', body);

//Message 최초 생성 (first-question)
export const patchLetterMessageFirstQustion = async (body: any) =>
  await patchInstance('/letterMessages/first-question', body);

export const patchProfiles = async (body: any) =>
  await axiosPatch('counselors/profiles', body);

//Payment Controller
export const patchPaymentsCustomers = async (paymentId: number) =>
  await patchInstance(`/payments/customers/${paymentId}`);
//Review Controller
export const patchReviews = async (body: any) =>
  await patchInstance('/reviews', body);

export const patchApplyPayments = async (id: any) =>
  await patchInstance(`/payments/counselors/${id}`);

//SearchWord Controller
//검색 결과 반환
export const patchSearchWordsCounselorsResults = async (
  sortType: string,
  body: any,
) =>
  await patchPublicInstance(
    `/searchWords/results/counselors?sortType=${sortType}`,
    body,
  );

export const patchSearchWordsPostsResults = async (
  sortType: string,
  body: any,
) =>
  await patchPublicInstance(
    `/searchWords/results/posts?sortType=${sortType}`,
    body,
  );
//Wishlist Controlloer
//찜하기 추가
export const patchWishListsDeprecated = async (counselorId: number) =>
  await patchInstance(`/wishLists?counselorId=${counselorId}`);

export const patchWishLists = async (counselorId: number) =>
  await axiosPatch(`/wishLists?counselorId=${counselorId}`);

//일대다상담

//Comment Controller

export const patchAdoptComment = async (postId: any, commentId: string) =>
  await patchInstance(`/comments/customers/${postId}?commentId=${commentId}`);

//Post Controller
export const patchOpenConsult = async (body: any) =>
  await patchInstance(`/posts`, body);
