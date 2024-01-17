import { getInstance } from './axios';

//채팅 목록 반환
export const getChats = async (params: any) =>
  await getInstance('/chats', params);
