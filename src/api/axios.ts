import axios from 'axios';
import { postPublicReissue, postReissue } from './post';
import { getCookie, setCookie } from 'utils/cookie';
// axios 인스턴스 생성
export const instance = axios.create({
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

// axios 인증 필요 없는 인스턴스 생성
export const publicInstance = axios.create({
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
