import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Green, Grey1, Grey2, Grey3, Grey6 } from 'styles/color';
import { Body1, Caption1, Caption2 } from 'styles/font';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import {
  isBuyPopupOpenState,
  isConsultModalOpenState,
  scrollLockState,
} from 'utils/atom';
import { ReactComponent as LockIcon } from 'assets/icons/icon-lock.svg';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
import { ReactComponent as HeartEmptyIcon } from 'assets/icons/icon-heart3.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/icon-save2.svg';
import { ReactComponent as SaveEmptyIcon } from 'assets/icons/icon-save3.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/icon-comment.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-check2.svg';
import { ReactComponent as WriteIcon } from 'assets/icons/icon-write.svg';
import { Space } from 'components/Common/Space';
import { BackDrop } from 'components/Common/BackDrop';
import IsBuyPopup from './IsBuyPopup';

function BuyerOpenConsultSection() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  );
  const setScrollLock = useSetRecoilState(scrollLockState);
  const [isBuyPopupOpen, setIsBuyPopupOpen] =
    useRecoilState(isBuyPopupOpenState);
  const handleWritePostButton = () => {
    setIsBuyPopupOpen(true);
  };
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
        <BuyerOpenConsultCardList>
          {/* 상담카드 부분 */}
          <BuyerOpenConsultCard>
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
            <div className="row3">
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
            <TimeLeft>8분 전</TimeLeft>
          </BuyerOpenConsultCard>
          {/* 상담카드 부분 */}
        </BuyerOpenConsultCardList>
      )}{' '}
      {isBuyPopupOpen && (
        <>
          <BackDrop />
          <IsBuyPopup />
        </>
      )}
      <CreateConsultButtonWrapper>
        <CreateConsultButton onClick={handleWritePostButton}>
          <WriteIcon />
        </CreateConsultButton>
      </CreateConsultButtonWrapper>
    </>
  );
}

const BuyerOpenConsultCardList = styled.div`
  display: flex;
  margin: 1.2rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
`;

const BuyerOpenConsultCard = styled.div`
  width: 100%;
  height: 14rem;
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
    gap: 1.2rem;
  }
`;
const IconItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HeartResizeIcon = styled(HeartIcon)`
  width: 2rem;
  height: 2rem;
`;

const PrivateSign = styled.div`
  display: flex;
  position: absolute;
  top: 1.95rem;
  right: 1.6rem;
`;

const TimeLeft = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${Grey2};
  position: absolute;
  bottom: 1.8rem;
  right: 1.6rem;
`;

const CreateConsultButton = styled.button`
  width: 5.8rem;
  height: 5.8rem;
  border-radius: 100%;
  background-color: ${Green};
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
  align-self: flex-end;
`;
const CreateConsultButtonWrapper = styled.div`
  width: 100%;
  padding: 0 3.3rem;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  bottom: 3.5rem;
  flex-direction: column;
  @media (min-width: 768px) {
    width: 375px;
  }
`;

export default BuyerOpenConsultSection;
