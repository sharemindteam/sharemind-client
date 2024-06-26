import { StompSubscription } from '@stomp/stompjs';
import { useStompContext } from 'contexts/StompContext';
import { useRef } from 'react';

//
//
//

const useCustomerChat = (chatId: string) => {
  const { stompClient } = useStompContext();

  const ChatSubscriptions = useRef<StompSubscription[]>([]);

  const sendMessage = (content: string) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        '/app/api/v1/chatMessages/customers/' + chatId,
        {},
        JSON.stringify({ content: content }),
      );
    }
  };

  const sendChatStartResponse = () => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        '/app/api/v1/chat/customers/' + chatId,
        {},
        JSON.stringify({ chatWebsocketStatus: 'CUSTOMER_CHAT_START_RESPONSE' }),
      );
    }
  };

  const sendExitResponse = () => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send('app/api/v1/chat/customers/exit/' + chatId, {});
    }
  };

  const sendChatFinishRequest = () => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        '/app/api/v1/chat/customers/' + chatId,
        {},
        JSON.stringify({ chatWebsocketStatus: 'CUSTOMER_CHAT_FINISH_REQUEST' }),
      );
    }
  };

  return {
    stompClient,
    ChatSubscriptions,
    sendMessage,
    sendChatStartResponse,
    sendExitResponse,
    sendChatFinishRequest,
  };
};

export default useCustomerChat;
