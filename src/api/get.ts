import { getInstance } from './axios';
//buyer
//채팅 목록 반환
export const getChats = async (params: any) =>
  await getInstance('/chats', params);
//편지 리스트 조회
export const getLetters = async (params: any) =>
  await getInstance('/letters', params);
