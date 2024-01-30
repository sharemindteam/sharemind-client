// import { useState } from 'react';
import SockJs from 'sockjs-client';
// import * as StompJs from '@stomp/stompjs';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { useRef } from 'react';
export const useChat = () => {
  let stompClient: any = null;
  const chatId = 20;
  // const stompClient = useRef<CompatClient>();
  const connectStomp = () => {
    const headers = {
      //나중에 localStorage 에서 꺼내기
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGF0QGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9DVVNUT01FUiIsImV4cCI6MTcwNjMzNjMyOX0.VUNGNnJvIavp1DEKWA9pJG0FkI9_HCw0trIZSJSA0KM',
      isCustomer: 'true',
    };
    stompClient.connect(headers, (frame: any) => {
      const socket = new SockJs(process.env.REACT_APP_API_URL + '/chat');
      const stompClient = Stomp.over(socket);
      console.log('Connected: ' + frame);
      // 구독
      stompClient.subscribe(
        '/queue/chattings/notifications/customers/19',
        function (notification) {
          console.log('Notification: ', notification.body);
        },
      );
      stompClient.subscribe(
        '/queue/chattings/customers/' + chatId,
        function (statusUpdate) {
          console.log('Status Update: ', statusUpdate.body);
        },
      );
      stompClient.subscribe(
        '/queue/chattings/status/customers/' + chatId,
        function (statusAutoUpdate) {
          console.log('Status Auto Update: ', statusAutoUpdate.body);
        },
      );
      stompClient.subscribe(
        '/queue/chattings/exception/customers/' + chatId,
        function (error) {
          console.log('Error: ', error.body);
        },
      );
      //보내기//customer side
      stompClient.subscribe(
        '/queue/chatMessages/customers/' + chatId,
        function (message) {
          console.log('Message: ', message.body);
          // displayMessage(message.body);
        },
      );
    });
  };
  const sendMessage = (message: string) => {
    // var message = document.getElementById('messageInput').value;
    stompClient.send(
      '/app/api/v1/chatMessages/customers/' + chatId,
      {},
      JSON.stringify({ content: message }),
    );
  };

  const sendChatStartRequest = () => {
    stompClient.send(
      '/app/api/v1/chat/customers/' + chatId,
      {},
      JSON.stringify({ chatWebsocketStatus: 'COUNSELOR_CHAT_START_REQUEST' }),
    );
  };

  const sendChatStartResponse = () => {
    stompClient.send(
      '/app/api/v1/chat/customers/' + chatId,
      {},
      JSON.stringify({ chatWebsocketStatus: 'CUSTOMER_CHAT_START_RESPONSE' }),
    );
  };

  const sendChatFinishRequest = () => {
    stompClient.send(
      '/app/api/v1/chat/customers/' + chatId,
      {},
      JSON.stringify({ chatWebsocketStatus: 'CUSTOMER_CHAT_FINISH_REQUEST' }),
    );
  };

  const displayMessage = (message: string) => {
    var messagesDiv = document.getElementById('messages');
    // messagesDiv.innerHTML += '<div>' + message + '</div>';
  };

  const sendConnectRequest = () => {
    if (stompClient !== null) {
      stompClient.send(
        '/app/api/v1/chat/customers/connect',
        {},
        JSON.stringify({}),
      );
    }
  };
  return {
    connectStomp,
    sendMessage,
    sendChatStartRequest,
    sendChatStartResponse,
    sendChatFinishRequest,
    displayMessage,
    sendConnectRequest,
  };
};
