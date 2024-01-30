import styled from 'styled-components';

import React from 'react';
import { Body3 } from 'styles/font';
import { Button } from 'components/Common/Button';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isTakingQuizModalOpenState } from 'utils/atom';
interface VerifyMaterialButtonProps {
  level: number;
}
function VerifyMaterialButton({ level }: VerifyMaterialButtonProps) {
  const navigate = useNavigate();
  const setIsTakingQuizModalOpen = useSetRecoilState(
    isTakingQuizModalOpenState,
  );
  if (level === 1) {
    return (
      <VerifyMaterialButtonWrapper>
        <Body3 color={Grey4}>
          내용을 충분히 숙지해주세요. 간단한 퀴즈가 진행됩니다.
        </Body3>
        <Button
          text={'다음'}
          width="100%"
          backgroundColor={Green}
          height="5.2rem"
          onClick={() => {
            navigate('/minder/education/second');
          }}
        />
      </VerifyMaterialButtonWrapper>
    );
  } else if (level === 2) {
    return (
      <VerifyMaterialButtonWrapper>
        <Body3 color={Grey4}>
          내용을 충분히 숙지해주세요. 간단한 퀴즈가 진행됩니다.
        </Body3>
        <div className="buttons">
          <Button
            text={'이전'}
            width="100%"
            backgroundColor={LightGreen}
            color={Green}
            height="5.2rem"
            onClick={() => {
              navigate('/minder/education/first');
            }}
          />
          <Button
            text={'다음'}
            width="100%"
            backgroundColor={Green}
            height="5.2rem"
            onClick={() => {
              navigate('/minder/education/third');
            }}
          />
        </div>
      </VerifyMaterialButtonWrapper>
    );
  } else if (level === 3) {
    return (
      <VerifyMaterialButtonWrapper>
        <Body3 color={Grey4}>
          내용을 충분히 숙지해주세요. 간단한 퀴즈가 진행됩니다.
        </Body3>
        <div className="buttons">
          <Button
            text={'이전'}
            width="100%"
            backgroundColor={LightGreen}
            color={Green}
            height="5.2rem"
            onClick={() => {
              navigate('/minder/education/second');
            }}
          />
          <Button
            text={'다음'}
            width="100%"
            backgroundColor={Green}
            height="5.2rem"
            onClick={() => {
              navigate('/minder/education/final');
            }}
          />
        </div>
      </VerifyMaterialButtonWrapper>
    );
  } else if (level === 4) {
    return (
      <VerifyMaterialButtonWrapper>
        {' '}
        <div className="buttons">
          <Button
            text={'이전'}
            width="100%"
            backgroundColor={LightGreen}
            color={Green}
            height="5.2rem"
            onClick={() => {
              navigate('/minder/education/third');
            }}
          />
          <Button
            text={'퀴즈 응시하기'}
            width="100%"
            backgroundColor={Green}
            height="5.2rem"
            onClick={() => {
              setIsTakingQuizModalOpen(true);
            }}
          />
        </div>
      </VerifyMaterialButtonWrapper>
    );
  }
}

export default VerifyMaterialButton;
const VerifyMaterialButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.6rem;
  padding-bottom: 1.6rem;
  background-color: ${White};
  position: fixed;
  bottom: 0;

  // 이전, 다음버튼처럼 2개일 때
  .buttons {
    display: flex;
    justify-content: center;
    gap: 0.7rem;
    width: 100%;
  }
  @media (max-width: 767px) {
    width: calc(100% - 4rem);
  }
  @media (min-width: 768px) {
    width: calc(375px - 4rem);
  }
`;
