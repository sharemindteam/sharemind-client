// import { useState } from 'react';
import SockJs from 'sockjs-client';
// import * as StompJs from '@stomp/stompjs';
import { CompatClient, Stomp } from '@stomp/stompjs';
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
import { BackIcon } from 'components/Buyer/Common/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as Search } from 'assets/icons/chat-send-button.svg';
import { formattedMessage } from 'utils/formattedMessage';
import { postReissue } from 'api/post';
import { getChatMessagesCustomers } from 'api/get';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { pending6 } from 'utils/pending';
import { Space } from 'components/Common/Space';
export const BuyerChat = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const chatId = id || '';
  //states
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>(''); //입력
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [inputValid, setInputValid] = useState<boolean>(false); //입력 있을 시 버튼 색상
  //useRefs
  const inputRef = useRef<HTMLTextAreaElement>(null); //input ref 높이 초기화를 위함
  const sectionPaddingRef = useRef<number>(2.4); // section 추가 padding bottom
  const stompClient = useRef<CompatClient | null>(null);
  const preventRef = useRef(true); // observer 중복방지
  const isLastElem = useRef(false); //마지막 채팅인지 확인
  const lastRef = useRef<HTMLDivElement>(null); // 마지막 채팅 box ref
  const newMessageRef = useRef(false); // 새로운 메세지인지 이전 메세지 fetch인지
  const topRef = useRef<HTMLDivElement>(null); //top에 와야하는 box
  const isConnected = useRef(false);

  const reissueToken = async () => {
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
        navigate('/mypage');
      }
    } catch (error) {
      alert('로그인 후 이용해 주세요.');
      navigate('/mypage');
    }
  };
  //getChatMessages로 스크롤 시 계속 업데이트
  const getChatMessages = async (firstMessageId: number) => {
    try {
      const params = {
        messageId: firstMessageId,
      };
      const res: any = await getChatMessagesCustomers(chatId, {
        params,
      });
      if (res.status === 200) {
        if (res.data.length !== 0) {
          //새 메세지 도착이 아닌 이전 메시지 fetch
          newMessageRef.current = false;
          if (firstMessageId === 0) {
            setMessages(res.data.reverse());
          } else {
            const reversedMessages = res.data.reverse();
            const updatedMessages = [...reversedMessages, ...messages];
            setMessages(updatedMessages);
          }
        } else {
          isLastElem.current = true;
        }
      } else if (res.response.status === 404) {
        alert('접근 권한이 없거나 존재하지 않는 채팅입니다.');
        navigate('/consult');
      }
    } catch (e) {
      alert(e);
    } finally {
      if (firstMessageId === 0) {
        setIsInitialLoading(false);
      }
    }
  };
  const connectChat = () => {
    const socket = new SockJs(process.env.REACT_APP_CHAT_URL + '/chat');
    stompClient.current = Stomp.over(socket);

    //   if (isConnected.current) {
    //     stompClient.current.disconnect();
    //     isConnected.current = false;
    //   }
    stompClient.current.connect(
      {
        Authorization: localStorage.getItem('accessToken'),
        isCustomer: true,
      },
      (frame: any) => {
        console.log('Connected: ' + frame);
        if (stompClient.current) {
          // 구독
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
              //새 메세지 도착
              newMessageRef.current = true;
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
        if (error.headers.message === 'UNAUTHORIZED') {
          reissueToken();
        } else {
          alert(error);
          navigate('/consult');
        }
      },
    );

    stompClient.current.reconnect_delay = 100;
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
  //무한스크롤
  //useIntersection에서 unobserve되는지 확인
  const onIntersect: IntersectionObserverCallback = async (entry) => {
    if (
      entry[0].isIntersecting &&
      !isLastElem.current &&
      !isInitialLoading &&
      preventRef.current
    ) {
      preventRef.current = false;
      await getChatMessages(messages[0].messageId);
      preventRef.current = true;
    }
  };
  //현재 대상 및 option을 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1,
    onIntersect,
  });

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 실행
    connectChat();
    //채팅 불러오기
    getChatMessages(0);
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
  // messages 새로 업데이트 됐을 때 11 index에 해당하는 message top으로
  useEffect(() => {
    if (!newMessageRef.current) {
      topRef.current?.scrollIntoView({ block: 'start' });
    } else {
      lastRef.current?.scrollIntoView({
        block: 'start', // 페이지 하단으로 스크롤하도록 지정합니다.
      });
    }
  }, [messages]);

  const handleSubmit = () => {
    if (input.trim() !== '') {
      sendMessage();
      setInput('');
    }
    if (inputRef.current) inputRef.current.style.height = '2.4rem';
    if (sectionPaddingRef.current) sectionPaddingRef.current = 2.4;
  };
  if (isInitialLoading) {
    return (
      <>
        <HeaderWrapper border={false}>
          <BackIcon
            onClick={() => {
              navigate('/consult');
            }}
          />
          <Heading color={Grey1}>채팅상대이름</Heading>
        </HeaderWrapper>
      </>
    );
  } else {
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
        <Space height="5.2rem" />
        <SectionWrapper inputHeight={sectionPaddingRef.current}>
          {!isLastElem.current ? (
            <div
              ref={setTarget}
              style={{
                width: '100%',
                backgroundColor: 'green',
              }}
            ></div>
          ) : (
            <div
              style={{
                width: '100%',
                backgroundColor: 'pink',
              }}
            ></div>
          )}
          {messages.map((value, index) => {
            let isLastIndex = index === messages.length - 1;
            if (value.isCustomer) {
              return (
                <div
                  key={value.messageId}
                  className="my-box-container"
                  ref={isLastIndex ? lastRef : index === 11 ? topRef : null}
                >
                  <CustomerChatBox>
                    <Body2 color={Grey1}>
                      {formattedMessage(value.content)}
                    </Body2>
                    <div>{index}</div>
                  </CustomerChatBox>
                </div>
              );
            } else {
              return (
                <div
                  key={value.messageId}
                  className="opponent-box-container"
                  ref={isLastIndex ? lastRef : index === 11 ? topRef : null}
                >
                  <CounselorChatBox>
                    <Body2 color={Grey1}>
                      {formattedMessage(value.content)}
                    </Body2>
                    <div>{index}</div>
                  </CounselorChatBox>
                </div>
              );
            }
          })}
        </SectionWrapper>

        <FooterWrapper>
          <div className="message-form">
            <ChatTextareaWrapper>
              <ChatTextarea
                rows={1}
                ref={inputRef}
                placeholder="메세지"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  //textarea 높이 동적할당
                  e.target.style.height = '2.4rem';
                  e.target.style.height = e.target.scrollHeight / 10 + 'rem';
                  sectionPaddingRef.current = e.target.scrollHeight / 10;
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
            </ChatTextareaWrapper>
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
  }
};
const Wrapper = styled.main`
  height: 100%;
  width: 100%;
  background-color: ${Grey6};
`;
const HeaderWrapper = styled.div<{ border?: boolean }>`
  height: 5.2rem;
  background-color: ${White};
  position: relative;
  ${(props) =>
    props.border || props.border === undefined
      ? `border-bottom: 1px solid ${Grey6};`
      : null}
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  @media (max-width: 767px) {
    width: 100vw;
  }
  top: 0;
  z-index: 999;
`;
// height: calc(100% - 7.9rem);
const SectionWrapper = styled.section<{ inputHeight: number }>`
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => `${props.inputHeight + 5.5}rem`};
  max-height: calc(100% - 13.1rem);
  overflow-y: scroll;
  .my-box-container {
    display: flex;
    justify-content: flex-end;
    padding: 0.4rem 2rem 0.4rem 0;
  }
  .opponent-box-container {
    display: flex;
    justify-content: flex-start;
    padding: 0.4rem 0 0.4rem 2rem;
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
  word-wrap: break-word;
`;
const CounselorChatBox = styled.div`
  background-color: ${White};
  border-radius: 0 1rem 1rem 1rem;
  padding: 1.2rem;
  box-sizing: border-box;
  max-width: 27.5rem;
  word-wrap: break-word;
`;
const ChatTextareaWrapper = styled.div`
  padding: 1.2rem 0.8rem 1.2rem 1.2rem;
  background-color: ${Grey6};
  width: 78.66%;
  border-radius: 1.2rem;
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
  line-height: 150%;
  color: ${Grey1};
  &::placeholder {
    color: ${Grey3};
  }
  padding: 0;
  max-height: 7.2rem;
  width: 100%;
  background-color: ${Grey6};
  box-sizing: border-box;
`;
