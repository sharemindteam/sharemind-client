import { getChatsMinder, getCounselors } from 'api/get';
import { ConsultModal } from 'components/Buyer/BuyerConsult/ConsultModal';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SetURLSearchParams, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isConsultModalOpenState, scrollLockState } from 'utils/atom';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import OngoingCounsultBox from '../Common/OngoingCounsultBox';
import { ReactComponent as NoConsultGraphicIcon } from 'assets/icons/graphic-no-calculation.svg';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { useStompContext } from 'contexts/StompContext';
import { convertChatListDate } from 'utils/convertDate';
import { ConsultInfoItem, ConsultInfoList } from 'utils/type';
import { StompSubscription } from '@stomp/stompjs';
import { BackDrop } from 'components/Common/BackDrop';

//
//
//

interface SellerConsultProps {
  sortType: number;
  setSortType: React.Dispatch<React.SetStateAction<number>>;
  isChecked: boolean;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

//
//
//

function SellerChatList({
  sortType,
  isChecked,
  setSortType,
  searchParams,
  setSearchParams,
}: SellerConsultProps) {
  const navigate = useNavigate();
  const setScrollLock = useSetRecoilState(scrollLockState);

  const [consultInfo, setConsultInfo] = useState<ConsultInfoList>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  );

  const roomIdsRef = useRef<number[]>([]); //unmout 시 unsubscibe를 위함
  const userIdRef = useRef<number>(-1);

  const ConsultSubscriptions = useRef<StompSubscription[]>([]);

  /* non-react callback은 static copy of the state만 본다고한다.
   * 따라서 useRef로 함께 관리한다
   * https://stackoverflow.com/questions/73896315/rxjs-subscribe-callback-doesnt-have-access-to-current-react-state-functional-c
   */
  const cardDataRef = useRef<ConsultInfoItem[]>([]);
  const { stompClient, isConnected } = useStompContext();

  /**
   * 새로운 채팅 도착 시 업데이트
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
      setConsultInfo(updatedCardData);
    }
  };

  /**
   * 채팅방 생성 시 chat data add
   */
  const addChatData = (notification: any) => {
    //add cardData
    const addedChatRoomItem: ConsultInfoItem = {
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
    };
    //add roomIds for unsubscribe
    roomIdsRef.current.unshift(notification.chatId);

    cardDataRef.current = [addedChatRoomItem, ...cardDataRef.current];

    setConsultInfo(cardDataRef.current);
  };

  useEffect(() => {
    /** if client not connected, do nothing */
    if (!stompClient.current?.connected) {
      return;
    }

    /**
     *
     */
    const sendConnectRequest = () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.send(
          '/app/api/v1/chat/counselors/connect',
          {},
          JSON.stringify({}),
        );
      }
    };

    const getCounselorUserIdAndSubscribe = async () => {
      try {
        const response: any = await getCounselors();
        userIdRef.current = response.data;
        subscribeChatList();
        sendConnectRequest();
      } catch (e) {
        console.error(e);
      }
    };

    const subscribeChatList = () => {
      if (stompClient.current?.connected) {
        const userSubscription = stompClient.current.subscribe(
          `/queue/chattings/connect/counselors/${userIdRef.current}`,
          (rooms) => {
            const response = JSON.parse(rooms.body);
            roomIdsRef.current = response.roomIds;

            response.roomIds.forEach((chatId: number) => {
              //모든 채팅방 subscribe
              const chatSubscription = stompClient.current?.subscribe(
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

              /** add to subscriptions array */
              if (chatSubscription) {
                ConsultSubscriptions.current.push(chatSubscription);
              }
            });
            if (response.userId !== null) {
              //채팅방 생성, 종료 readid tab 갱신
              const notificationSubscribe = stompClient.current?.subscribe(
                '/queue/chattings/notifications/counselors/' + response.userId,
                (message) => {
                  const notification = JSON.parse(message.body);
                  if (
                    notification.chatRoomWebsocketStatus === 'CHAT_ROOM_CREATE'
                  ) {
                    addChatData(notification);
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

              if (notificationSubscribe) {
                ConsultSubscriptions.current.push(notificationSubscribe);
              }
            }
          },
        );

        ConsultSubscriptions.current.push(userSubscription);
      }
    };

    getCounselorUserIdAndSubscribe();

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
  }, [stompClient, stompClient.current?.connected, isConnected]);

  /**
   *
   */
  const fetchChatData = useCallback(async () => {
    setIsLoading(true);
    const params = {
      filter: isChecked,
      sortType: sortType === 0 ? 'latest' : 'unread',
    };

    let res: any;
    try {
      res = await getChatsMinder({ params });
      if (res.status === 200) {
        cardDataRef.current = res.data;
        setConsultInfo(res.data);
      } else if (res.response.status === 403) {
        // 판매 정보를 등록하지 않았을 경우
        alert('판매 정보를 등록해주세요.');
        navigate('/minder/mypage/viewProfile');
      } else {
        console.error('Failed to fetch data:', res.status, res.statusText);
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isChecked, navigate, setIsLoading, sortType]);

  useEffect(() => {
    fetchChatData();
  }, [fetchChatData]);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            height: 'calc(100vh - 50rem)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <ConsultBoxList>
          {consultInfo?.length === 0 ? (
            <NoConsultSection>
              <NoConsultGraphicIcon />
              <NoConsultText>아직 진행한 상담이 없어요</NoConsultText>
            </NoConsultSection>
          ) : (
            consultInfo.map((item: any) => (
              <OngoingCounsultBox
                consultStatus={item.status}
                counselorName={item.opponentNickname}
                beforeMinutes={item.latestMessageUpdatedAt}
                content={item.latestMessageContent}
                key={item.id}
                counselorprofileStatus={consultStyleToCharNum(
                  item.consultStyle,
                )}
                newMessageCounts={item.unreadMessageCount}
                onClick={() => {
                  navigate(`/minder/chat/${item?.id}`);
                }}
              />
            ))
          )}
          {isModalOpen ? (
            <>
              <BackDrop
                onClick={() => {
                  setIsModalOpen(false);
                  setScrollLock(false);
                }}
              />
              <ConsultModal
                sortType={sortType}
                setSortType={setSortType}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </>
          ) : null}
        </ConsultBoxList>
      )}
    </>
  );
}

const ConsultBoxList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
  gap: 0.8rem;
`;

const NoConsultSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.6rem;
  margin-top: 17.8rem;
`;

const NoConsultText = styled.div`
  color: #000;
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3rem;
`;

export default SellerChatList;
