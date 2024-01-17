import { useEffect } from 'react';
import { JWT_EXPIRY_TIME } from 'utils/constant';
import { getCookie, setCookie } from 'utils/cookie';
import { postReissue } from 'api/post';
import { instance } from 'api/axios';

export const useTokenRefresh = () => {
  useEffect(() => {
    const fetchTokens = async () => {
      const storedRefreshToken = getCookie('refreshToken');

      if (storedRefreshToken) {
        try {
          // Access Token 갱신 요청
          const res: any = await postReissue({
            refreshToken: storedRefreshToken,
          });
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            res.data;
          // accessToken 설정
          instance.defaults.headers.common[
            'Authorization'
          ] = `${newAccessToken}`;

          setCookie('refreshToken', newRefreshToken, { path: '/' });
          // console.log('Access Token refreshed:', newAccessToken);
        } catch (error) {
          console.log('Error refreshing token:', error);
        }
      }
    };

    // 최초 실행
    fetchTokens();

    // 일정 주기마다 갱신 시도
    const refreshTokenInterval = setInterval(() => {
      fetchTokens();
    }, JWT_EXPIRY_TIME - 60000); // 1시간 간격(1분전에 갱신)
    // 컴포넌트가 언마운트되면 간격 제거
    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, []);
};
