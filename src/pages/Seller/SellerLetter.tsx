import { LetterBonusQuestionStep } from 'components/Seller/SellerLetter/LetterBonusQuestionStep';
import { LetterBonusReplyStep } from 'components/Seller/SellerLetter/LetterBonusReplyStep';
import { LetterComplaintMenu } from 'components/Seller/SellerLetter/LetterComplaintMenu';
import { LetterHeader } from 'components/Seller/SellerLetter/LetterHeader';
import { LetterQuestionStep } from 'components/Seller/SellerLetter/LetterQuestionStep';
import { LetterReplyStep } from 'components/Seller/SellerLetter/LetterReplyStep';
import { LetterTagListSection } from 'components/Seller/SellerLetter/LetterTagListSection';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isConsultModalOpenState, scrollLockState } from 'utils/atom';

export const SellerLetter = () => {
  // 질문, 답장, 추가질문 , 추가답장 : 0,1,2,3
  const [tagStatus, setTagStatus] = useState<number>(0);

  // 신고하기 활성화 여부
  const [isActiveComplaint, setIsComplaint] = useState<boolean>(false);

  // 신고하기 팝업 뜨게할지 여부
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  );
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
  return (
    <>
      <LetterHeader />
      <LetterTagListSection tagStatus={tagStatus} setTagStatus={setTagStatus} />
      {/* 질문, 답장, 추가질문, 추가답장탭 */}
      {tagStatus === 0 ? (
        <LetterQuestionStep
          isArrive={true}
          time="2023년 10월 23일 오후 12시 34분"
          questionMsg="일단 구현하기일단 구현하기일단 구현하기일단 구현일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기"
        />
      ) : tagStatus === 1 ? (
        <LetterReplyStep
          isArrive={false}
          time="2023년 10월 23일 오후 12시 34분"
          deadline="2023년 12월 23일 00시"
          replyMsg="으아아아아악"
        />
      ) : tagStatus === 2 ? (
        <LetterBonusQuestionStep
          isArrive={false}
          time="2023년 10월 23일 오후 12시 34분"
          questionMsg="일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기"
        />
      ) : (
        <LetterBonusReplyStep
          isArrive={false}
          time="2023년 10월 23일 오후 12시 34분"
          deadline="2023년 12월 23일 00시"
          replyMsg="으아아아아악"
        />
      )}

      {isModalOpen ? (
        <>
          <BackDrop
            onClick={() => {
              setIsModalOpen(false);
              setScrollLock(false);
            }}
          />
          <LetterComplaintMenu
            isActiveComplaint={isActiveComplaint}
            setIsActiveComplaint={setIsComplaint}
          />
        </>
      ) : null}
    </>
  );
};
const BackDrop = styled.div`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  position: fixed;
  top: 0;
  z-index: 2001;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
`;
