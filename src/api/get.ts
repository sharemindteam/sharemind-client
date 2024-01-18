import { getInstance } from './axios';

//채팅 목록 반환
export const getChats = async (params: any) =>
  await getInstance('/chats', params);

//Letter Controller
export const getLetters = async (params: any) =>
  await getInstance('/letters', params)

export const getCustomerInfo = async (params: any, letterId: number) =>
  await getInstance(`/letters/customer-info/${letterId}`, params);
