// import SockJS from 'sockjs-client';
// import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
// import { createContext, useContext, useEffect, useRef, useState } from 'react';
// import { isCustomerState } from 'utils/atom';
// import { useRecoilValue } from 'recoil';
// import { postReissue } from 'api/post';
// import { getChatsCounselors, getChatsCustomers, getChatsMinder } from 'api/get';
// import { useLocation } from 'react-router-dom';
// // context api 를 통해 context 생성 ㅁ
// const StompContext = createContext('practice');
// StompContext.displayName = 'StompContext';

// export const useStomp = () => {
//   // useContext를 통해 context에 넣은 값에 바로 접근할 수 있다. useContext훅 안에 변수로 위에서 생성한 context를 넣는다
//   return useContext(StompContext);
// };

// // Context Provider, AppContainer 위에 둬야할듯함 (Appcontainer에서 판매자 여부를 반환하고 있기에)
// export const StompContextProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   // stompClient
//   const stompClient = useRef<CompatClient>();
//   // 구독한 웹소켓 리스트
//   const subscriptions = useRef<Array<StompSubscription>>([]);
//   // 구매자 여부
//   const isCustomer = useRecoilValue(isCustomerState);
//   const subscribe = () => {};
//   var { pathname } = useLocation();
//   const unsubscribe = () => {};
//   useEffect(() => {
//     const connectChatRoomSocket = async () => {
//       const params = {
//         filter: true,
//         sortType: 'LATEST',
//       };
//       const res: any = pathname.includes('/minder')
//         ? await getChatsMinder({ params })
//         : await getChatsCustomers({ params });

//       if (res?.status === 200) {
//         const chatIdList = res.data.map((item) => item.id);
        
//       }
//     };
//     connectChatRoomSocket();
//     // stomp 연결
//     // stompClient.current = Stomp.over(() => {
//     //   return new SockJS(`${process.env.NEXT_PUBLIC_API_HOST}/ws-endpoint`);
//     // });
//     // stompClient.current.connect({}, () => {
//     //   console.log('web socket connected!');
//     // });
//     return () => {
//       // subscriptions.current?.forEach((subscription) => {
//       //   console.log('unsubscribed:', subscription);
//       //   subscription.unsubscribe();
//       // });
//       // stompClient.current?.disconnect();
//     };
//   }, []);
//   return (
//     <StompContext.Provider value={'hello'}>{children}</StompContext.Provider>
//   );
// };
