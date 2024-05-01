import { useStompContext } from 'contexts/StompContext';

//
//
//

const useCounselorChat = (chatId: string) => {
  const { stompClient } = useStompContext();

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
    sendMessage,
    sendChatStartRequest,
    sendExitResponse,
    sendChatFinishRequest,
  };
};

export default useCounselorChat;
