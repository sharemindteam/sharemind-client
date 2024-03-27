import { ContentTag } from 'pages/Seller/SellerHome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Black, Green, Grey4, Red } from 'styles/color';
import { Body1, Body3, Heading, Subtitle } from 'styles/font';
import OngoingCounsultBox from '../Common/OngoingCounsultBox';
import { ReactComponent as RightArrow } from 'assets/icons/right-arrow.svg';
import { useNavigate } from 'react-router-dom';
import { getConsultsMinder } from 'api/get';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { Space } from 'components/Common/Space';
function OnGoingConsultSection() {
  const navigate = useNavigate();
  const [consult, setConsult] = useState([]);
  const [totalNum, setTotalNum] = useState<number | undefined>();
  const [isNoProfile, setIsNoProfile] = useState<boolean | undefined>();
  useEffect(() => {
    const fetchOngoingConsult = async () => {
      const res: any = await getConsultsMinder();
      if (res?.status === 200) {
        setConsult(res?.data?.responses);
        setTotalNum(res?.data?.totalOngoing);
      } else {
        // 판매 정보를 등록해주세요.
        // alert('진행중인 상담 조회 오류 발생!');
        setIsNoProfile(true);
      }
    };
    fetchOngoingConsult();
  }, []);
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
        {totalNum === 0 || totalNum === undefined ? (
          <div style={{ alignSelf: 'flex-start', paddingLeft: '2rem' }}>
            <Body3 color={Grey4}>
              {isNoProfile
                ? '내 정보 탭에서 판매 정보를 등록해주세요.'
                : '진행중인 상담이 없어요'}
            </Body3>
            <Space height="1.6rem" />
          </div>
        ) : (
          consult?.map((item: any) => (
            <OngoingCounsultBox
              key={item?.id}
              isChat={item?.isChat}
              consultStatus={item?.status}
              counselorName={item?.opponentNickname}
              beforeMinutes={item?.latestMessageUpdatedAt}
              content={
                item?.status === '질문 대기'
                  ? '셰어의 질문이 도착할 때까지 조금만 기다려주세요!'
                  : item?.latestMessageContent
              }
              newMessageCounts={item?.unreadMessageCount}
              counselorprofileStatus={consultStyleToCharNum(item?.consultStyle)}
              onClick={() => {
                if (item?.isChat) {
                  navigate(`/minder/chat/${item?.id}`);
                } else {
                  navigate(`/minder/letter/${item?.id}`);
                }
              }}
            />
          ))
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
