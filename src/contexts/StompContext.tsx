import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from 'react';
import SockJs from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';

// StompProvider 컨텍스트 생성
const StompContext = createContext(null);

// 커스텀 훅을 사용하여 컨텍스트 값에 접근
export const useStomp = () => useContext(StompContext);

// StompProvider 컴포넌트 정의
export const StompProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const stompClient = useRef<CompatClient>();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJs(process.env.REACT_APP_CHAT_URL + '/chat');
    stompClient.current = Stomp.over(socket);
    const currentUrl = window.location.href; // 현재 URL 가져오기
    const isCustomer = currentUrl.includes('/customer');
    // 연결
    stompClient.current.connect(
      {
        Authorization: localStorage.getItem('accessToken'),
        isCustomer: isCustomer,
      },
      (frame: any) => {
        console.log('Connected: ' + frame);
      },
      (error: any) => {
        if (error.headers.message === 'UNAUTHORIZED') {
          //   reissueToken();
          alert('UNAUTHORIZED');
        } else {
          alert(error);
          //   navigate('/minder/consult');
        }
      },
    );

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
        console.log('WebSocket disconnected');
      }
    };
  }, []); // 한 번만 실행
  //Context 객체의 Provider 컴포넌트
  return (
    <StompContext.Provider value={isConnected}>
      {children}
    </StompContext.Provider>
  );
};
