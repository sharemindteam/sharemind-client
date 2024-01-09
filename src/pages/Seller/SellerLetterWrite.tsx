import { LetterWriteHeader } from 'components/Seller/SellerLetterWrite/LetterWriteHeader';
import { LetterWriteMainSection } from 'components/Seller/SellerLetterWrite/LetterWriteMainSection';
import { LetterWriteSuccess } from 'components/Seller/SellerLetterWrite/LetterWriteSuccess';
import { useEffect, useState } from 'react';

export const SellerLetterWrite = () => {
  // 답장 제출했을 경우, 즉 편지보냈어요 띄울지여부
  const [isSend, setIsSend] = useState<boolean>(false);

  // 질문보기여부
  const [isViewQuestion, setIsViewQuestion] = useState<boolean>(false);

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
