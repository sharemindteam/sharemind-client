import { useState } from 'react';
import SockJs from 'sockjs-client';
import Stomp from 'stompjs';

export const BuyerChat = () => {
  // const [stompClient, setStompClient] = useState(null);
  // const [chatId] = useState(20);
  // const [isCustomer] = useState(true);
  // const [token, setToken] = useState('');
  // const [messages, setMessages] = useState([]);
  // const [messageInput, setMessageInput] = useState('');
  // const connect = () => {
  //   const socket = new SockJs('/chat');
  //   const client = Stomp.over(socket);
  //   client.connect(
  //     {
  //       Authorization: 'Bearer ' + token,
  //       isCustomer: isCustomer,
  //     },
  //     (frame) => {
  //       console.log('Connected: ' + frame);
  //       // Subscribe to channels
  //       client.subscribe(
  //         '/queue/chattings/notifications/customers/19',
  //         (notification) => {
  //           console.log('Notification: ', notification.body);
  //         },
  //       );
  //       client.subscribe(
  //         '/queue/chattings/customers/' + chatId,
  //         (statusUpdate) => {
  //           console.log('Status Update: ', statusUpdate.body);
  //         },
  //       );
  //       client.subscribe(
  //         '/queue/chattings/status/customers/' + chatId,
  //         (statusAutoUpdate) => {
  //           console.log('Status Auto Update: ', statusAutoUpdate.body);
  //         },
  //       );
  //       client.subscribe(
  //         '/queue/chattings/exception/customers/' + chatId,
  //         (error) => {
  //           console.log('Error: ', error.body);
  //         },
  //       );
  //       client.subscribe(
  //         '/queue/chatMessages/customers/' + chatId,
  //         (message) => {
  //           console.log('Message: ', message.body);
  //           displayMessage(message.body);
  //         },
  //       );
  //       setStompClient(client);
  //     },
  //   );
  // };
  // const sendMessage = () => {
  //   if (stompClient !== null) {
  //     stompClient.send(
  //       `/app/api/v1/chatMessages/customers/${chatId}`,
  //       {},
  //       JSON.stringify({ content: messageInput }),
  //     );
  //   }
  // };
  // const sendChatStartRequest = () => {
  //   stompClient.send(
  //     `/app/api/v1/chat/customers/${chatId}`,
  //     {},
  //     JSON.stringify({ chatWebsocketStatus: 'COUNSELOR_CHAT_START_REQUEST' }),
  //   );
  // };
  // const sendChatStartResponse = () => {
  //   stompClient.send(
  //     `/app/api/v1/chat/customers/${chatId}`,
  //     {},
  //     JSON.stringify({ chatWebsocketStatus: 'CUSTOMER_CHAT_START_RESPONSE' }),
  //   );
  // };
  // const sendChatFinishRequest = () => {
  //   stompClient.send(
  //     `/app/api/v1/chat/customers/${chatId}`,
  //     {},
  //     JSON.stringify({ chatWebsocketStatus: 'CUSTOMER_CHAT_FINISH_REQUEST' }),
  //   );
  // };
  // const displayMessage = (message) => {
  //   setMessages([...messages, message]);
  // };
  return (
    <></>
    // <div>
    //   <h2>Customer Chat</h2>
    //   <div>
    //     <label htmlFor="tokenInput">Token:</label>
    //     <input
    //       type="text"
    //       id="tokenInput"
    //       value={token}
    //       onChange={(e) => setToken(e.target.value)}
    //     />
    //     <button onClick={connect}>Connect</button>
    //   </div>
    //   <div id="messages">
    //     {messages.map((message, index) => (
    //       <div key={index}>{message}</div>
    //     ))}
    //   </div>
    //   <input
    //     type="text"
    //     value={messageInput}
    //     onChange={(e) => setMessageInput(e.target.value)}
    //   />
    //   <button onClick={sendMessage}>Send Message</button>
    //   <button onClick={sendChatStartRequest}>Start Chat Request</button>
    //   <button onClick={sendChatStartResponse}>Start Chat Response</button>
    //   <button onClick={sendChatFinishRequest}>End Chat</button>
    // </div>
  );
};
