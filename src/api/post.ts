import { postInstance } from './axios';

//로그인
export const postLogin = async (body: any) =>
  await postInstance('/auth/signIn', body);

//인증번호 전송
export const postEmails = async (body: any) =>
  await postInstance('/emails', body);

//인증번호 확인
export const postEmailsCode = async (body: any) =>
  await postInstance('/emails/code', body);
