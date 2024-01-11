import React from 'react';
import styled from 'styled-components';
import { ReactComponent as VerifySuccessIcon } from 'assets/icons/grahpic-verify-success.svg';
import { BottomButtonWrapper } from '../Common/BottomButton';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/Common/Button';
import { Green } from 'styles/color';
function VerifySuccess() {
  const navigate = useNavigate();
  return (
    <>
      <VerifySuccessSection>
        <VerifySuccessGraphic />
        <FailMessage>마인더 인증 성공!</FailMessage>
        <GuideMessage>
          퀴즈를 잘 푸셔서 마인더로 인증되었어요.
          <br />
          판매정보를 작성하고 마인더로 활동해보아요.
        </GuideMessage>
        <BottomButtonWrapper>
          <Button
            onClick={() => {
              navigate('/seller/mypage/modifyProfile');
            }}
            text="판매정보 작성하기"
            width="calc(100% - 4rem)"
            backgroundColor={Green}
            height="5.2rem"
          />
        </BottomButtonWrapper>
      </VerifySuccessSection>
    </>
  );
}
const VerifySuccessSection = styled.div`
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
const VerifySuccessGraphic = styled(VerifySuccessIcon)`
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

export default VerifySuccess;
