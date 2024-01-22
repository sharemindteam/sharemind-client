import { patchInstance } from './axios';
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

//LetterMessage Controller
//Message 최초 생성
export const patchLetterMessage = async (body: any) =>
  await patchInstance('/letterMessages', body);
//Message 최초 생성 (first-question)
export const patchLetterMessageFirstQustion = async (body: any) =>
  await patchInstance('/letterMessages/first-question', body);

export const patchProfiles = async (body: any) =>
  await patchInstance('counselors/profiles', body);

//SearchWord Controller
//검색 결과 반환
export const patchSearchWordsResults = async (sortType: string, body: any) =>
  await patchInstance(`/searchWords/results?sortType=${sortType}`, body);
