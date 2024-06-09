import axios from 'axios';
import { postPublicReissue, postReissue } from './post';
import { getCookie, setCookie } from 'utils/cookie';

//
//axios instance that the token is required
//

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `${getCookie('accessToken')}`,
  },
});

instance.interceptors.request.use((config) => {
  const token = getCookie('accessToken');
  config.headers.Authorization = token;

  return config;
});

//리프레시 토큰 구현
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      const originRequest = config;
      try {
        const tokenResponse: any = await postReissue({
          refreshToken: getCookie('refreshToken'),
        });
        if (tokenResponse.status === 200) {
          const { accessToken, refreshToken } = tokenResponse.data;
          setCookie('accessToken', accessToken);
          setCookie('refreshToken', refreshToken);
          axios.defaults.headers.common.Authorization = `${accessToken}`;
          originRequest.headers.Authorization = `${accessToken}`;
          return instance(originRequest);
        } else if (tokenResponse.response.status === 400) {
          alert('로그인 후 이용해 주세요.');
          window.location.href = '/mypage';
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert('로그인 후 이용해 주세요');
        }
      }
    }
    return Promise.reject(error);
  },
);

//
// axios instance that the token is not required
//

const publicInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `${getCookie('accessToken')}`,
  },
});

publicInstance.interceptors.request.use((config) => {
  const token = getCookie('accessToken');
  config.headers.Authorization = token;

  return config;
});

//리프레시 토큰 구현
publicInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      const originRequest = config;
      try {
        const tokenResponse: any = await postPublicReissue({
          refreshToken: getCookie('refreshToken'),
        });
        if (tokenResponse.status === 200) {
          const { accessToken, refreshToken } = tokenResponse.data;
          setCookie('accessToken', accessToken);
          setCookie('refreshToken', refreshToken);
          axios.defaults.headers.common.Authorization = `${accessToken}`;
          originRequest.headers.Authorization = `${accessToken}`;
          return axios(originRequest);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert('로그인 후 이용해 주세요');
        }
      }
    }

    return Promise.reject(error);
  },
);

//
//
//

export const axiosGet = async (url: string, params?: any) =>
  await instance.get(url, { params });

export const axiosPost = async (url: string, body: any, params?: any) =>
  await instance.post(url, body, { params });

export const axiosPut = async (url: string, body: any, params: any) =>
  await instance.put(url, body, { params });

export const axiosPatch = async (url: string, body?: any, params?: any) =>
  await instance.patch(url, body, { params });

export const axiosDelete = async (url: string, body?: any) => {
  const config = {
    data: body,
  };
  return await instance.delete(url, config);
};

//
//
//

export const axiosPublicGet = async (url: string, params?: any) =>
  await instance.get(url, { params });

export const axiosPublicPost = async (url: string, body: any, params?: any) =>
  await instance.post(url, body, { params });

export const axiosPublicPut = async (url: string, body: any, params: any) =>
  await instance.put(url, body, { params });

export const axiosPublicPatch = async (url: string, body?: any, params?: any) =>
  await instance.patch(url, body, { params });

export const axiosPublicDelete = async (url: string, body?: any) => {
  const config = {
    data: body,
  };
  return await instance.delete(url, config);
};
