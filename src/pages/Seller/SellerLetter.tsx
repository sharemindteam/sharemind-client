import { LetterHeader } from 'components/Seller/SellerLetter/LetterHeader';
import { LetterQuestionStep } from 'components/Seller/SellerLetter/LetterQuestionStep';
import { LetterTagListSection } from 'components/Seller/SellerLetter/LetterTagListSection';

export const SellerLetter = () => {
  return (
    <>
      <LetterHeader />
      <LetterTagListSection />
      <LetterQuestionStep
        isArrive={true}
        time="2023년 10월 23일 오후 12시 34분"
        questionMsg="일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기일단 구현하기"
      />
    </>
  );
};
