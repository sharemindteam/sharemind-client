import { instance, publicInstance } from './axios';

//
//
//

export const getInstance = async (url: string, params?: any) => {
  try {
    const data = await instance.get(url, params);
    return data;
  } catch (error) {
    return error;
  }
};
export const postInstance = async (url: string, body: any, params?: any) => {
  try {
    const data = await instance.post(url, body, params);
    return data;
  } catch (error) {
    return error;
  }
};
export const putInstance = async (url: string, body: any, params: any) => {
  try {
    const data = await instance.put(url, body, params);
    return data;
  } catch (error) {
    return error;
  }
};

export const patchInstance = async (url: string, body?: any, params?: any) => {
  try {
    const data = await instance.patch(url, body, params);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteInstance = async (url: string, body?: any) => {
  try {
    const config = {
      data: body,
    };
    const data = await instance.delete(url, config);
    return data;
  } catch (error) {
    return error;
  }
};

//
//
//

export const getPublicInstance = async (url: string, params?: any) => {
  try {
    const data = await publicInstance.get(url, params);
    return data;
  } catch (error) {
    return error;
  }
};
export const postPublicInstance = async (
  url: string,
  body: any,
  params?: any,
) => {
  try {
    const data = await publicInstance.post(url, body, params);
    return data;
  } catch (error) {
    return error;
  }
};
export const putPublicInstance = async (
  url: string,
  body: any,
  params: any,
) => {
  try {
    const data = await publicInstance.put(url, body, params);
    return data;
  } catch (error) {
    return error;
  }
};

export const patchPublicInstance = async (
  url: string,
  body?: any,
  params?: any,
) => {
  try {
    const data = await publicInstance.patch(url, body, params);
    return data;
  } catch (error) {
    return error;
  }
};

export const deletePublicInstance = async (url: string, body?: any) => {
  try {
    const config = {
      data: body,
    };
    const data = await publicInstance.delete(url, config);
    return data;
  } catch (error) {
    return error;
  }
};

//
//
//
