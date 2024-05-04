import { StompSubscription } from '@stomp/stompjs';
import { useStompContext } from 'contexts/StompContext';
import { useRef } from 'react';

//
//
//

const useCounselorChat = (chatId: string) => {
  const { stompClient } = useStompContext();

  const ChatSubscriptions = useRef<StompSubscription[]>([]);

  const sendMessage = (content: string) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        '/app/api/v1/chatMessages/counselors/' + chatId,
        {},
        JSON.stringify({ content: content }),
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

  return {
    stompClient,
    ChatSubscriptions,
    sendMessage,
    sendChatStartRequest,
    sendExitResponse,
    sendChatFinishRequest,
  };
};

export default useCounselorChat;
