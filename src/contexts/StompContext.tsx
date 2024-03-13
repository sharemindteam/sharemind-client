import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useRef,
  MutableRefObject,
  useState,
} from 'react';
import SockJs from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { useRecoilState } from 'recoil';
import { isCustomerState } from 'utils/atom';
import { useLocation } from 'react-router-dom';
import { postPublicReissue } from 'api/post';
/*connected to server undefined doesn't mean that something is wrong. This 
line appears every time.
https://stackoverflow.com/questions/46662524/java-spring-boot-websocket-communication-with-js
*/

interface StompProviderType {
  stompClient: MutableRefObject<CompatClient | null>;
  connectChat: () => void;
  isConnected: boolean;
  // disconnect: () => void;
  // sendMessage: (message: Message) => void;
}
// StompProvider 컨텍스트 생성
export const StompContext = createContext<StompProviderType>(
  {} as StompProviderType,
);
// 커스텀 훅을 사용하여 컨텍스트 값에 접근
export const useStompContext = () => useContext(StompContext);

// StompProvider 컴포넌트 정의
export const StompProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const stompClient = useRef<CompatClient | null>(null);
  // const [isConnected, setIsConnected] = useState(false);
  const { pathname } = useLocation();
  const [isCustomer, setIsCustomer] = useRecoilState(isCustomerState);

  const [isConnected, setIsConnected] = useState<boolean>(false);

  // 옯바른 소켓 연결을 위해 경로에 따라 마인더, Seller 구분
  if (pathname.includes('/minder')) {
    setIsCustomer(false);
  } else {
    setIsCustomer(true);
  }

  const reissueToken = async () => {
    try {
      const tokenResponse: any = await postPublicReissue({
        refreshToken: localStorage.getItem('refreshToken'),
      });
      if (tokenResponse.status === 200) {
        const { accessToken, refreshToken } = tokenResponse.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        connectChat();
      }
    } catch (error) {
      console.log('socket unauthorized');
    }
  };

  const connectChat = () => {
    const socket = new SockJs(process.env.REACT_APP_CHAT_URL + '/chat');
    stompClient.current = Stomp.over(socket);

    // 연결
    stompClient.current.connect(
      {
        Authorization: localStorage.getItem('accessToken'),
        isCustomer: isCustomer,
      },
      (frame: any) => {
        console.log('Connected: ' + frame);
        setIsConnected(true);
      },
      (error: any) => {
        if (error.headers.message === 'UNAUTHORIZED') {
          reissueToken();
        } else {
          alert(error.headers.message);
        }
      },
    );

    stompClient.current.reconnect_delay = 100;
  };

  useEffect(() => {
    connectChat();
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
    <StompContext.Provider value={{ stompClient, connectChat, isConnected }}>
      {children}
    </StompContext.Provider>
  );
};
