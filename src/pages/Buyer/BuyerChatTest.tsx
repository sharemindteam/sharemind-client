//test2 옥상달빛
import SockJs from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { useChat } from 'hooks/useChat';
import { useInput } from 'hooks/useInput';
import { useEffect, useRef, useState } from 'react';
import { Heading } from 'styles/font';
import { ChatMessage } from 'utils/type';
import styled from 'styled-components';
import { LightGreenChat, White } from 'styles/color';
import Input from 'components/Common/Input';
export const BuyerChatTest = () => {
  // const chat = useChat();
  const [input, setInput] = useState<string>('');
  const stompClient = useRef<CompatClient | null>(null);
  const isConnected = useRef(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatId = 31;
  // chat.connectStomp();
  const connectChat = () => {
    const socket = new SockJs(process.env.REACT_APP_CHAT_URL + '/chat');
    stompClient.current = Stomp.over(socket);
    //나중에 localStorage 에서 꺼내기

    //   if (isConnected.current) {
    //     stompClient.current.disconnect();
    //     isConnected.current = false;
    //
    console.log(localStorage.getItem('accessToken'));
    stompClient.current.connect(
      {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MkBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6IlJPTEVfQ1VTVE9NRVIsUk9MRV9DT1VOU0VMT1IiLCJleHAiOjE3MDc5MTQyODN9._4GdSCyk8GAwNTxJXp9Y65n5VQFwJURkdJBt1ZJC5S0',
        isCustomer: false,
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
            '/queue/chattings/counselors/' + chatId,
            function (statusUpdate) {
              console.log('Status Update: ', statusUpdate.body);
            },
          );
          //채팅 시작, 채팅 5분 남았을 때, 채팅 끝났을 때 알림
          stompClient.current.subscribe(
            '/queue/chattings/status/counselors/' + chatId,
            function (statusAutoUpdate) {
              console.log('Status Auto Update: ', statusAutoUpdate.body);
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
              // console.log('Message: ', message.body);
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
    );
  };
  const sendMessage = () => {
    // var message = document.getElementById('messageInput').value;
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

  const displayMessage = (message: string) => {
    //message 하나 보내기
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
    console.log('mount');
    // 언마운트 시에 소켓 연결 해제
    return () => {
      if (stompClient.current) {
        console.log('연결해제');
        stompClient.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const handleDisconnect = () => {
    if (stompClient.current) {
      console.log('연결해제 클릭');
      stompClient.current.disconnect();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== '') {
      sendMessage();
      setInput('');
    }
  };
  return (
    <>
      <Heading> 채팅</Heading>
      <button onClick={handleDisconnect}>disconnect</button>
      <button onClick={sendMessage}>send message</button>

      <SectionWrapper>
        {messages.map((value) => {
          if (value.isCustomer) {
            return (
              <div className="my-box-container">
                <CustomerChatBox>{value.content}</CustomerChatBox>
              </div>
            );
          } else {
            return (
              <div className="opponent-box-container">
                <CounselorChatBox>{value.content}</CounselorChatBox>
              </div>
            );
          }
        })}
      </SectionWrapper>
      <form className="message-form" onSubmit={handleSubmit}>
        <Input
          placeholder="메세지"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </form>
    </>
  );
};
const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  .my-box-container {
    display: flex;
    justify-content: flex-end;
  }
  .opponent-box-container {
    display: flex;
    justify-content: flex-start;
  }
  .message-form {
    background-color: pink;
  }
`;

const CustomerChatBox = styled.div`
  background-color: ${LightGreenChat};
`;
const CounselorChatBox = styled.div`
  background-color: ${White};
`;
