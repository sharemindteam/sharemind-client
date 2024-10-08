import { axiosPost } from 'api/axios';
import { postInstance, postPublicInstance } from './axios.deprecated';
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

export const postPublicReissue = async (body: any) =>
  await postPublicInstance('/auth/reissue', body);
// 비밀번호 일치여부 조회
export const postPassword = async (body: any) =>
  await postInstance('/auth/password', body);

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
  await axiosPost('/consults', body);

//LetterMessage Controller
//Message 최초 생성
export const postLetterMessage = async (body: any) =>
  await postInstance('/letterMessages', body);
//Message 최초 생성 (first-question)
export const postLetterMessageFirstQustion = async (body: any) =>
  await postInstance('/letterMessages/first-question', body);

//Counselor Controller
// 퀴즈 통과 여부 수정
export const postIsPassQuiz = async (body: any, parmas: any) =>
  await postInstance('counselors/quiz', body, parmas);

//Wishlist Controlloer
//찜하기 목록 가져오기
export const postWishLists = async (body: any) =>
  await postInstance('/wishLists', body);

// 일대다상담

// Comment Controller
export const postComment = async (body: any) =>
  await postInstance('/comments/counselors', body);

// CommentLike Controller

export const postLikeComment = async (commentId: any) =>
  await postInstance(`/commentLikes/${commentId}`, {});

// Post Controller
export const postOpenConsult = async (body: any) =>
  await axiosPost('/posts', body);

// PostLike Controller

export const postLikeOpenConsult = async (postId: any) =>
  await postInstance(`/postLikes/${postId}`, {});

// PostScrap Controller
export const postScrapOpenConsult = async (postId: any) =>
  await postInstance(`/postScraps/${postId}`, {});
