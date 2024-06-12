import React from 'react';
import styled from 'styled-components';
import { ReactComponent as VerifyFailIcon } from 'assets/icons/graphic-verify-fail.svg';
import { BottomButtonWrapper } from '../Common/BottomButton';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/Common/Button';
import { Green } from 'styles/color';
//
//
//
function VerifyFail() {
  const navigate = useNavigate();
  return (
    <>
      <VerifyFailSection>
        <VerifyFailGraphic />
        <FailMessage>마인더 인증 실패</FailMessage>
        <GuideMessage>
          교육자료를 꼼꼼히 읽고 다시 퀴즈에 응시해보아요. <br />
          퀴즈는 24시간이 지나고 재응시할 수 있어요.
        </GuideMessage>
        <BottomButtonWrapper>
          <Button
            onClick={() => {
              navigate('/minder');
            }}
            text="홈으로 가기"
            width="calc(100% - 4rem)"
            backgroundColor={Green}
            height="5.2rem"
          />
        </BottomButtonWrapper>
      </VerifyFailSection>
    </>
  );
}
//
//
//
const VerifyFailSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GuideMessage = styled.div`
  font-family: Pretendard;
  margin-top: 1.2rem;
  text-align: center;
  font-size: 1.6rem;h
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const VerifyFailGraphic = styled(VerifyFailIcon)`
  margin-top: 16.4rem;
`;
const FailMessage = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3rem; /* 150% */
`;

export default VerifyFail;
