import { postInstance } from './axios';

//로그인
export const postLogin = async (body: any) =>
  await postInstance('/auth/signIn', body);
