import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Heading } from 'styles/font';
import { ChatMessage } from 'utils/type';
import styled from 'styled-components';
import { Grey1, Grey6, White } from 'styles/color';
import { BackIcon } from 'components/Buyer/Common/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { getChatMessagesCounselors, getChatsCounselors } from 'api/get';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { Space } from 'components/Common/Space';

import { calculateTimeAfterFiveMinutes } from 'utils/convertDate';
import { ChatStartRequestModal } from 'components/Seller/SellerChat/ChatStartRequestModal';
import { ChatAlertModal } from 'components/Seller/SellerChat/ChatAlertModal';
import { BackDrop } from 'components/Common/BackDrop';
import { ChatReportModal } from 'components/Seller/SellerChat/ChatReportModal';
import { useStompContext } from 'contexts/StompContext';
import useChatRequestTime from 'hooks/Chat/useChatRequestTime';
import SellerChatFooter from 'components/Seller/SellerChat/SellerChatFooter';
import SellerChatSection from 'components/Seller/SellerChat/SellerChatSection';
import { CHAT_START_REQUEST_TIME } from 'utils/constant';

//
//
//

const SellerChat = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const chatId = id || '';

  const { time, setTime } = useChatRequestTime();

  //states
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>(''); //입력
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isTyping, setIsTyping] = useState<boolean>(false); //입력 있을 시 버튼 색상

  const [chatStatus, setChatStatus] = useState<string>('');
  const [opponentName, setOpponentName] = useState<string>('');
  const [alertModalActive, setAlertModalActive] = useState<boolean>(false);
  const [alertModalTime, setAlertModalTime] = useState<string>('');
  //
  //
  //

  //useRefs
  const inputRef = useRef<HTMLTextAreaElement>(null); //input ref 높이 초기화를 위함
  const sectionPaddingRef = useRef<number>(2.4); // section 추가 padding bottom
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const { stompClient } = useStompContext();

  const preventRef = useRef(false); // observer 중복방지, 첫 mount 시 message 가져온 후 true로 전환

  const isLastElem = useRef(false); //마지막 채팅인지 확인
  const lastRef = useRef<HTMLDivElement>(null); // 마지막 채팅 box ref
  const newMessageRef = useRef(true); // 새로운 메세지인지 이전 메세지 fetch인지
  const topRef = useRef<HTMLDivElement>(null); //top에 와야하는 box
  const topMsgIndexRef = useRef<number>(0); //top index ref, fetch해온 배열이 꼭 11이 아닐 수 있기 때문에 fetch 시 변경

  /**
   *  getChatMessages로 스크롤 시 계속 업데이트
   */
  const getChatMessages = async (firstMessageId: number) => {
    try {
      const params = {
        messageId: firstMessageId,
      };
      const res: any = await getChatMessagesCounselors(chatId, {
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

  /**
   *
   */
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

  /**
   *
   */
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
            setTime(CHAT_START_REQUEST_TIME);
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
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        '/app/api/v1/chatMessages/counselors/' + chatId,
        {},
        JSON.stringify({ content: input }),
      );
    }
  };

  const sendChatStartRequest = () => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        '/app/api/v1/chat/counselors/' + chatId,
        {},
        JSON.stringify({ chatWebsocketStatus: 'COUNSELOR_CHAT_START_REQUEST' }),
      );
    }
  };

  const sendExitResponse = () => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send('app/api/v1/chat/counselors/exit/' + chatId, {});
    }
  };

  const sendChatFinishRequest = () => {
    if (stompClient.current && stompClient.current.connected) {
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

  /**
   *
   */
  const handleFooterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    //textarea 높이 동적할당
    e.target.style.height = '2.4rem';
    e.target.style.height = e.target.scrollHeight / 10 + 'rem';
    if (e.target.scrollHeight / 10 <= 7.3) {
      sectionPaddingRef.current = e.target.scrollHeight / 10;
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
    threshold: 0.8,
    onIntersect,
  });

  useEffect(() => {
    if (!stompClient.current?.connected) {
      return;
    }

    connectChat();

    //채팅 불러오기
    getChatMessages(0);
    //채팅 status, 상대이름 가져오기
    getCounselorChatStatus();
    //관측 가능
    preventRef.current = true;
    // 언마운트 시에 소켓 연결 해제
    return () => {
      if (stompClient.current && stompClient.current?.connected) {
        stompClient.current.unsubscribe(
          '/queue/chattings/counselors/' + chatId,
        );
        stompClient.current.unsubscribe(
          '/queue/chattings/status/counselors/' + chatId,
        );
        stompClient.current.unsubscribe(
          '/queue/chattings/exception/counselors/' + chatId,
        );
        stompClient.current.unsubscribe(
          '/queue/chatMessages/counselors/' + chatId,
        );
        sendExitResponse();
      }
    };
  }, [chatId, stompClient, stompClient.current?.connected]);

  //useEffects
  //보내기 버튼 색상처리
  useEffect(() => {
    if (input.trim() !== '') {
      setIsTyping(true);
    } else {
      setIsTyping(false);
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
  }, [messages]);

  //
  //
  //

  if (isInitialLoading) {
    return (
      <>
        <HeaderWrapper border={false}>
          <BackIcon
            onClick={() => {
              navigate(-1);
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
              navigate(-1);
            }}
          />
          <Heading color={Grey1}>{opponentName}</Heading>
        </HeaderWrapper>
        <Space width="100%" height="5.2rem" />
        <SellerChatSection
          messages={messages}
          chatStatus={chatStatus}
          isLastElem={isLastElem}
          lastRef={lastRef}
          topRef={topRef}
          topMsgIndexRef={topMsgIndexRef}
          sectionPaddingRef={sectionPaddingRef}
          setTarget={setTarget}
        />
        {chatStatus !== '상담 종료' ? (
          <SellerChatFooter
            input={input}
            isTyping={isTyping}
            inputRef={inputRef}
            hiddenInputRef={hiddenInputRef}
            onChange={handleFooterChange}
            handleSubmit={handleSubmit}
          />
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

//
//
//

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

export default SellerChat;
