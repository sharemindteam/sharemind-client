import styled from 'styled-components';
import { Grey4, Red } from 'styles/color';
import { Body1, Body3, Subtitle } from 'styles/font';
import { ReactComponent as More } from 'assets/icons/icon-more.svg';
import { ConsultCard } from '../Common/ConsultCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getConsultsCustomers } from 'api/get';
import { useStompContext } from 'contexts/StompContext';
import { convertChatListDate } from 'utils/convertDate';
import { StompSubscription } from '@stomp/stompjs';
import { Flex } from 'components/Common/Flex';

//
//
//

interface ConsultItem {
  id: number;
  consultStyle: string;
  status: string;
  opponentNickname: string;
  latestMessageUpdatedAt: string;
  latestMessageContent: string;
  latestMessageIsCustomer: boolean;
  unreadMessageCount: number;
  reviewCompleted: boolean;
  consultId: number;
  isChat: boolean;
}

//
//
//

export const HomeConsultInProgress = () => {
  const navigate = useNavigate();

  const { stompClient, isConnected } = useStompContext();

  const [consultCard, setConsultCard] = useState<ConsultItem>();
  const [totalOngoing, setTotalOngoing] = useState<number>();

  const [isLogined, setIsLogined] = useState<boolean>(true);

  const OngoingSubscription = useRef<StompSubscription>();

  useEffect(() => {
    /**
     *
     */
    const connectConsultInProgress = (id: number) => {
      if (stompClient.current && stompClient.current?.connected && isLogined) {
        OngoingSubscription.current = stompClient.current.subscribe(
          '/queue/chatMessages/customers/' + id,
          (message) => {
            const response = JSON.parse(message.body);
            setConsultCard((prevCardItem) => {
              return {
                ...prevCardItem,
                latestMessageContent: response.content,
                unreadMessageCount: prevCardItem
                  ? prevCardItem.unreadMessageCount + 1
                  : 0,
                latestMessageUpdatedAt: convertChatListDate(response.sendTime),
              } as ConsultItem;
            });
          },
        );
      }
    };

    /**
     *
     */
    const fetchData = async () => {
      try {
        const res: any = await getConsultsCustomers();

        if (res.status === 200) {
          setTotalOngoing(res.data.totalOngoing);
          setConsultCard(res.data.responses[0]);

          if (res.data.responses.length !== 0) {
            if (res.data.responses[0].isChat) {
              connectConsultInProgress(res.data.responses[0].id);
            }
          }
        } else if (res?.response?.status === 401) {
          setIsLogined(false);
        }
      } catch (e) {
        alert(e);
      }
    };

    fetchData();

    return () => {
      if (
        OngoingSubscription.current &&
        stompClient.current &&
        stompClient.current?.connected &&
        isLogined
      ) {
        OngoingSubscription.current.unsubscribe();
      }
    };
  }, [stompClient, isConnected, isLogined]);

  //
  //
  //

  if (!isLogined) {
    return <></>;
  }

  return (
    <Wrapper>
      <div
        className="nav-consult"
        onClick={() => {
          navigate('/consult');
        }}
      >
        <NavConsult>
          <Subtitle>진행 중인 상담</Subtitle>
          {/* 나중에 api */}
          <Body1 color={Red}>{totalOngoing}</Body1>
        </NavConsult>
        <MoreIcon />
      </div>
      {totalOngoing === 0 && (
        <div style={{ paddingLeft: '2rem', alignSelf: 'flex-start' }}>
          <Body3 color={Grey4}>진행중인 상담이 없어요.</Body3>
        </div>
      )}
      <Flex
        direction="column"
        gap="0.8rem"
        width="100%"
        style={{ padding: '0 2rem', boxSizing: 'border-box' }}
      >
        {totalOngoing !== 0 && consultCard && (
          <ConsultCard
            consultStyle={consultCard.consultStyle}
            id={consultCard.id}
            latestMessageContent={consultCard.latestMessageContent}
            latestMessageIsCustomer={consultCard.latestMessageIsCustomer}
            latestMessageUpdatedAt={consultCard.latestMessageUpdatedAt}
            opponentNickname={consultCard.opponentNickname}
            status={consultCard.status}
            unreadMessageCount={consultCard.unreadMessageCount}
            reviewCompleted={consultCard.reviewCompleted}
            consultId={consultCard.consultId}
            isLetter={!consultCard.isChat}
          />
        )}
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .nav-consult {
    display: flex;
    width: 100%;
    height: 4.4rem;
    box-sizing: border-box;
    padding: 2.2rem 3.2rem 1.2rem 2rem;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 0.4rem;
  }
`;
const NavConsult = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0px auto 0px 0px;
`;
const MoreIcon = styled(More)``;
