import axios from 'axios';
import { getCookie } from 'utils/cookie';
import { postReissue } from './post';
// axios 인스턴스 생성
export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `${localStorage.getItem('accessToken')}`,
  },
});
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
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
          refreshToken: localStorage.getItem('refreshToken'),
        });
        if (tokenResponse.status === 201) {
          const newAccessToken = tokenResponse.data.token;
          localStorage.setItem('accessToken', tokenResponse.data.token);
          localStorage.setItem('refreshToken', tokenResponse.data.refreshToken);
          axios.defaults.headers.common.Authorization = `${newAccessToken}`;
          originRequest.headers.Authorization = `${newAccessToken}`;
          return axios(originRequest);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // if (
          //   error.response?.status === 404 ||
          //   error.response?.status === 422
          // ) {
          alert('로그인 후 이용해 주세요');
          // } else {
          //   alert(LOGIN.MESSAGE.ETC);
          // }
        }
      }
    }

    return Promise.reject(error);
  },
);

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

export const patchInstance = async (url: string, body: any, params: any) => {
  try {
    const data = await instance.patch(url, body, params);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteInstance = async (url: string) => {
  try {
    const data = await instance.delete(url);
    return data;
  } catch (error) {
    return error;
  }
};
