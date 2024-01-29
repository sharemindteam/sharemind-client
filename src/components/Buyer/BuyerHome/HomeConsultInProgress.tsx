import styled from 'styled-components';
import { Red } from 'styles/color';
import { Body1, Subtitle } from 'styles/font';
import { ReactComponent as More } from 'assets/icons/icon-more.svg';
import { ConsultCard } from '../Common/ConsultCard';
import { useNavigate } from 'react-router-dom';
import { ConsultState } from 'utils/type';
export const HomeConsultInProgress = () => {
  const navigate = useNavigate();
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
          <Body1 color={Red}>8</Body1>
        </NavConsult>
        <MoreIcon />
      </div>
      {/* <ConsultCard
        consultId={0}
        name={CounselorName}
        consultState={ConsultState}
        time={Time}
        content={ContentText}
        unread={unreadNumber}
      /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1.2rem;
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
