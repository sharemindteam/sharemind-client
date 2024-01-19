import { patchInstance } from './axios';

//채팅 목록 반환
export const patchAdmins = async (consultId: number) =>
  await patchInstance(`/admins/${consultId}`);

export const patchLetterMessages = async (body: any) =>
  await patchInstance('/letterMessages', body);
