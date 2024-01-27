// import { useState } from 'react';
import SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
export const BuyerChat = () => {
  const socket = new SockJs('/chat');
  const stompClient = StompJs.Stomp.over(socket);
  const chatId = 20;
  const headers = {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGF0QGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9DVVNUT01FUiIsImV4cCI6MTcwNjMyNDE0Nn0.NL23laiKzJFOlzyvgSMwXcm5Q-NsFqmu6PYFhvbl_QQ',
    isCustomer: 'true',
  };

  stompClient.configure({
    brokerURL: '/chat',
    connectHeaders: headers,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: (frame) => {
      console.log('Connected: ' + frame);

      // 구독
      stompClient.subscribe(
        '/queue/chattings/notifications/customers/19',
        (notification) => {
          console.log('Notification: ', notification.body);
        },
      );

      stompClient.subscribe(
        '/queue/chattings/customers/' + chatId,
        (statusUpdate) => {
          console.log('Status Update: ', statusUpdate.body);
        },
      );

      stompClient.subscribe(
        '/queue/chattings/status/customers/' + chatId,
        (statusAutoUpdate) => {
          console.log('Status Auto Update: ', statusAutoUpdate.body);
        },
      );

      stompClient.subscribe(
        '/queue/chattings/exception/customers/' + chatId,
        (error) => {
          console.log('Error: ', error.body);
        },
      );

      stompClient.subscribe(
        '/queue/chatMessages/customers/' + chatId,
        (message) => {
          console.log('Message: ', message.body);
          // displayMessage(message.body);
        },
      );
    },
  });

  stompClient.activate();
  return <></>;
};
