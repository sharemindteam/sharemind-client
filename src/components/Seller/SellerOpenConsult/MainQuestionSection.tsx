import React, { useState } from 'react';
import styled from 'styled-components';
import { Grey1, Grey2, Grey3, Grey6 } from 'styles/color';
import { ReactComponent as LockIcon } from 'assets/icons/icon-lock.svg';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart1.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/icon-save2.svg';
import { ReactComponent as HeartEmptyIcon } from 'assets/icons/icon-heart3.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/icon-comment.svg';
import { ReactComponent as SaveEmptyIcon } from 'assets/icons/icon-save3.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-check2.svg';
import { Body1, Caption1, Caption2 } from 'styles/font';
import { Space } from 'components/Common/Space';
function MainQuestionSection() {
  const [isSave, setIsSave] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  return (
    <MainQuestionWrapper>
      <MainQuestionText>
        <div className="row1">
          <Body1>이거 권태기 증상 맞나요?</Body1>
          <PrivateSign>
            <LockIcon />
            <Caption1 color={Grey3}>비공개</Caption1>
          </PrivateSign>
        </div>
        <Space height="1.2rem" />
        <div className="row2">
          요즘따라 여자친구가 먼저 만나자고 이야기도 안 하고 만나면 피곤하다고만
          해요. 스킨십도 하려고 하지 않고 인생이 재미가 없다네요.. 그런데
          여자친구가 다른 남자 인스타 피드에는 좋아요를 눌러요... 이거
          여자친구가 권태기가 맞는 걸까요? 맞다면 어떻게 이야기를 꺼내면
          좋을까요? 너무 힘듭니다..
        </div>
        <Space height="0.8rem" />
        <div className="row3">
          <Caption2 color={Grey2}>2024.12.13</Caption2>
          <Circle />
          <Caption2 color={Grey2}>연애갈등</Caption2>
        </div>
        <Space height="1rem" />
      </MainQuestionText>
      <ButtonList>
        <ButtonItem>
          {isLike ? (
            <HeartIcon
              onClick={() => {
                setIsLike(false);
              }}
            />
          ) : (
            <HeartEmptyIcon
              onClick={() => {
                setIsLike(true);
              }}
            />
          )}

          <Caption1 color={Grey2}>11</Caption1>
        </ButtonItem>
        <ButtonItem>
          {isSave ? (
            <SaveResizeIcon
              onClick={() => {
                setIsSave(false);
              }}
            />
          ) : (
            <SaveEmptyIcon
              onClick={() => {
                setIsSave(true);
              }}
            />
          )}

          <Caption1 color={Grey2}>0</Caption1>
        </ButtonItem>
      </ButtonList>
    </MainQuestionWrapper>
  );
}
const MainQuestionWrapper = styled.section`
  display: flex;
  padding: 1.2rem 2rem;
  flex-direction: column;
  gap: 1.2rem;
  border-bottom: 1px solid ${Grey6};
`;

const MainQuestionText = styled.div`
  width: 100%;
  position: relative;
  background-color: ${Grey6};
  padding: 1.6rem;
  box-sizing: border-box;
  border-radius: 1.2rem;
  .row2 {
    align-self: flex-end;
    margin-bottom: 0.4rem;
    color: ${Grey1};
    font-family: Pretendard;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 155%;
  }
  .row3 {
    display: flex;
    gap: 0.8rem;
    align-items: center;
  }
`;
const PrivateSign = styled.div`
  display: flex;
  position: absolute;
  top: 1.95rem;
  right: 1.6rem;
`;
const Circle = styled.div`
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 100%;
  background-color: ${Grey3};
`;

const ButtonList = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const ButtonItem = styled.div`
  border-radius: 0.8rem;
  background: ${Grey6};
  display: flex;
  padding: 0.6rem 1.2rem 0.6rem 0.6rem;
  align-items: center;
  gap: 0.4rem;
`;

const SaveResizeIcon = styled(SaveIcon)`
  width: 2rem;
  height: 2rem;
`;
export default MainQuestionSection;
