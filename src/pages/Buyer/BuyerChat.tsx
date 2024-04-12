import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Body2,
  Body3,
  Button1,
  Button2,
  Caption1,
  Caption2,
  Heading,
} from 'styles/font';
import { ChatCounselorInfo, ChatMessage } from 'utils/type';
import styled from 'styled-components';
import {
  Black,
  Green,
  Grey1,
  Grey3,
  Grey4,
  Grey6,
  LightGreenChat,
  White,
} from 'styles/color';
import { BackIcon } from 'components/Buyer/Common/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as Search } from 'assets/icons/chat-send-button.svg';
import { formattedMessage } from 'utils/formattedMessage';
import { getChatMessagesCustomers, getCounselorsChats } from 'api/get';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { Space } from 'components/Common/Space';
import { Button } from 'components/Common/Button';
import {
  calculateTimeAfterFiveMinutes,
  convertAMPMToString,
  convertAMPMToStringYear,
  convertMessageTime,
} from 'utils/convertDate';

import { ChatCounselorInfoBox } from 'components/Buyer/BuyerChat/ChatCounselorInfoBox';
import { useStompContext } from 'contexts/StompContext';
import useChatRequestTime from 'hooks/Chat/useChatRequestTime';

export const BuyerChat = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const chatId = id || '';

  const { time, setTime } = useChatRequestTime();

  //states
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>(''); //입력
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [inputValid, setInputValid] = useState<boolean>(false); //입력 있을 시 버튼 색상

  const [counselorInfo, setCounselorInfo] = useState<ChatCounselorInfo | null>(
    null,
  );
  const [isLastElem, setIsLastElem] = useState<boolean>(false);

  //useRefs
  const inputRef = useRef<HTMLTextAreaElement>(null); //input ref 높이 초기화를 위함
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const sectionPaddingRef = useRef<number>(2.4); // section 추가 padding bottom

  const { stompClient } = useStompContext();
  const preventRef = useRef(false); // observer 중복방지, 첫 mount 시 message 가져온 후 true로 전환
  const preventScrollRef = useRef(false); // message 변경 시 모바일에서 오버 스크롤로 인해 여러번 불리는 오류 발생, scrollintoview 완료 전까지 observe 막기
  // const isLastElem = useRef(false); //마지막 채팅인지 확인
  const lastRef = useRef<HTMLDivElement>(null); // 마지막 채팅 box ref
  const newMessageRef = useRef(true); // 새로운 메세지인지 이전 메세지 fetch인지
  const topRef = useRef<HTMLDivElement>(null); //top에 와야하는 box
  const topMsgIndexRef = useRef<number>(0); //top index ref, fetch해온 배열이 꼭 11이 아닐 수 있기 때문에 fetch 시 변경

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
          //fetch해온 message 길이
          topMsgIndexRef.current = res.data.length;
          //메세지 중 start request가 있으면 setTime
          const startRequestIndex = res.data.findIndex(
            (item: any) => item.time !== null,
          );
          if (startRequestIndex !== -1)
            setTime(res.data[startRequestIndex].time);

          if (firstMessageId === 0) {
            //첫 fetch 시에는 처음 채팅방을 들어왔을 때니까 맨 밑으로 scroll
            newMessageRef.current = true;
            setMessages(res.data.reverse());
          } else {
            const reversedMessages = res.data.reverse();
            const updatedMessages = [...reversedMessages, ...messages];
            setMessages(updatedMessages);
          }
        } else {
          setIsLastElem(true);
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
  const getCounselorInfo = async () => {
    try {
      const params = {
        isCustomer: true,
      };
      //마지막에 닿았을 때, 상담사 info 가져옴
      const res: any = await getCounselorsChats(chatId, { params });
      if (res.status === 200) {
        setCounselorInfo(res.data);
      } else if (res.response.status === 404) {
        alert(res.response.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };
  const connectChat = () => {
    //   if (isConnected.current) {
    //     stompClient.current.disconnect();
    //     isConnected.current = false;
    //   }

    if (stompClient.current) {
      // 구독
      stompClient.current.subscribe(
        '/queue/chattings/customers/' + chatId,
        function (statusUpdate) {
          console.log('Status Update: ', statusUpdate.body);
          const arrivedMessage = JSON.parse(statusUpdate.body);

          if (
            arrivedMessage.chatWebsocketStatus ===
            'COUNSELOR_CHAT_START_REQUEST'
          ) {
            //새 메세지 도착으로 분류
            newMessageRef.current = true;
            setTime('10:00');
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                chatMessageStatus: 'SEND_REQUEST',
                customerNickname: arrivedMessage.customerNickname,
                counselorNickname: arrivedMessage.counselorNickname,
                messageId: 0,
                content: `${arrivedMessage.customerNickname}님, 지금 바로 상담을 시작할까요?`,
                sendTime: '',
                isCustomer: false,
                time: '',
              },
            ]);
          } else if (
            arrivedMessage.chatWebsocketStatus ===
            'CUSTOMER_CHAT_START_RESPONSE'
          ) {
            setMessages((prevMessages) => {
              const updatedMessages = prevMessages.map((value) => {
                // chatMessageStatus가 "SEND_REQUEST"인 경우에만 처리합니다.
                if (value.chatMessageStatus === 'SEND_REQUEST') {
                  return {
                    ...value,
                    chatMessageStatus: 'START',
                    content: `상담이 시작되었어요.\n${arrivedMessage.localDateTime}`,
                    isCustomer: true,
                  };
                }
                return value;
              });
              return updatedMessages;
            });
          } else if (
            arrivedMessage.chatWebsocketStatus ===
            'CUSTOMER_CHAT_FINISH_REQUEST'
          ) {
            //새 메세지 도착으로 분류
            newMessageRef.current = true;
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                chatMessageStatus: 'FINISH',
                customerNickname: arrivedMessage.customerNickname,
                counselorNickname: arrivedMessage.counselorNickname,
                messageId: 0,
                content: `${arrivedMessage.counselorNickname}님과의 상담이 만족스러우셨나요? 후기를 남겨주시면 더 나은 서비스를 위해 큰 도움이 되어요.`,
                sendTime: arrivedMessage.localDateTime,
                isCustomer: true,
                time: null,
              },
            ]);
          }
        },
      );
      //채팅 시작, 채팅 5분 남았을 때, 채팅 끝났을 때 알림
      stompClient.current.subscribe(
        '/queue/chattings/status/customers/' + chatId,
        function (statusAutoUpdate) {
          console.log('Status Auto Update: ', statusAutoUpdate.body);
          const arrivedMessage = JSON.parse(statusAutoUpdate.body);
          //새 메세지 도착으로 분류
          newMessageRef.current = true;
          if (arrivedMessage.chatWebsocketStatus === 'CHAT_LEFT_FIVE_MINUTE') {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                chatMessageStatus: 'FIVE_MINUTE_LEFT',
                customerNickname: '',
                counselorNickname: '',
                messageId: 0,
                content: `상담 종료까지 5분 남았어요.\n${calculateTimeAfterFiveMinutes(
                  arrivedMessage.localDateTime,
                )}`,
                sendTime: arrivedMessage.localDateTime,
                isCustomer: null,
                time: '',
              },
            ]);
          } else if (arrivedMessage.chatWebsocketStatus === 'CHAT_TIME_OVER') {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                chatMessageStatus: 'TIME_OVER',
                customerNickname: '',
                counselorNickname: '',
                messageId: 0,
                content:
                  '상담 시간이 모두 마무리 되었어요.\n상담이 정상적으로 종료되었다면 상담 종료 버튼을 눌러 주세요.\n*신고접수가 되지 않은 상담 건은 7일 후 자동으로 거래가 확정됩니다.',
                sendTime: arrivedMessage.localDateTime,
                isCustomer: null,
                time: null,
              },
            ]);
          }
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
          //새 메세지 도착으로 분류
          newMessageRef.current = true;
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              chatMessageStatus: 'MESSAGE',
              customerNickname: arrivedMessage.senderName,
              counselorNickname: '',
              messageId: 0,
              content: arrivedMessage.content,
              sendTime: arrivedMessage.sendTime,
              isCustomer: arrivedMessage.isCustomer,
              time: arrivedMessage.time,
            },
          ]);
        },
      );
    }
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

  const sendChatStartResponse = () => {
    if (stompClient.current) {
      stompClient.current.send(
        '/app/api/v1/chat/customers/' + chatId,
        {},
        JSON.stringify({ chatWebsocketStatus: 'CUSTOMER_CHAT_START_RESPONSE' }),
      );
    }
  };

  const sentExitResponse = () => {
    if (stompClient.current) {
      stompClient.current.send('app/api/v1/chat/customers/exit/' + chatId, {});
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

  const handleSubmit = () => {
    if (input.trim() !== '') {
      sendMessage();
      setInput('');
    }
    if (inputRef.current && hiddenInputRef.current) {
      // hiddenInput에 focus를 옮기고, 다시 input으로 옮기는 방식을 사용하여
      // ios 환경에서 한글(받침없는 글자) 입력시 buffer가 남아있는 문제를 해결했음
      hiddenInputRef.current.focus();
      inputRef.current.focus();
    }
    if (inputRef.current) inputRef.current.style.height = '2.4rem';
    if (sectionPaddingRef.current) sectionPaddingRef.current = 2.4;
  };

  //모바일에서 터치가 일어나면 키보드 숨김
  const handleTouchStart = (e: any) => {
    if (!e.target.closest('footer')) {
      // 터치 이벤트가 textarea 바깥에서 발생하면 키보드를 숨깁니다.
      inputRef.current?.blur();
    }
  };

  //무한스크롤 관련 함수
  //useIntersection에서 unobserve되는지 확인
  const onIntersect: IntersectionObserverCallback = async (entry, observer) => {
    if (
      entry[0].isIntersecting &&
      !isLastElem &&
      !isInitialLoading &&
      preventRef.current &&
      preventScrollRef.current
    ) {
      preventRef.current = false;
      preventScrollRef.current = false;
      await getChatMessages(messages[0].messageId);
      preventRef.current = true;
    }
  };
  //현재 대상 및 option을 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect,
  });

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 실행
    connectChat();
    //채팅 불러오기
    getChatMessages(0);
    //
    getCounselorInfo();
    //관측 가능
    preventRef.current = true;
    return () => {
      if (stompClient.current) {
        stompClient.current.unsubscribe('/queue/chattings/customers/' + chatId);
        stompClient.current.unsubscribe(
          '/queue/chattings/status/customers/' + chatId,
        );
        stompClient.current.unsubscribe(
          '/queue/chattings/exception/customers/' + chatId,
        );
        stompClient.current.unsubscribe(
          '/queue/chatMessages/customers/' + chatId,
        );
        sentExitResponse();
      }
    };
  }, []);

  //useEffects
  //보내기 버튼 색상처리
  useEffect(() => {
    if (input.trim() !== '') {
      setInputValid(true);
    } else {
      setInputValid(false);
    }
  }, [input]);
  // // messages 새로 업데이트 됐을 때 11 index에 해당하는 message top으로
  useLayoutEffect(() => {
    //scrollIntoView 완료하기까지 관측 X
    preventScrollRef.current = false;
    if (!newMessageRef.current) {
      topRef.current?.scrollIntoView({ block: 'start' });
    } else {
      lastRef.current?.scrollIntoView({
        block: 'start', // 페이지 하단으로 스크롤하도록 지정합니다.
      });
    }
    // console.log('스크롤 완료');
    //scrollIntoView 완료 후 다시 관측가능
    preventScrollRef.current = true;
  }, [messages]);

  return (
    <Wrapper onTouchStart={handleTouchStart}>
      <HeaderWrapper border={false}>
        <BackIcon
          onClick={() => {
            navigate(-1);
          }}
        />
        <Heading color={Grey1}>{counselorInfo?.nickname}</Heading>
      </HeaderWrapper>
      <Space width="100%" height="5.2rem" />
      <SectionWrapper
        inputHeight={sectionPaddingRef.current}
        className="chat-section"
      >
        <div className="counselor-info-container">
          {isLastElem && counselorInfo !== null && (
            <ChatCounselorInfoBox info={counselorInfo} />
          )}
        </div>
        {!isLastElem ? (
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
          //iscustomer가 true인거 customer message, 시작
          //finish는 isCustomer true이지만 보이는건 상대 채팅임
          if (value.isCustomer && value.chatMessageStatus !== 'FINISH') {
            let isTimestampCustomer = true;
            const length = messages.length;
            if (length !== 0 && index !== length - 1) {
              //다음메세지와 시간이 같으면 false
              if (
                messages[index + 1].chatMessageStatus === 'MESSAGE' &&
                messages[index + 1].isCustomer &&
                messages[index + 1].sendTime === value.sendTime
              )
                isTimestampCustomer = false;
            }

            return (
              <div
                key={value.messageId}
                className="my-box-container"
                ref={
                  isLastIndex
                    ? lastRef
                    : index === topMsgIndexRef.current
                    ? topRef
                    : null
                }
              >
                {value.chatMessageStatus === 'MESSAGE' && (
                  <>
                    {isTimestampCustomer ? (
                      <Caption2 color={Grey3} margin="0 0.8rem 0 0">
                        {convertMessageTime(value.sendTime)}
                      </Caption2>
                    ) : null}
                    <CustomerChatBox>
                      <Body2 color={Grey1}>
                        {formattedMessage(value.content)}
                      </Body2>
                    </CustomerChatBox>
                  </>
                )}
                {value.chatMessageStatus === 'START' && (
                  <AlertCustomerChatBox>
                    <Caption1 color={Grey3}>
                      {value.content.split('\n')[0]}
                    </Caption1>
                    <Caption2 color={Grey4}>
                      {convertAMPMToStringYear(value.content.split('\n')[1])}
                    </Caption2>
                  </AlertCustomerChatBox>
                )}
              </div>
            );
          } else if (
            // isCustomer false 거나, FINISH(true인데 상대편에서 온걸로 처리)
            value.isCustomer === false ||
            value.chatMessageStatus === 'FINISH'
          ) {
            let isTimestampCounselor = true;
            const length = messages.length;
            if (length !== 0 && index !== length - 1) {
              //다음메세지와 시간이 같으면 false
              if (
                messages[index + 1].chatMessageStatus === 'MESSAGE' &&
                !messages[index + 1].isCustomer &&
                messages[index + 1].sendTime === value.sendTime
              )
                isTimestampCounselor = false;
            }
            return (
              <div
                key={value.messageId}
                className="opponent-box-container"
                ref={
                  isLastIndex
                    ? lastRef
                    : index === topMsgIndexRef.current
                    ? topRef
                    : null
                }
              >
                {value.chatMessageStatus === 'MESSAGE' && (
                  <>
                    <CounselorChatBox>
                      <Body2 color={Grey1}>
                        {formattedMessage(value.content)}
                      </Body2>
                    </CounselorChatBox>
                    {isTimestampCounselor ? (
                      <Caption2 color={Grey3} margin="0 0 0 0.8rem">
                        {convertMessageTime(value.sendTime)}
                      </Caption2>
                    ) : null}
                  </>
                )}
                {value.chatMessageStatus === 'SEND_REQUEST' && (
                  <CounselorStartRequestBox>
                    <div style={{ paddingBottom: '1.6rem' }}>
                      <Body3 color={Grey1}>
                        {formattedMessage(value.content)}
                      </Body3>
                      <Body3 color={Grey3}>
                        * 상담 시작하기를 누르시면 상담이 시작되어요. 상담
                        시간은 30분입니다.
                      </Body3>
                    </div>
                    <StartButton onClick={sendChatStartResponse}>
                      <Button1 color={White}>상담 시작하기</Button1>
                      <Button2 color={White}>{time}</Button2>
                    </StartButton>
                  </CounselorStartRequestBox>
                )}

                {value.chatMessageStatus === 'FINISH' && (
                  <EndChatBox>
                    <div style={{ paddingBottom: '1.6rem' }}>
                      <Body3 color={Black}>
                        {value.counselorNickname + value.content}
                      </Body3>
                    </div>
                    <Button
                      text="상담 후기 남기기"
                      width="100%"
                      height="5.2rem"
                      onClick={() => {
                        navigate('/reviewManage');
                      }}
                    />
                  </EndChatBox>
                )}
              </div>
            );
          } else if (value.isCustomer === null) {
            return (
              <div
                key={value.messageId}
                className="opponent-box-container"
                ref={
                  isLastIndex
                    ? lastRef
                    : index === topMsgIndexRef.current
                    ? topRef
                    : null
                }
              >
                {value.chatMessageStatus === 'FIVE_MINUTE_LEFT' && (
                  <AlertCounselorChatBox>
                    <Caption1 color={Grey3}>
                      {value.content.split('\n')[0]}
                    </Caption1>
                    <Caption2 color={Grey4}>
                      {convertAMPMToString(value.content.split('\n')[1])} 종료
                    </Caption2>
                  </AlertCounselorChatBox>
                )}
                {value.chatMessageStatus === 'TIME_OVER' && (
                  <EndChatBox>
                    <div style={{ paddingBottom: '1.6rem' }}>
                      <Body3 color={Grey1}>
                        {value.content.split('\n')[0]}
                      </Body3>
                      <Body3 color={Grey1}>
                        {value.content.split('\n')[1]}
                      </Body3>
                      <Body3 color={Grey3}>
                        {value.content.split('\n')[2]}
                      </Body3>
                    </div>
                    <Button
                      text="상담 종료하기"
                      width="100%"
                      height="5.2rem"
                      onClick={sendChatFinishRequest}
                    />
                  </EndChatBox>
                )}
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
                if (e.target.scrollHeight / 10 <= 7.3) {
                  sectionPaddingRef.current = e.target.scrollHeight / 10;
                }
              }}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing) return; //key 조합 감지
                // 모바일 환경이 아닐 때에는 enter로 전송, shift + enter로 줄바꿈
                if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                  if (e.key === 'Enter' && e.shiftKey) return;
                  else if (e.key === 'Enter') {
                    handleSubmit();
                    e.preventDefault();
                  }
                }
              }}
            />
            <input ref={hiddenInputRef} className="hidden-input" />
          </ChatTextareaWrapper>
          <button style={{ margin: '0', padding: '0' }} onClick={handleSubmit}>
            <SearchIcon InputValid={inputValid} />
          </button>
        </div>
      </FooterWrapper>
    </Wrapper>
  );
  // }
};
const Wrapper = styled.main`
  height: 100%;
  width: 100%;
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
//max-height: calc(100% - 13.1rem);
//height: calc(100% - 13.1rem);

const SectionWrapper = styled.section<{ inputHeight: number }>`
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => `${props.inputHeight + 4.3}rem`};
  max-height: calc(
    100% - 5.2rem - ${(props) => `${props.inputHeight + 4.3}rem`}
  );
  overflow-y: auto;
  .counselor-info-container {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .my-box-container {
    display: flex;
    justify-content: flex-end;
    align-items: end;
    padding: 0.4rem 2rem 0.4rem 0;
  }
  .opponent-box-container {
    display: flex;
    justify-content: flex-start;
    align-items: end;
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
const CounselorStartRequestBox = styled.div`
  background-color: ${White};
  border-radius: 0 1rem 1rem 1rem;
  padding: 1.6rem;
  box-sizing: border-box;
  max-width: 23.9rem;
`;
const AlertCustomerChatBox = styled.div`
  width: 100%;
  padding: 0.4rem 0rem 0.4rem 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
//opponent box에서 padding 2rem 줘서 align을 위해 padding 추가
const AlertCounselorChatBox = styled.div`
  width: 100%;
  padding: 0.4rem 2rem 0.4rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const EndChatBox = styled.div`
  background-color: ${White};
  border-radius: 0 1rem 1rem 1rem;
  padding: 1.6rem;
  box-sizing: border-box;
  max-width: 23.9rem;
`;
const StartButton = styled.button`
  background-color: ${Green};
  width: 100%;
  height: 5.2rem;
  border-radius: 0.8rem;
  cursor: pointer;
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
`;
const ChatTextareaWrapper = styled.div`
  padding: 1.2rem 0.8rem 1.2rem 1.2rem;
  background-color: ${Grey6};
  width: 78.66%;
  border-radius: 1.2rem;
  box-sizing: border-box;
  position: relative;
  .hidden-input {
    position: absolute;
    width: 0;
    height: 0;
    background-color: transparent;
    pointer-events: none;
  }
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
  margin: 0;
  max-height: 7.2rem;
  width: 100%;
  background-color: ${Grey6};
  box-sizing: border-box;
`;
