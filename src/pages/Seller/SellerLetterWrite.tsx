import { getDraftsLetter, getLetterRecentType } from 'api/get';
import { LetterWriteHeader } from 'components/Seller/SellerLetterWrite/LetterWriteHeader';
import { LetterWriteMainSection } from 'components/Seller/SellerLetterWrite/LetterWriteMainSection';
import { LetterWriteSuccess } from 'components/Seller/SellerLetterWrite/LetterWriteSuccess';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const SellerLetterWrite = () => {
  // 편지 전송 완료 페이지 띄울지 여부
  const [isSend, setIsSend] = useState<boolean>(false);
  // 셰어로부터 질문 한눈에 보기 여부
  const [isViewQuestion, setIsViewQuestion] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <>
      <LetterWriteHeader
        setIsViewQuestion={setIsViewQuestion}
        isViewQuestion={isViewQuestion}
      />
      {isSend ? (
        <LetterWriteSuccess />
      ) : (
        <LetterWriteMainSection
          setIsViewQuestion={setIsViewQuestion}
          setIsSend={setIsSend}
          isViewQuestion={isViewQuestion}
        />
      )}
    </>
  );
};
