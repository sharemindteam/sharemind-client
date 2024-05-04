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
import { CompatClient, IFrame, Stomp } from '@stomp/stompjs';
import { useLocation } from 'react-router-dom';
import { postPublicReissue } from 'api/post';
import { getCookie, setCookie } from 'utils/cookie';
/*connected to server undefined doesn't mean that something is wrong. This 
line appears every time.
https://stackoverflow.com/questions/46662524/java-spring-boot-websocket-communication-with-js
*/

//
//
//

interface StompProviderType {
  stompClient: MutableRefObject<CompatClient | null>;
  connectChat: () => void;
  isConnected: boolean;
}

//
//
//

// StompProvider 컨텍스트 생성
export const StompContext = createContext<StompProviderType>(
  {} as StompProviderType,
);
// 커스텀 훅을 사용하여 컨텍스트 값에 접근
export const useStompContext = () => useContext(StompContext);

//
//
//

// StompProvider 컴포넌트 정의
export const StompProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const stompClient = useRef<CompatClient | null>(null);
  const { pathname } = useLocation();

  const getIsCustomer = () => {
    if (pathname.includes('/minder')) {
      return false;
    } else {
      return true;
    }
  };

  const currentIsCustomer = getIsCustomer();

  const [isConnected, setIsConnected] = useState<boolean>(false);

  const reissueToken = async () => {
    try {
      const tokenResponse: any = await postPublicReissue({
        refreshToken: getCookie('refreshToken'),
      });
      if (tokenResponse.status === 200) {
        const { accessToken, refreshToken } = tokenResponse.data;
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        connectChat();
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   *
   */
  const connectChat = () => {
    const socket = new SockJs(process.env.REACT_APP_CHAT_URL + '/chat');
    stompClient.current = Stomp.over(() => {
      return socket;
    });
    // 연결
    stompClient.current.connect(
      {
        Authorization: getCookie('accessToken'),
        isCustomer: currentIsCustomer,
      },
      (frame: IFrame) => {
        console.log('Connected: ' + frame);
      },
      (error: any) => {
        console.log(error);
        setIsConnected(false);
        if (error.headers.message === 'UNAUTHORIZED') {
          reissueToken();
        } else if (error.headers.message === '404 NOT_FOUND') {
          console.error(error.command, error.headers.message);
        } else {
          alert(error);
        }
      },
    );
    stompClient.current.onConnect = () => {
      setIsConnected(true);
    };
    stompClient.current.onDisconnect = () => {
      setIsConnected(false);
    };
    stompClient.current.reconnectDelay = 100;
  };

  //
  //
  //

  // connectChat();
  useEffect(() => {
    connectChat();
    // Provider 언마운트 시 연결 해제
    return () => {
      if (stompClient.current) {
        if (stompClient.current.connected) {
          stompClient.current.disconnect();
        }
        setIsConnected(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIsCustomer]); // 한 번만 실행

  //
  // Context 객체의 Provider 컴포넌트
  //
  return (
    <StompContext.Provider value={{ stompClient, connectChat, isConnected }}>
      {children}
    </StompContext.Provider>
  );
};
