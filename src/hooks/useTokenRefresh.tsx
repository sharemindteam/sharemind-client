import { useEffect } from 'react';
import { JWT_EXPIRY_TIME } from 'utils/constant';
import { getCookie, setCookie } from 'utils/cookie';
import { postReissue } from 'api/post';
import { instance } from 'api/axios';
import axios from 'axios';
// useEffect 순서 401 에러로 인해 추후 수정
export const useTokenRefresh = () => {
  useEffect(() => {
    const refreshTokenInterval = setInterval(async () => {
      const storedRefreshToken = getCookie('refreshToken');

      if (storedRefreshToken) {
        try {
          const res: any = await postReissue({
            refreshToken: storedRefreshToken,
          });

          if (res.status === 200) {
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = res.data;

            // instance.defaults.headers.common[
            //   'Authorization'
            // ] = `${newAccessToken}`;
            setCookie('refreshToken', newRefreshToken, { path: '/' });

            console.log('Access Token refreshed:', newAccessToken);
          } else {
            console.log(res);
          }
        } catch (error) {
          console.log('Error refreshing token:', error);
        }
      }
    }, JWT_EXPIRY_TIME - 60000); // 1시간 간격(1분 전에 갱신)

    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, []);
};
