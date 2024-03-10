import styled from 'styled-components';

import { ConsultCard } from 'components/Buyer/Common/ConsultCard';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { consultApiObject } from 'pages/Buyer/BuyerConsult';
import { getChatsCustomers } from 'api/get';
import { useStompContext } from 'contexts/StompContext';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { Heading } from 'styles/font';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
interface BuyerChatSectionProps {
  sortType: number;
  isChecked: boolean;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const BuyerChatSection = ({
  sortType,
  isChecked,
  isLoading,
  setIsLoading,
}: BuyerChatSectionProps) => {
  const [cardData, setCardData] = useState<consultApiObject[]>([]); //card에 넘길 데이터
  const [roomIds, setRoomIds] = useState<number[]>([]);
  const { stompClient } = useStompContext();
  //채팅 readId, 가장 최근 unread message, 정렬 업데이트
  const updateChatData = (chatId: number, content: string) => {
    const targetIndex = cardData.findIndex((item) => item.id === chatId);
    console.log(targetIndex);
    const updatedCardData = [...cardData];
    updatedCardData[targetIndex].latestMessageContent = content;
    setCardData(updatedCardData);
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
          setRoomIds(response.roomIds);
          response.roomIds.forEach((chatId: number) => {
            //모든 채팅방 subscribe
            stompClient.current?.subscribe(
              '/queue/chatMessages/counselors/' + chatId,
              (message) => {
                const response = JSON.parse(message.body);
                // console.log(response);
                updateChatData(chatId, response.content);
              },
            );
          });
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
      roomIds.forEach((value) => {
        if (stompClient.current) {
          stompClient.current.unsubscribe(
            '/queue/chattings/connect/customers/' + value,
          );
        }
      });
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
      <EmptyWrapper>
        <EmptyIcon />
        <Heading>아직 진행한 상담이 없어요</Heading>
      </EmptyWrapper>;
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
