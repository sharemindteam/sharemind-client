import styled from 'styled-components';
import { Green, Grey6 } from 'styles/color';
import { Body1, Subtitle } from 'styles/font';
import { ReactComponent as More } from 'assets/icons/icon-more.svg';

import { ConsultCard } from '../Common/ConsultCard';
export const ConsultInProgress = () => {
  //얘네 props로 넘겨준다, 나중에 api
  const CounselorName = '연애상담마스터';
  const ConsultState: BuyerConsultState = '답변 도착';
  const Time = '8분전';
  //일정 크기 넘어가면 ...처리
  const ContentText =
    '연애상담마스터님께 고민 내용을 남겨 주세요. 연애상담마스터님이 24시간 어쩌구 블라블라 주저리 주저리주저리 주저리주저리 주저리주저리 주저리주저리 주저리주저리 ';

  return (
    <Wrapper>
      <div className="nav-consult">
        <NavConsult>
          <Subtitle>진행 중인 상담</Subtitle>
          {/* 나중에 api */}
          <Body1 color={Green}>8</Body1>
        </NavConsult>
        <MoreIcon />
      </div>
      <ConsultCard
        name={CounselorName}
        consultState={ConsultState}
        time={Time}
        content={ContentText}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  border-bottom: 1px solid ${Grey6};
  .nav-consult {
    width: 100%;
    height: 4.4rem;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 0.4rem;
  }
`;
const NavConsult = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.9rem;
  margin-left: 2rem;
`;
const MoreIcon = styled(More)`
  margin-right: 3.8rem;
  margin-top: 1.5rem;
`;
