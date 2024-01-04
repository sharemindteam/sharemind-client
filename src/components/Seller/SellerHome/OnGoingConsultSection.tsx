import { ContentTag } from 'pages/Seller/SellerHome';
import React from 'react';
import styled from 'styled-components';
import { Black, Red } from 'styles/color';
import { Body1, Heading } from 'styles/font';
import OngoingCounsultBox from '../Common/OngoingCounsultBox';
import { ReactComponent as RightArrow } from 'assets/icons/right-arrow.svg';
function OnGoingConsultSection() {
  return (
    <>
      <ContentTag>
        <Heading color={Black}>진행중인 상담</Heading>
        <Body1 color={Red} margin="0px auto 0px 0px">
          5
        </Body1>
        <RightArrow />
      </ContentTag>
      <OngoingCounsultBoxList>
        <OngoingCounsultBox
          consultStatus="상담 중"
          counselorName="연애상담마스터"
          beforeMinutes="8분 전"
          content="연애상담마스터님께 고민 내용을 남겨주세요. 연애상담마스터님이 24시간"
          newMessageCounts="1"
          counselorprofileStatus={1}
        />{' '}
        <OngoingCounsultBox
          consultStatus="상담 중"
          counselorName="연애상담마스터"
          beforeMinutes="8분 전"
          content="연애 상담마스터님께 고민 내용을 남겨주세요. 연애 상담마스터님이 어쩌구"
          newMessageCounts="1"
          counselorprofileStatus={2}
        />{' '}
        <OngoingCounsultBox
          consultStatus="상담 중"
          counselorName="연애상담마스터"
          beforeMinutes="8분 전"
          content="연애 상담마스터님께 고민 내용을 남겨주세요. 연애 상담마스터님이 어쩌구"
          newMessageCounts="1"
          counselorprofileStatus={3}
        />
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
