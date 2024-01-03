import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as RightArrow } from 'assets/icons/right-arrow.svg';
import { Black, Red } from 'styles/color';
import { Body1, Heading } from 'styles/font';
import OngoingCounslutBox from 'components/Common/OngoingCounsultBox';
export const SellerHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="main-seller">
        <Header
          isBuyer={false}
          onClick={() => {
            navigate('/seller');
          }}
        />
        <TabA1 isBuyer={false} initState={1} />
        <ContentTag>
          <Heading color={Black}>진행중인 상담</Heading>
          <Body1 color={Red} margin="0px auto 0px 0px">
            5
          </Body1>
          <RightArrow />
        </ContentTag>
        <OngoingCounslutBoxList>
          <OngoingCounslutBox
            consultStatus="상담 중"
            counselorName="연애상담마스터"
            beforeMinutes="8분 전"
            content="연애상담마스터님께 고민 내용을 남겨주세요. 연애상담마스터님이 24시간"
            newMessageCounts="1"
            counselorprofileStatus={1}
          />{' '}
          <OngoingCounslutBox
            consultStatus="상담 중"
            counselorName="연애상담마스터"
            beforeMinutes="8분 전"
            content="연애 상담마스터님께 고민 내용을 남겨주세요. 연애 상담마스터님이 어쩌구"
            newMessageCounts="1"
            counselorprofileStatus={2}
          />{' '}
          <OngoingCounslutBox
            consultStatus="상담 중"
            counselorName="연애상담마스터"
            beforeMinutes="8분 전"
            content="연애 상담마스터님께 고민 내용을 남겨주세요. 연애 상담마스터님이 어쩌구"
            newMessageCounts="1"
            counselorprofileStatus={3}
          />
        </OngoingCounslutBoxList>
        <ContentTag>
          <Heading color={Black} margin="0px auto 0px 0px">
            수익 관리
          </Heading>

          <RightArrow />
        </ContentTag>{' '}
        <ContentTag>
          <Heading color={Black} margin="0px auto 0px 0px">
            상담 후기
          </Heading>

          <RightArrow />
        </ContentTag>
      </section>
    </>
  );
};

const ContentTag = styled.div`
  display: flex;
  gap: 0.8rem;
  margin: 2.2rem 3.2rem 2.2rem 2rem;
  align-items: center;
`;

const OngoingCounslutBoxList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;
