import styled from 'styled-components';

import { ConsultCard } from 'components/Buyer/Common/ConsultCard';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { consultApiObject } from 'pages/Buyer/BuyerConsult';
import { getChatsCustomers } from 'api/get';
import { useStompContext } from 'contexts/StompContext';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { Heading } from 'styles/font';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import { convertChatListDate } from 'utils/convertDate';
interface BuyerChatSectionProps {
  sortType: number;
  isChecked: boolean;
}

export const BuyerChatSection = ({
  sortType,
  isChecked,
}: BuyerChatSectionProps) => {
  const [cardData, setCardData] = useState<consultApiObject[]>([]); //card에 넘길 데이터

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const roomIdsRef = useRef<number[]>([]); //unmout 시 unsubscibe를 위함
  const userIdRef = useRef<number>(0);
  /* non-react callback은 static copy of the state만 본다고한다.
   * 따라서 useRef로 함께 관리한다
   * https://stackoverflow.com/questions/73896315/rxjs-subscribe-callback-doesnt-have-access-to-current-react-state-functional-c
   */
  const cardDataRef = useRef<consultApiObject[]>([]);
  const { stompClient } = useStompContext();
  //채팅 readId, 가장 최근 unread message, 정렬 업데이트
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

  useEffect(() => {
    if (stompClient.current) {
      //먼저 roomIds를 받고 그 결과 값 state에 저장, 그리고 반복문 돌면서
      // 모두 subscribe.
      // onClick 이벤트 발생하면 나머지 다 끊고 하나만 남겨두기
      //여기서 사용하는 건 meesage만 이지만 auto update 같은 subscribe는
      //chat component에서 이뤄지면되지만 message의 경우는 끊고 다시 연결하나..? 그게맞을듯
      stompClient.current.subscribe(
        '/queue/chattings/connect/customers/',
        (rooms) => {
          const response = JSON.parse(rooms.body);
          // console.log(response);
          roomIdsRef.current = response.roomIds;

          response.roomIds.forEach((chatId: number) => {
            //모든 채팅방 subscribe
            stompClient.current?.subscribe(
              '/queue/chatMessages/counselors/' + chatId,
              (message) => {
                const response = JSON.parse(message.body);
                updateChatData(
                  chatId,
                  response.content,
                  convertChatListDate(response.sendTime),
                );
              },
            );
          });
          if (response.userId !== null) {
            userIdRef.current = response.userId;
            //채팅방 생성, 종료 readid tab 갱신
            stompClient.current?.subscribe(
              '/queue/chattings/notifications/customers/' + response.userId,
              (message) => {
                const notification = JSON.parse(message.body);
                if (
                  notification.chatRoomWebsocketStatus === 'CHAT_ROOM_CREATE'
                ) {
                  console.log(notification);
                  //add cardData
                  const addedChatRoomItem: consultApiObject = {
                    consultStyle: notification.consultStyle,
                    id: notification.chatId,
                    latestMessageContent: `${notification.opponentNickname}님께 고민 내용을 남겨 주세요. ${notification.opponentNickname}님이 24시간 이내 답장을 드릴 거예요.`,
                    latestMessageIsCustomer: null,
                    latestMessageUpdatedAt: convertChatListDate(
                      notification.createTime,
                    ),
                    opponentNickname: notification.opponentNickname,
                    status: '상담 대기',
                    unreadMessageCount: 0,
                    reviewCompleted: null,
                    consultId: null,
                  };
                  //add roomIds for unsubscribe
                  roomIdsRef.current.push(notification.chatId);

                  cardDataRef.current = [
                    ...cardDataRef.current,
                    addedChatRoomItem,
                  ];

                  setCardData(cardDataRef.current);

                  //subscribe new chatroom
                  stompClient.current?.subscribe(
                    '/queue/chatMessages/counselors/' + notification.chatId,
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
          }
        },
      );
    }

    const sendConnectRequest = () => {
      if (stompClient.current) {
        stompClient.current.send(
          '/app/api/v1/chat/customers/connect',
          {},
          JSON.stringify({}),
        );
      }
    };

    sendConnectRequest();

    return () => {
      if (roomIdsRef.current) {
        roomIdsRef.current.forEach((value) => {
          stompClient.current?.unsubscribe(
            '/queue/chattings/connect/customers/' + value,
          );
        });
      }
      if (userIdRef.current) {
        stompClient.current?.unsubscribe(
          '/queue/chattings/connect/customers/' + userIdRef.current,
        );
      }
    };
  }, [stompClient]);

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
        <BuyerChatSectionWrapper>
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
        </BuyerChatSectionWrapper>
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
const BuyerChatSectionWrapper = styled.section`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  padding: 1.2rem 0;
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
