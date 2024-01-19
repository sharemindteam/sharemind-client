import { postInstance } from './axios';
//Auth controller
//로그인
export const postLogin = async (body: any) =>
  await postInstance('/auth/signIn', body);
//인증번호 확인
export const postSingup = async (body: any) =>
  await postInstance('/auth/signUp', body);
//refresh token 갱신
export const postReissue = async (body: any) =>
  await postInstance('/auth/reissue', body);

//Email controller
//인증번호 전송
export const postEmails = async (body: any) =>
  await postInstance('/emails', body);
//인증번호 확인
export const postEmailsCode = async (body: any) =>
  await postInstance('/emails/code', body);

//Consult Controller
//상담 신청
export const postConsults = async (body: any) =>
  await postInstance('/consults', body);


  //LetterMessage Controller
//Message 최초 생성
export const postLetterMessage = async (body: any) =>
await postInstance('/letterMessages', body);
//Message 최초 생성 (first-question)
export const postLetterMessageFirstQustion = async (body: any) =>
await postInstance('/letterMessages/first-question', body);