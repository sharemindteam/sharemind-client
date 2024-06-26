import styled from 'styled-components';

import { ConsultCard } from 'components/Buyer/Common/ConsultCard';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { consultApiObject } from 'pages/Buyer/BuyerConsult';
import { getChatsCustomers, getCustomers } from 'api/get';
import { useStompContext } from 'contexts/StompContext';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { Heading } from 'styles/font';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import { convertChatListDate } from 'utils/convertDate';
import { Space } from 'components/Common/Space';
import { StompSubscription } from '@stomp/stompjs';

//
//
//

interface BuyerConsultChatSectionProps {
  sortType: number;
  isChecked: boolean;
}

//
//
//

export const BuyerConsultChatSection = ({
  sortType,
  isChecked,
}: BuyerConsultChatSectionProps) => {
  const [cardData, setCardData] = useState<consultApiObject[]>([]); //card에 넘길 데이터
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const roomIdsRef = useRef<number[]>([]); //unmout 시 unsubscibe를 위함
  const userIdRef = useRef<number>(-1);

  const ConsultSubscriptions = useRef<StompSubscription[]>([]);

  /* non-react callback은 static copy of the state만 본다고한다.
   * 따라서 useRef로 함께 관리한다
   * https://stackoverflow.com/questions/73896315/rxjs-subscribe-callback-doesnt-have-access-to-current-react-state-functional-c
   */
  const cardDataRef = useRef<consultApiObject[]>([]);
  const { stompClient } = useStompContext();

  /**
   * 채팅 readId, 가장 최근 unread message, 정렬 업데이트
   */
  const updateChatData = (
    chatId: number,
    content: string,
    sendTime: string,
  ) => {
    const targetIndex = cardDataRef.current.findIndex(
      (item) => item.id === chatId,
    );

    if (targetIndex !== -1) {
      const updatedCardData = [...cardDataRef.current];
      updatedCardData[targetIndex].latestMessageContent = content;
      updatedCardData[targetIndex].latestMessageUpdatedAt = sendTime;

      if (updatedCardData[targetIndex].unreadMessageCount !== null) {
        updatedCardData[targetIndex].unreadMessageCount! += 1;
      } else {
        updatedCardData[targetIndex].unreadMessageCount = 1;
      }
      const targetElement = updatedCardData.splice(targetIndex, 1)[0];
      updatedCardData.unshift(targetElement);
      cardDataRef.current = updatedCardData;
      setCardData(updatedCardData);
    }
  };

  /**
   * 채팅방 생성 시 chat data add
   */
  const addChatData = (notification: any) => {
    //add cardData
    const addedChatRoomItem: consultApiObject = {
      consultStyle: notification.consultStyle,
      id: notification.chatId,
      latestMessageContent: `${notification.opponentNickname}님께 고민 내용을 남겨 주세요. ${notification.opponentNickname}님이 24시간 이내 답장을 드릴 거예요.`,
      latestMessageIsCustomer: null,
      latestMessageUpdatedAt: convertChatListDate(notification.createTime),
      opponentNickname: notification.opponentNickname,
      status: '상담 대기',
      unreadMessageCount: 0,
      reviewCompleted: null,
      consultId: null,
      consultCategory: '',
    };
    //add roomIds for unsubscribe
    roomIdsRef.current.unshift(notification.chatId);

    cardDataRef.current = [addedChatRoomItem, ...cardDataRef.current];

    setCardData(cardDataRef.current);
  };

  useEffect(() => {
    if (!stompClient.current?.connected) {
      return;
    }

    const sendConnectRequest = () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.send(
          '/app/api/v1/chat/customers/connect',
          {},
          JSON.stringify({}),
        );
      }
    };

    const getCustomerUserIdAndSubscribe = async () => {
      try {
        const response: any = await getCustomers();
        userIdRef.current = response.data;
        subscribeChatList();
        sendConnectRequest();
      } catch (e) {
        console.error(e);
      }
    };

    const subscribeChatList = () => {
      if (stompClient.current?.connected) {
        // 이거 전에 먼저 userId 를 받고 userId 기준으로 subscribe 한다.
        const userSubscription = stompClient.current.subscribe(
          `/queue/chattings/connect/customers/${userIdRef.current}`,
          (rooms) => {
            const response = JSON.parse(rooms.body);
            roomIdsRef.current = response.roomIds;
            response.roomIds.forEach((chatId: number) => {
              //모든 채팅방 subscribe
              const chatSubscription = stompClient.current?.subscribe(
                '/queue/chatMessages/customers/' + chatId,
                (message) => {
                  const response = JSON.parse(message.body);

                  updateChatData(
                    chatId,
                    response.content,
                    convertChatListDate(response.sendTime),
                  );
                },
              );

              /** add to subscriptions array */
              if (chatSubscription) {
                ConsultSubscriptions.current.push(chatSubscription);
              }
            });
            if (response.userId !== null) {
              //채팅방 생성, 종료 readid tab 갱신
              const notificationSubscribe = stompClient.current?.subscribe(
                '/queue/chattings/notifications/customers/' + response.userId,
                (message) => {
                  const notification = JSON.parse(message.body);
                  if (
                    notification.chatRoomWebsocketStatus === 'CHAT_ROOM_CREATE'
                  ) {
                    addChatData(notification);

                    //subscribe new chatroom
                    stompClient.current?.subscribe(
                      '/queue/chatMessages/customers/' + notification.chatId,
                      (message) => {
                        const response = JSON.parse(message.body);
                        updateChatData(
                          notification.chatId,
                          response.content,
                          convertChatListDate(response.sendTime),
                        );
                      },
                    );
                  }
                },
              );

              if (notificationSubscribe) {
                ConsultSubscriptions.current.push(notificationSubscribe);
              }
            }
          },
        );

        ConsultSubscriptions.current.push(userSubscription);
      }
    };

    getCustomerUserIdAndSubscribe();

    //
    //
    //

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (stompClient.current?.connected) {
        ConsultSubscriptions.current.forEach((subscription) => {
          subscription.unsubscribe();
        });

        ConsultSubscriptions.current = [];
      }
    };
  }, [stompClient, stompClient.current?.connected]);

  //
  //
  //
  useLayoutEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let sortTypeText: string;
        if (sortType === 0) {
          sortTypeText = 'latest';
        } else {
          sortTypeText = 'unread';
        }
        const params = {
          filter: isChecked,
          sortType: sortTypeText,
        };
        const res: any = await getChatsCustomers({ params });
        if (res.status === 200) {
          cardDataRef.current = res.data;
          setCardData(res.data);
        } else if (res.response.status === 404) {
          alert('존재하지 않는 정렬 방식입니다.');
        }
      } catch (e) {
        alert(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sortType, isChecked, setIsLoading]);

  //
  //
  //

  if (isLoading) {
    return (
      <>
        <div
          style={{
            height: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner />
        </div>
      </>
    );
  } else {
    if (cardData.length !== 0) {
      return (
        <BuyerConsultChatSectionWrapper>
          {cardData.map((value) => {
            return (
              <ConsultCard
                key={value.id}
                consultStyle={value.consultStyle}
                id={value.id}
                latestMessageContent={value.latestMessageContent}
                latestMessageIsCustomer={value.latestMessageIsCustomer}
                latestMessageUpdatedAt={value.latestMessageUpdatedAt}
                opponentNickname={value.opponentNickname}
                status={value.status}
                unreadMessageCount={value.unreadMessageCount}
                reviewCompleted={value.reviewCompleted}
                consultId={value.consultId}
                isLetter={false}
              />
            );
          })}
          <Space height="4rem" />
        </BuyerConsultChatSectionWrapper>
      );
    } else {
      return (
        <EmptyWrapper>
          <EmptyIcon />
          <Heading>아직 진행한 상담이 없어요</Heading>
        </EmptyWrapper>
      );
    }
  }
};
const BuyerConsultChatSectionWrapper = styled.section`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
`;
const EmptyWrapper = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const EmptyIcon = styled(Empty)`
  padding: 4.7rem 4.41rem 4.603rem 4.5rem;
`;
