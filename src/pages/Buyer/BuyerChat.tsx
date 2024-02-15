// import { useState } from 'react';
import SockJs from 'sockjs-client';
// import * as StompJs from '@stomp/stompjs';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { useChat } from 'hooks/useChat';
import { useInput } from 'hooks/useInput';
import { useEffect, useRef, useState } from 'react';
import { Body2, Heading } from 'styles/font';
import { ChatMessage } from 'utils/type';
import styled from 'styled-components';
import {
  Green,
  Grey1,
  Grey3,
  Grey6,
  LightGreenChat,
  White,
} from 'styles/color';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Search } from 'assets/icons/chat-send-button.svg';
import { formattedMessage } from 'utils/formattedMessage';
import { postReissue } from 'api/post';
export const BuyerChat = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState<string>(''); //입력
  const [inputValid, setInputValid] = useState<boolean>(false); //입력 있을 시 버튼 색상
  const inputRef = useRef<HTMLTextAreaElement>(null); //input ref 높이 초기화를 위함
  const stompClient = useRef<CompatClient | null>(null);
  const isConnected = useRef(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatId = 31;
  const ReissueToken = async () => {
    try {
      const tokenResponse: any = await postReissue({
        refreshToken: localStorage.getItem('refreshToken'),
      });
      if (tokenResponse.status === 200) {
        const { accessToken, refreshToken } = tokenResponse.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        connectChat();
      } else if (tokenResponse.response.status === 400) {
        alert('로그인 후 이용해 주세요.');
        window.location.href = '/mypage';
      }
    } catch (error) {
      alert('로그인 후 이용해 주세요.');
      window.location.href = '/mypage';
    }
  };
  const connectChat = () => {
    const socket = new SockJs(process.env.REACT_APP_CHAT_URL + '/chat');
    stompClient.current = Stomp.over(socket);
    //나중에 localStorage 에서 꺼내기

    //   if (isConnected.current) {
    //     stompClient.current.disconnect();
    //     isConnected.current = false;
    //   }
    console.log(localStorage.getItem('accessToken'));
    stompClient.current.connect(
      {
        Authorization: localStorage.getItem('accessToken'),
        isCustomer: true,
      },
      (frame: any) => {
        console.log(stompClient.current);
        console.log('Connected: ' + frame);
        if (stompClient.current) {
          // 구독
          //채팅 목록 실시간 업데이트
          // stompClient.current.subscribe(
          //   '/queue/chattings/notifications/customers/19',
          //   function (notification) {
          //     console.log('Notification: ', notification.body);
          //   },
          // );
          //request를 보냈을 때에 관한 것, 마인더가 chat start, 셰어가 수락, 셰어가 끝남 확인
          //(COUNSELOR_CHAT_START_REQUEST, CUSTOMER_CHAT_START_RESPONSE, CUSTOMER_CHAT_FINISH_REQUEST)
          stompClient.current.subscribe(
            '/queue/chattings/customers/' + chatId,
            function (statusUpdate) {
              console.log('Status Update: ', statusUpdate.body);
            },
          );
          //채팅 시작, 채팅 5분 남았을 때, 채팅 끝났을 때 알림
          stompClient.current.subscribe(
            '/queue/chattings/status/customers/' + chatId,
            function (statusAutoUpdate) {
              console.log('Status Auto Update: ', statusAutoUpdate.body);
            },
          );
          //에러 핸들링
          stompClient.current.subscribe(
            '/queue/chattings/exception/customers/' + chatId,
            function (error) {
              console.log('Error: ', error.body);
            },
          );
          stompClient.current.subscribe(
            '/queue/chatMessages/customers/' + chatId,
            function (message) {
              //받은 message 정보
              const arrivedMessage = JSON.parse(message.body);

              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  customerNickname: arrivedMessage.senderName,
                  counselorNickname: '어떻게알지?',
                  messageId: 0,
                  content: arrivedMessage.content,
                  sendTime: arrivedMessage.sendTime,
                  isCustomer: arrivedMessage.isCustomer,
                },
              ]);
            },
          );
        }
      },
      (error: any) => {
        console.log(error);
        if (error.headers.message === 'UNAUTHORIZED') {
          ReissueToken();
        } else {
          alert(error);
          navigate('/consult');
        }
      },
    );
  };
  const sendMessage = () => {
    if (stompClient.current) {
      stompClient.current.send(
        '/app/api/v1/chatMessages/customers/' + chatId,
        {},
        JSON.stringify({ content: input }),
      );
    }
  };

  const sendChatStartRequest = () => {
    if (stompClient.current) {
      stompClient.current.send(
        '/app/api/v1/chat/customers/' + chatId,
        {},
        JSON.stringify({ chatWebsocketStatus: 'COUNSELOR_CHAT_START_REQUEST' }),
      );
    }
  };

  const sendChatStartResponse = () => {
    if (stompClient.current) {
      stompClient.current.send(
        '/app/api/v1/chat/customers/' + chatId,
        {},
        JSON.stringify({ chatWebsocketStatus: 'CUSTOMER_CHAT_START_RESPONSE' }),
      );
    }
  };

  const sendChatFinishRequest = () => {
    if (stompClient.current) {
      stompClient.current.send(
        '/app/api/v1/chat/customers/' + chatId,
        {},
        JSON.stringify({ chatWebsocketStatus: 'CUSTOMER_CHAT_FINISH_REQUEST' }),
      );
    }
  };

  const sendConnectRequest = () => {
    if (stompClient.current !== null) {
      stompClient.current.send(
        '/app/api/v1/chat/customers/connect',
        {},
        JSON.stringify({}),
      );
    }
  };
  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 실행
    connectChat();
    // 언마운트 시에 소켓 연결 해제
    return () => {
      if (stompClient.current) {
        console.log('연결해제');
        stompClient.current.disconnect();
      }
    };
  }, []);
  //보내기 버튼 색상처리
  useEffect(() => {
    if (input.trim() !== '') {
      setInputValid(true);
    } else {
      setInputValid(false);
    }
  }, [input]);

  const handleDisconnect = () => {
    if (stompClient.current) {
      console.log('연결해제 클릭');
      stompClient.current.disconnect();
    }
  };

  const handleSubmit = () => {
    if (input.trim() !== '') {
      sendMessage();
      setInput('');
    }
    if (inputRef.current) inputRef.current.style.height = '4.8rem';
  };
  return (
    <Wrapper>
      <HeaderWrapper border={false}>
        <BackIcon
          onClick={() => {
            navigate('/consult');
          }}
        />
        <Heading color={Grey1}>채팅상대이름</Heading>
      </HeaderWrapper>
      <button onClick={handleDisconnect}>disconnect</button>
      <button onClick={sendMessage}>send message</button>
      <SectionWrapper>
        {messages.map((value) => {
          if (value.isCustomer) {
            return (
              <div className="my-box-container">
                <CustomerChatBox>
                  <Body2 color={Grey1}>{formattedMessage(value.content)}</Body2>
                </CustomerChatBox>
              </div>
            );
          } else {
            return (
              <div className="opponent-box-container">
                <CounselorChatBox>
                  <Body2 color={Grey1}>{formattedMessage(value.content)}</Body2>
                </CounselorChatBox>
              </div>
            );
          }
        })}
      </SectionWrapper>
      <FooterWrapper>
        <div className="message-form">
          <ChatTextarea
            ref={inputRef}
            rows={1}
            placeholder="메세지"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              //textarea 높이 동적할당
              e.target.style.height = '4.8rem';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return; //key 조합 감지
              // 모바일 환경이 아닐 때에는 enter로 전송, shift + enter로 줄바꿈
              if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                if (e.key === 'Enter' && e.shiftKey) return;
                else if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }
            }}
          />
          <button
            type="submit"
            style={{ margin: '0', padding: '0' }}
            onClick={handleSubmit}
          >
            <SearchIcon InputValid={inputValid} />
          </button>
        </div>
      </FooterWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  height: 100%;
  width: 100%;
  background-color: ${Grey6};
  position: relative;
