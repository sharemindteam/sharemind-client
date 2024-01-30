// import { useState } from 'react';
import SockJs from 'sockjs-client';
// import * as StompJs from '@stomp/stompjs';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { useChat } from 'hooks/useChat';
import { useInput } from 'hooks/useInput';
import { useEffect, useRef } from 'react';
import { Heading } from 'styles/font';
export const BuyerChat = () => {
  // const chat = useChat();
  const messages = useInput('');
  const stompClient = useRef<CompatClient>();
  const isConnected = useRef(false);
  // chat.connectStomp();
  const connectChat = () => {
    const socket = new SockJs(process.env.REACT_APP_API_URL + '/chat');
    stompClient.current = Stomp.over(socket);
    const headers = {
      //나중에 localStorage 에서 꺼내기
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGF0QGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9DVVNUT01FUiIsImV4cCI6MTcwNjM0NDQ0Mn0.NFR-w7_TsoXOPsw0rU_5I4OvCDKdfokTowWYGYxulXw',
      isCustomer: 'true',
    };

    if (isConnected.current) {
      stompClient.current.disconnect();
      isConnected.current = false;
    }

    stompClient.current.connect(headers, (frame: any) => {
      console.log('Connected: ' + frame);

      // 서버로부터 메시지 수신 시 동작 정의
      stompClient.current.subscribe(
        '/queue/chatMessages/customers/20',
        (message) => {
          console.log('Message: ', message.body);
        },
      );
    });
  };

  const disconnectFromChat = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  //보내기
  const sendMessage = (message: string) => {
    // var message = document.getElementById('messageInput').value;
    stompClient.current.send(
      '/app/api/v1/chatMessages/customers/20',
      {},
      JSON.stringify({ content: message }),
    );
  };
  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 실행
    connectChat();

    // 언마운트 시에 소켓 연결 해제
    return () => {
      disconnectFromChat();
    };
  }, []);
  return (
    <>
      <Heading> 채팅</Heading>
    </>
  );
};
