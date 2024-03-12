import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Body2, Caption1, Caption2, Heading } from 'styles/font';
import { ChatMessage } from 'utils/type';
import styled from 'styled-components';
import {
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
import { getChatMessagesCounselors, getChatsCounselors } from 'api/get';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { Space } from 'components/Common/Space';

import {
  calculateTimeAfterFiveMinutes,
  convertAMPMToString,
  convertAMPMToStringYear,
  convertMessageTime,
} from 'utils/convertDate';
import { ChatStartRequestModal } from 'components/Seller/SellerChatTemp/ChatStartRequestModal';
import { ChatAlertModal } from 'components/Seller/SellerChatTemp/ChatAlertModal';
import { BackDrop } from 'components/Common/BackDrop';
import { ChatReportModal } from 'components/Seller/SellerChatTemp/ChatReportModal';
import { useStompContext } from 'contexts/StompContext';
export const SellerChatTemp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const chatId = id || '';

  //states
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>(''); //입력
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [inputValid, setInputValid] = useState<boolean>(false); //입력 있을 시 버튼 색상
  const [time, setTime] = useState<string>('');
  const [chatStatus, setChatStatus] = useState<string>('');
  const [opponentName, setOpponentName] = useState<string>('');
  const [alertModalActive, setAlertModalActive] = useState<boolean>(false);
  const [alertModalTime, setAlertModalTime] = useState<string>('');
  //useRefs
  const inputRef = useRef<HTMLTextAreaElement>(null); //input ref 높이 초기화를 위함
  const sectionPaddingRef = useRef<number>(2.4); // section 추가 padding bottom

  const { stompClient } = useStompContext();
  const preventRef = useRef(false); // observer 중복방지, 첫 mount 시 message 가져온 후 true로 전환
  const preventScrollRef = useRef(true); // message 변경 시 모바일에서 오버 스크롤로 인해 여러번 불리는 오류 발생, scrollintoview 완료 전까지 observe 막기
  const isLastElem = useRef(false); //마지막 채팅인지 확인
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
      const res: any = await getChatMessagesCounselors(chatId, {
        params,
      });
      if (res.status === 200) {
        // console.log(res.data);
        if (res.data.length !== 0) {
          //새 메세지 도착이 아닌 이전 메시지 fetch
          newMessageRef.current = false;
          //fetch해온 message 길이
          topMsgIndexRef.current = res.data.length;
          //메세지 중 start request가 있으면 setTime
          const startRequestIndex = res.data.findIndex(
            (item: any) => item.time !== null,
          );
          //api 수정되면 time 수정되는 로직 삭제
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
          isLastElem.current = true;
        }
      } else if (res.response.status === 404) {
        alert('접근 권한이 없거나 존재하지 않는 채팅입니다.');
        navigate('/minder/consult');
      }
    } catch (e) {
      alert(e);
    } finally {
      if (firstMessageId === 0) {
        setIsInitialLoading(false);
      }
    }
  };

  const getCounselorChatStatus = async () => {
    try {
      const res: any = await getChatsCounselors(chatId);
      if (res.status === 200) {
        setOpponentName(res.data.opponentNickname);
        setChatStatus(res.data.status);
      } else if (res.response.status === 404) {
        alert('존재하지 않는 채팅 아이디입니다.');
      }
    } catch (e) {
      alert(e);
    }
  };
  const connectChat = () => {
    if (stompClient.current) {
      // 구독
      stompClient.current.subscribe(
        '/queue/chattings/counselors/' + chatId,
        function (statusUpdate) {
          console.log('Status Update: ', statusUpdate.body);
          const arrivedMessage = JSON.parse(statusUpdate.body);

          if (
            arrivedMessage.chatWebsocketStatus ===
            'COUNSELOR_CHAT_START_REQUEST'
          ) {
            //구매자와 달리 현재 채팅 status를 업데이트하는 방향으로 구현해야할듯
            //새 메세지 도착으로 분류
            setTime('10:00');
            setChatStatus('상담 시작 요청');
          } else if (
            arrivedMessage.chatWebsocketStatus ===
            'CUSTOMER_CHAT_START_RESPONSE'
          ) {
            setChatStatus('상담 중');
            setAlertModalActive(true);
            setAlertModalTime(arrivedMessage.localDateTime);
            //setmodal 해야함
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                chatMessageStatus: 'START',
                customerNickname: arrivedMessage.customerNickname,
                counselorNickname: arrivedMessage.counselorNickname,
                messageId: 0,
                content: `상담이 시작되었어요.\n${arrivedMessage.localDateTime}`,
                sendTime: arrivedMessage.localDateTime,
                isCustomer: true,
                time: null,
              },
            ]);
          } else if (
            arrivedMessage.chatWebsocketStatus ===
            'CUSTOMER_CHAT_FINISH_REQUEST'
          ) {
            setChatStatus('상담 종료');
            setAlertModalActive(true);
            setAlertModalTime(arrivedMessage.localDateTime);
          }
        },
      );
      //채팅 시작, 채팅 5분 남았을 때, 채팅 끝났을 때 알림
      stompClient.current.subscribe(
        '/queue/chattings/status/counselors/' + chatId,
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
          } else if (
            arrivedMessage.chatWebsocketStatus === 'CHAT_START_REQUEST_CANCEL'
          ) {
            setChatStatus('상담 대기');
          } else if (arrivedMessage.chatWebsocketStatus === 'CHAT_TIME_OVER') {
            setChatStatus('시간 종료');
          }
        },
      );
      //에러 핸들링
      stompClient.current.subscribe(
        '/queue/chattings/exception/counselors/' + chatId,
        function (error) {
          console.log('Error: ', error.body);
        },
      );
      stompClient.current.subscribe(
        '/queue/chatMessages/counselors/' + chatId,
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
        '/app/api/v1/chatMessages/counselors/' + chatId,
        {},
        JSON.stringify({ content: input }),
      );
    }
  };

  const sendChatStartRequest = () => {
    if (stompClient.current) {
      stompClient.current.send(
        '/app/api/v1/chat/counselors/' + chatId,
        {},
        JSON.stringify({ chatWebsocketStatus: 'COUNSELOR_CHAT_START_REQUEST' }),
      );
    }
  };

  const sendChatFinishRequest = () => {
    if (stompClient.current) {
      stompClient.current.send(
        '/app/api/v1/chat/counselors/' + chatId,
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
  const onIntersect: IntersectionObserverCallback = async (entry) => {
    if (
      entry[0].isIntersecting &&
      !isLastElem.current &&
      !isInitialLoading &&
      preventRef.current
      // &&preventScrollRef.current
    ) {
      preventRef.current = false;
      // preventScrollRef.current = false;
      // console.log(`관측: ${messages[0].messageId}`);
      await getChatMessages(messages[0].messageId);
      // console.log('fetch 완료');
      // setTimeout(() => {
      //   preventRef.current = true;
      // }, 100);
      // console.log(`관측: ${messages[0].messageId}`);
      preventRef.current = true;
    }
  };
  //현재 대상 및 option을 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
    onIntersect,
  });

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 실행
    connectChat();
    //채팅 불러오기
    getChatMessages(0);
    //채팅 status, 상대이름 가져오기
    getCounselorChatStatus();
    //관측 가능
    preventRef.current = true;
    // 언마운트 시에 소켓 연결 해제
    return () => {
      if (stompClient.current) {
        // console.log('연결해제');
        stompClient.current.disconnect();
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
  // messages 새로 업데이트 됐을 때 11 index에 해당하는 message top으로
  useLayoutEffect(() => {
    if (!newMessageRef.current) {
      topRef.current?.scrollIntoView({ block: 'start' });
    } else {
      lastRef.current?.scrollIntoView({
        block: 'start', // 페이지 하단으로 스크롤하도록 지정합니다.
      });
    }
    // console.log('스크롤 완료');
    //scrollIntoView 완료 후 다시 관측가능
    // preventScrollRef.current = true;
  }, [messages]);
  //상담 start request 관련 처리
  useEffect(() => {
    const timer = setInterval(() => {
      const [minutes, seconds] = time.split(':').map(parseFloat);
      let totalSeconds = minutes * 60 + seconds;

      if (totalSeconds <= 0) {
        if (chatStatus === '상담 시작 요청') {
          setChatStatus('상담 대기');
        }
        clearInterval(timer);
      } else {
        totalSeconds--;
        const newMinutes = Math.floor(totalSeconds / 60);
        const newSeconds = totalSeconds % 60;
        setTime(
          `${String(newMinutes).padStart(2, '0')} : ${String(
            newSeconds,
          ).padStart(2, '0')}`,
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  if (isInitialLoading) {
    return (
      <>
        <HeaderWrapper border={false}>
          <BackIcon
            onClick={() => {
              navigate('/minder/consult');
            }}
          />
          <Heading color={Grey1}></Heading>
        </HeaderWrapper>
      </>
    );
  } else {
    return (
      <Wrapper onTouchStart={handleTouchStart}>
        <HeaderWrapper border={false}>
          <BackIcon
            onClick={() => {
              navigate('/minder/consult');
            }}
          />
          <Heading color={Grey1}>{opponentName}</Heading>
        </HeaderWrapper>
        <Space width="100%" height="5.2rem" />
        <SectionWrapper
          inputHeight={sectionPaddingRef.current}
          isModal={
            chatStatus === '상담 대기' || chatStatus === '상담 시작 요청'
          }
        >
          {!isLastElem.current ? (
            <div
              ref={setTarget}
              style={{
                width: '100%',
                height: '0.1rem',
              }}
            ></div>
          ) : (
            <div
              style={{
                width: '100%',
                height: '0.1rem',
              }}
            ></div>
          )}
          {messages.map((value, index) => {
            let isLastIndex = index === messages.length - 1;
            //my(minder)
            if (value.isCustomer === false) {
              let isTimestampCustomer = true;
              const length = messages.length;
              if (length !== 0 && index !== length - 1) {
                //다음메세지와 시간이 같으면 false
                if (
                  messages[index + 1].chatMessageStatus === 'MESSAGE' &&
                  !messages[index + 1].isCustomer &&
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
                </div>
              );
            } else if (value.isCustomer) {
              //oppo(share)
              let isTimestampCounselor = true;
              const length = messages.length;
              if (length !== 0 && index !== length - 1) {
                //다음메세지와 시간이 같으면 false
                if (
                  messages[index + 1].chatMessageStatus === 'MESSAGE' &&
                  messages[index + 1].isCustomer &&
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
                  {value.chatMessageStatus === 'START' && (
                    <AlertChatBox style={{ paddingRight: '2rem' }}>
                      <Caption1 color={Grey3}>
                        {value.content.split('\n')[0]}
                      </Caption1>
                      <Caption2 color={Grey4}>
                        {convertAMPMToStringYear(value.content.split('\n')[1])}
                      </Caption2>
                    </AlertChatBox>
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
                    <AlertChatBox style={{ paddingRight: '2rem' }}>
                      <Caption1 color={Grey3}>
                        {value.content.split('\n')[0]}
                      </Caption1>
                      <Caption2 color={Grey4}>
                        {convertAMPMToString(value.content.split('\n')[1])} 종료
                      </Caption2>
                    </AlertChatBox>
                  )}
                </div>
              );
            }
          })}
        </SectionWrapper>
        {chatStatus !== '상담 종료' ? (
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
                    if (
                      !/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
                    ) {
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
        ) : (
          <ChatReportModal />
        )}
        {(chatStatus === '상담 대기' || chatStatus === '상담 시작 요청') && (
          <ChatStartRequestModal
            inputHeight={sectionPaddingRef.current}
            chatStatus={chatStatus}
            remainTime={time}
            onClick={sendChatStartRequest}
          />
        )}
        {chatStatus === '시간 종료' && (
          <ChatStartRequestModal
            inputHeight={sectionPaddingRef.current}
            chatStatus={chatStatus}
            remainTime={time}
            onClick={sendChatFinishRequest}
          />
        )}
        {alertModalActive ? (
          <BackDrop
            onClick={() => {
              setAlertModalActive(false);
            }}
          />
        ) : null}
        {alertModalActive && (
          <ChatAlertModal
            setAlertModalActive={setAlertModalActive}
            opponentName={opponentName}
            chatStatus={chatStatus}
            alertModalTime={alertModalTime}
          />
        )}
      </Wrapper>
    );
  }
};
const Wrapper = styled.main`
  height: 100%;
  width: 100%;
  position: relative;
`;
const HeaderWrapper = styled.div<{ border?: boolean }>`
  height: 5.2rem;
  background-color: ${White};
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
//모달 있을 경우 추가 padding
const SectionWrapper = styled.section<{
  inputHeight: number;
  isModal: boolean;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: ${(props) =>
    props.isModal
      ? `${props.inputHeight + 20.4}rem`
      : `${props.inputHeight + 4.3}rem`};
  max-height: calc(
    100% - 5.2rem -
      ${(props) =>
        props.isModal
          ? `${props.inputHeight + 20.4}rem`
          : `${props.inputHeight + 4.3}rem`}
  );

  overflow-y: auto;
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
  z-index: 999;
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

//my box에서 padding 2rem 줘서 align을 위해 padding 추가
const AlertChatBox = styled.div`
  width: 100%;
  padding: 0.4rem 0 0.4rem 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChatTextareaWrapper = styled.div`
  padding: 1.2rem 0.8rem 1.2rem 1.2rem;
  background-color: ${Grey6};
  width: 78.66%;
  border-radius: 1.2rem;
  box-sizing: border-box;
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