`;
const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  .my-box-container {
    display: flex;
    justify-content: flex-end;
    margin: 0.4rem 2rem 0.4rem 0;
  }
  .opponent-box-container {
    display: flex;
    justify-content: flex-start;
    margin: 0.4rem 0 0.4rem 2rem;
  }
`;
const FooterWrapper = styled.footer`
  position: fixed;
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  @media (max-width: 767px) {
    width: 100vw;
  }
  background-color: ${White};
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1.2rem;

  .message-form {
    padding: 0.8rem 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
  }
`;
const SearchIcon = styled(Search)<{ InputValid: boolean }>`
  fill: ${(props) => (props.InputValid ? Green : Grey3)};
  padding: 1rem 0.4rem 1rem 0.8rem;
  cursor: pointer;
`;
const CustomerChatBox = styled.div`
  background-color: ${LightGreenChat};
  border-radius: 1rem 0 1rem 1rem;
  padding: 1.2rem;
  box-sizing: border-box;
  max-width: 27.5rem;
`;
const CounselorChatBox = styled.div`
  background-color: ${White};
  border-radius: 0 1rem 1rem 1rem;
  padding: 1.2rem;
  box-sizing: border-box;
  max-width: 27.5rem;
`;

const ChatTextarea = styled.textarea`
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  color: ${Grey1};
  &::placeholder {
    color: ${Grey3};
  }
  min-height: 4.8rem;
  max-heigth: 9.6rem;
  border-radius: 1.2rem;
  width: 78.66%;
  background-color: ${Grey6};
  padding: 1.52rem 0.8rem 1.52rem 1.2rem;
  box-sizing: border-box;
`;
