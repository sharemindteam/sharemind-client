import { ContentTag } from 'pages/Seller/SellerHome';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Black, Grey4, Red } from 'styles/color';
import { Body1, Body3, Subtitle } from 'styles/font';
import OngoingCounsultBox from '../Common/OngoingCounsultBox';
import { ReactComponent as RightArrow } from 'assets/icons/right-arrow.svg';
import { useNavigate } from 'react-router-dom';
import { getConsultsMinder } from 'api/get';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { Space } from 'components/Common/Space';
import { useStompContext } from 'contexts/StompContext';
import { convertChatListDate } from 'utils/convertDate';
import { StompSubscription } from '@stomp/stompjs';

//
//
//

interface OngoinConsultResponse {
  consultId: number;
  consultStyle: string;
  id: number;
  isChat: boolean;
  latestMessageContent: string;
  latestMessageIsCustomer: boolean;
  latestMessageUpdatedAt: string;
  opponentNickname: string;
  reviewCompleted: boolean;
  status: string;
  unreadMessageCount: number;
}

//
//
//

function OnGoingConsultSection() {
  const navigate = useNavigate();

  const { stompClient, isConnected } = useStompContext();

  const [consult, setConsult] = useState<OngoinConsultResponse>();
  const [totalNum, setTotalNum] = useState<number | undefined>();
  const [isNoProfile, setIsNoProfile] = useState<boolean>(false);

  const currentChatIdRef = useRef<number | null>();

  const OngoingSubscription = useRef<StompSubscription>();

  useEffect(() => {
    const connectConsultInProgress = (id: number) => {
      console.log(
        stompClient.current,
        stompClient.current?.connected,
        !isNoProfile,
      );
      if (
        stompClient.current &&
        stompClient.current?.connected &&
        !isNoProfile
      ) {
        OngoingSubscription.current = stompClient.current.subscribe(
          '/queue/chatMessages/customers/' + id,
          (message) => {
            const response = JSON.parse(message.body);
            setConsult((prevConsult) => {
              return {
                ...prevConsult,
                latestMessageContent: response.content,
                unreadMessageCount: prevConsult
                  ? prevConsult.unreadMessageCount + 1
                  : 0,
                latestMessageUpdatedAt: convertChatListDate(response.sendTime),
              } as OngoinConsultResponse;
            });
          },
        );
      }
    };

    const fetchOngoingConsult = async () => {
      const res: any = await getConsultsMinder();
      if (res.status === 200) {
        setConsult(res.data.responses[0]);
        setTotalNum(res.data.totalOngoing);
        if (res.data.responses.length !== 0) {
          if (res.data.responses[0].isChat) {
            currentChatIdRef.current = res.data.responses[0].id;
            connectConsultInProgress(res.data.responses[0].id);
          }
        }
      } else {
        setIsNoProfile(true);
      }
    };
    fetchOngoingConsult();

    return () => {
      if (
        OngoingSubscription.current &&
        stompClient.current &&
        stompClient.current?.connected &&
        !isNoProfile
      ) {
        OngoingSubscription.current.unsubscribe();
      }
    };
  }, [isNoProfile, stompClient, isConnected]);

  //
  //
  //

  return (
    <>
      <ContentTag
        onClick={() => {
          navigate('/minder/consult');
        }}
      >
        <Subtitle color={Black}>진행중인 상담</Subtitle>
        <Body1 color={Red} margin="0px auto 0px 0px">
          {totalNum}
        </Body1>
        <RightArrow />
      </ContentTag>

      <OngoingCounsultBoxList>
        {totalNum === 0 || totalNum === undefined || !consult ? (
          <div style={{ alignSelf: 'flex-start', paddingLeft: '2rem' }}>
            <Body3 color={Grey4}>
              {isNoProfile
                ? '내 정보 탭에서 판매 정보를 등록해주세요.'
                : '진행중인 상담이 없어요'}
            </Body3>
            <Space height="1.6rem" />
          </div>
        ) : (
          <OngoingCounsultBox
            key={consult.id}
            isChat={consult.isChat}
            consultStatus={consult.status}
            counselorName={consult.opponentNickname}
            beforeMinutes={consult.latestMessageUpdatedAt}
            content={
              consult.status === '질문 대기'
                ? '셰어의 질문이 도착할 때까지 조금만 기다려주세요!'
                : consult?.latestMessageContent
            }
            newMessageCounts={consult.unreadMessageCount}
            counselorprofileStatus={consultStyleToCharNum(consult.consultStyle)}
            onClick={() => {
              if (consult.isChat) {
                navigate(`/minder/chat/${consult.id}`);
              } else {
                navigate(`/minder/letter/${consult.id}`);
              }
            }}
          />
        )}
      </OngoingCounsultBoxList>
    </>
  );
}

const OngoingCounsultBoxList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;
export default OnGoingConsultSection;
