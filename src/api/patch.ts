import { patchInstance } from './axios';

//채팅 목록 반환
export const patchAdmins = async (consultId: number) =>
  await patchInstance(`/admins/${consultId}`);

//LetterMessage Controller
//Message 최초 생성
export const patchLetterMessage = async (body: any) =>
  await patchInstance('/letterMessages', body);
//Message 최초 생성 (first-question)
export const patchLetterMessageFirstQustion = async (body: any) =>
  await patchInstance('/letterMessages/first-question', body);

export const patchProfiles = async () =>
  await patchInstance('counselors/profiles');
