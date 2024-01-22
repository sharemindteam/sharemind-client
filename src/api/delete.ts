import { deleteInstance } from './axios';
//SearchWord Controller

//검색 결과 반환
export const deleteSearchWords = async (body: any) =>
  await deleteInstance('/searchWords', body);
