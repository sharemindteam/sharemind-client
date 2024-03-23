import { getChatsMinder } from 'api/get';
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
//buyer consult에 저장돼있고, 나중에 type으로 뺴고 consultinfoLIst 지우기
//consultinfolist type에 더미값 들어가 있음

interface SellerConsultProps {
  sortType: number;
  setSortType: React.Dispatch<React.SetStateAction<number>>;
  isChecked: boolean;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

function SellerChatList({
  sortType,
  isChecked,
  setSortType,
  searchParams,
  setSearchParams,
}: SellerConsultProps) {
  const [consultInfo, setConsultInfo] = useState<ConsultInfoList>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  );
  const setScrollLock = useSetRecoilState(scrollLockState);
  const navigate = useNavigate();

  const roomIdsRef = useRef<number[]>([]); //unmout 시 unsubscibe를 위함
  const userIdRef = useRef<number>(0);
  /* non-react callback은 static copy of the state만 본다고한다.
   * 따라서 useRef로 함께 관리한다
   * https://stackoverflow.com/questions/73896315/rxjs-subscribe-callback-doesnt-have-access-to-current-react-state-functional-c
   */
  const cardDataRef = useRef<ConsultInfoItem[]>([]);
  const { stompClient, isConnected } = useStompContext();
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
      setConsultInfo(updatedCardData);
    }
  };
  useEffect(() => {
    if (stompClient.current) {
      stompClient.current.subscribe(
        '/queue/chattings/connect/counselors/',
        (rooms) => {
          const response = JSON.parse(rooms.body);

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
              '/queue/chattings/notifications/counselors/' + response.userId,
              (message) => {
                const notification = JSON.parse(message.body);
                if (
                  notification.chatRoomWebsocketStatus === 'CHAT_ROOM_CREATE'
                ) {
                  //add cardData
                  const addedChatRoomItem: ConsultInfoItem = {
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
                  roomIdsRef.current.unshift(notification.chatId);

                  cardDataRef.current = [
                    addedChatRoomItem,
                    ...cardDataRef.current,
                  ];

                  setConsultInfo(cardDataRef.current);

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
          '/app/api/v1/chat/counselors/connect',
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
            '/queue/chattings/connect/counselors/' + value,
          );
        });
      }
      if (userIdRef.current) {
        stompClient.current?.unsubscribe(
          '/queue/chattings/connect/counselors/' + userIdRef.current,
        );
      }
    };
  }, [stompClient, isConnected]);

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
  margin-top: 0.5rem;
  gap: 0.8rem;
`;
const BackDrop = styled.div`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  position: fixed;
  top: 0;
  z-index: 2001;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
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
