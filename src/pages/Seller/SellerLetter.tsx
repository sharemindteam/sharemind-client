import { LetterBonusQuestionStep } from 'components/Seller/SellerLetter/LetterBonusQuestionStep';
import { LetterBonusReplyStep } from 'components/Seller/SellerLetter/LetterBonusReplyStep';
import { LetterHeader } from 'components/Seller/SellerLetter/LetterHeader';
import { LetterQuestionStep } from 'components/Seller/SellerLetter/LetterQuestionStep';
import { LetterReplyStep } from 'components/Seller/SellerLetter/LetterReplyStep';
import { LetterTagListSection } from 'components/Seller/SellerLetter/LetterTagListSection';
import { useState } from 'react';

export const SellerLetter = () => {
  const [tagStatus, setTagStatus] = useState<number>(0);
  return (
    <>
      <LetterHeader />
      <LetterTagListSection tagStatus={tagStatus} setTagStatus={setTagStatus} />
      {/* 질문, 답장, 추가질문, 추가답장탭 */}
      {tagStatus === 0 ? (
        <LetterQuestionStep
          isArrive={true}
          time="2023년 10월 23일 오후 12시 34분"
          questionMsg="일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기"
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
    </>
  );
};
