import { ContentTag } from 'pages/Seller/SellerHome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Black, Green, Grey4, Red } from 'styles/color';
import { Body1, Body3, Heading } from 'styles/font';
import OngoingCounsultBox from '../Common/OngoingCounsultBox';
import { ReactComponent as RightArrow } from 'assets/icons/right-arrow.svg';
import { useNavigate } from 'react-router-dom';
import { getConsultsMinder } from 'api/get';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { Space } from 'components/Common/Space';
function OnGoingConsultSection() {
  const navigate = useNavigate();
  const [consult, setConsult] = useState([]);
  useEffect(() => {
    const fetchOngoingConsult = async () => {
      const res: any = await getConsultsMinder();
      console.log(res);
      if (res?.status === 200) {
        setConsult(res?.data?.responses);
      } else if (res?.response?.status === 403) {
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
        <Heading color={Black}>진행중인 상담</Heading>
        <Body1 color={Red} margin="0px auto 0px 0px">
          {consult?.length}
        </Body1>
        <RightArrow />
      </ContentTag>

      <OngoingCounsultBoxList>
        {consult?.length === 0 ? (
          <div style={{ alignSelf: 'flex-start', paddingLeft: '2rem' }}>
            <Body3 color={Grey4}>진행중인 상담이 없어요</Body3>
            <Space height="1.6rem" />
          </div>
        ) : (
          consult?.map((item: any) => (
            <OngoingCounsultBox
              key={item?.id}
              consultStatus={item?.status}
              counselorName={item?.opponentNickname}
              beforeMinutes={null}
              content={
                item?.status === '상담 대기'
                  ? '상담 대기 상태입니다! 상담이 승인될 떄가지 기다려주세요.'
                  : item?.lastMessageContent
              }
              newMessageCounts={1}
              counselorprofileStatus={consultStyleToCharNum(item?.consultStyle)}
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
