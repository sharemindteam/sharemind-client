import AppHeader from 'components/Common/AppHeader';
import { Flex } from 'components/Common/Flex';
import Input from 'components/Common/Input';
import { BottomButton } from 'components/Seller/Common/BottomButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading } from 'styles/font';

//
//
//

export default function SellerUpdateFail() {
  const navigate = useNavigate();
  const onBackClick = () => {
    navigate('/minder/mypage');
  };
  const handleClickButton = () => {
    navigate('/minder/mypage/viewProfile');
  };
  return (
    <>
      <AppHeader title="내 정보" onBackClick={onBackClick} />
      <Flex direction="column" padding="2rem" align="flex-start" gap={'2rem'}>
        <Heading>거절 사유</Heading>
        <Input
          width="100%"
          isBoxSizing={true}
          padding="1.6rem"
          value={'부적절한 자기소개'}
          fontWeight="400"
          fontSize="1.6rem"
          readOnly={true}
        />
      </Flex>

      <BottomButton
        text="판매정보 수정하기"
        onClick={handleClickButton}
      ></BottomButton>
    </>
  );
}
