import { patchInstance, patchPublicInstance } from './axios';
//Admin Controller
//admin 미결제 상담 승인
export const patchAdminsUnpaidConsults = async (consultId: number) =>
  await patchInstance(`/admins/unpaid-consults/${consultId}`);
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
//아이디 찾기
export const patchAuthFindId = async (body: any) =>
  await patchPublicInstance('/auth/find-id', body);
//비밀번호 찾기
export const patchAuthFindPassword = async (body: any) =>
  await patchPublicInstance('/auth/find-password', body);

//Counselor Controller
//카테고리/들준마 상담사 리스트 반환
export const patchCounselorsAll = async (sortType: string, body: any) =>
  await patchPublicInstance(`/counselors/all?sortType=${sortType}`, body);
//LetterMessage Controller
//Message 최초 생성
export const patchLetterMessage = async (body: any) =>
  await patchInstance('/letterMessages', body);
//Message 최초 생성 (first-question)
export const patchLetterMessageFirstQustion = async (body: any) =>
  await patchInstance('/letterMessages/first-question', body);

export const patchProfiles = async (body: any) =>
  await patchInstance('counselors/profiles', body);
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
export const patchSearchWordsResults = async (sortType: string, body: any) =>
  await patchPublicInstance(`/searchWords/results?sortType=${sortType}`, body);

//Wishlist Controlloer
//찜하기 추가
export const patchWishLists = async (counselorId: number) =>
  await patchInstance(`/wishLists?counselorId=${counselorId}`);
