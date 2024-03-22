import React, { useState } from 'react';
import styled from 'styled-components';
import { Green, Grey1, Grey2, Grey3, Grey6, Red, White } from 'styles/color';
import { Body1, Caption1, Caption2 } from 'styles/font';
import { ReactComponent as LockIcon } from 'assets/icons/icon-lock.svg';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/icon-save2.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/icon-comment.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-check2.svg';
import { Space } from 'components/Common/Space';
import { LoadingSpinner } from 'utils/LoadingSpinner';
function SellerOpenConsultList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchOpenConsultData = async () => {};
  return (
    <>
      {isLoading ? (
        <div
          style={{
            height: 'calc(100vh - 46rem)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <SellerOpenConsultCardList>
          <GuideMessage>
            <Caption2 color={Green}>
              내가 댓글을 작성한 글의 목록입니다.
            </Caption2>
          </GuideMessage>
          <SellerOpenConsultCard>
            <div className="row1">
              <Body1>이거 권태기 증상 맞나요?</Body1>
              <PrivateSign>
                <LockIcon />
                <Caption1 color={Grey3}>비공개</Caption1>
              </PrivateSign>
            </div>
            <Space height="1.2rem" />
            <div className="row2">
              요즘따라 여자친구가 먼저 만나자고 이야기도 안 하고 만나면
              피곤하다고만 해요. 스킨십도 하려고 하지 않고 인생이 재미가
              없다네요.. 그런데 여자친구가 다른 남자 인스타 피드에는 좋아요를
              눌러요... 이거 여자친구가 권태기가 맞는 걸까요? 맞다면 어떻게
              이야기를 꺼내면 좋을까요? 너무 힘듭니다..
            </div>
            <Space height="0.8rem" />
            <div className="row3">
              <Caption2 color={Grey2}>2024.12.13</Caption2>
              <Circle />
              <Caption2 color={Grey2}>연애갈등</Caption2>
            </div>
            <Space height="1rem" />
            <div className="row4">
              <IconItem>
                <HeartResizeIcon />
                <Caption1 color={Grey2}>28</Caption1>
              </IconItem>
              <IconItem>
                <SaveIcon />
                <Caption1 color={Grey2}>28</Caption1>
              </IconItem>
              <IconItem>
                <CommentIcon />
                <Caption1 color={Grey2}>28</Caption1>
              </IconItem>
            </div>

            <SharePickSign>
              <CheckIcon />
              <Caption1 color={White}>셰어 Pick</Caption1>
            </SharePickSign>
          </SellerOpenConsultCard>
        </SellerOpenConsultCardList>
      )}
    </>
  );
}

const GuideMessage = styled.div`
  width: 100%;
  height: 3.1rem;
  background-color: ${Grey6};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
`;
const SellerOpenConsultCardList = styled.div`
  display: flex;
  margin: 0 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
`;
const SellerOpenConsultCard = styled.div`
  width: 100%;
  height: 17.5rem;
  position: relative;
  background-color: ${Grey6};
  padding: 1.6rem;
  box-sizing: border-box;
  border-radius: 1.2rem;
  .row2 {
    display: -webkit-box;
    max-height: 4.7rem;
    -webkit-box-orient: vertical;
    overflow: hidden;
    align-self: flex-end;
    margin-bottom: 0.4rem;
    -webkit-line-clamp: 2;
    color: ${Grey1};
    height: 4.6rem;
    text-overflow: ellipsis;
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
  .row4 {
    display: flex;
    gap: 1.2rem;
  }
`;

const PrivateSign = styled.div`
  display: flex;
  position: absolute;
  top: 1.95rem;
  right: 1.6rem;
`;

const SharePickSign = styled.div`
  background-color: ${Red};
  position: absolute;
  display: flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  gap: 0.4rem;
  border-radius: 0.8rem;
  bottom: 1.6rem;
  right: 1.4rem;
`;
const IconItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Circle = styled.div`
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 100%;
  background-color: ${Grey3};
`;

const HeartResizeIcon = styled(HeartIcon)`
  width: 2rem;
  height: 2rem;
`;
export default SellerOpenConsultList;
