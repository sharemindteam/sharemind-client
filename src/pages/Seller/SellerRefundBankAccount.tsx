import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { Button } from 'components/Common/Button';
import Input from 'components/Common/Input';
import { Space } from 'components/Common/Space';
import { BottomButtonWrapper } from 'components/Seller/Common/BottomButton';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1, Grey3 } from 'styles/color';
import { Body1, Body3, Heading } from 'styles/font';

function SellerRefundBankAccount() {
  const navigate = useNavigate();
  const [bankInfo, setBankInfo] = useState({
    accountNum: '',
    bankType: '',
    name: '',
  });

  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/seller/setting');
          }}
        />
        <Heading color={Grey1}>환불계좌 관리</Heading>
      </HeaderWrapper>
      <Space height="0.8rem" />
      <Form>
        <div className="account-num">
          <Body1 color={Grey3}>계좌번호</Body1>
          <Input
            width="100%"
            height="4.8rem"
            isBoxSizing={true}
            padding="1rem 1.6rem"
          />
        </div>
        <div className="bank-type">
          <Body1 color={Grey3}>은행</Body1>
          <Input
            width="100%"
            height="4.8rem"
            isBoxSizing={true}
            padding="1rem 1.6rem"
          />
        </div>
        <div className="name">
          <Body1 color={Grey3}>이름</Body1>
          <Input
            width="100%"
            height="4.8rem"
            isBoxSizing={true}
            padding="1rem 1.6rem"
          />
        </div>
      </Form>

      <BottomButtonWrapper>
        <Button
          text="완료"
          width="calc(100% - 4rem)"
          height="5.2rem"
          isActive={false}
        />
      </BottomButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
  gap: 1.8rem;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
`;

export default SellerRefundBankAccount;
