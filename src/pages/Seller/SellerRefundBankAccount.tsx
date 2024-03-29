import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { BackDrop } from 'components/Common/BackDrop';
import { Button } from 'components/Common/Button';
import Input from 'components/Common/Input';
import { Space } from 'components/Common/Space';
import BankSelectModal from 'components/Seller/Common/BankSelectModal';
import { BottomButtonWrapper } from 'components/Seller/Common/BottomButton';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Grey1, Grey3, Grey6 } from 'styles/color';
import { Body1, Body3, Heading } from 'styles/font';
import { BankIcon } from 'utils/BankIcon';
import { isBankModalOpenState } from 'utils/atom';

function SellerRefundBankAccount() {
  const navigate = useNavigate();
  const [accountNum, setAccountNum] = useState('');
  const [bankType, setBankType] = useState('');
  const [owner, setOwner] = useState('');
  // 은행 모달
  const [isBankModalOpen, setIsBankModalOpen] =
    useRecoilState(isBankModalOpenState);

  const [isActiveFisnishButton, setIsActiveFinishButton] = useState(false);
  useEffect(() => {
    // API 요청
    setAccountNum('12345678900');
    setBankType('우리은행');
    setOwner('김고민');
  }, []);

  useEffect(() => {
    if (accountNum !== '' && bankType !== '' && owner !== '') {
      setIsActiveFinishButton(true);
    } else {
      setIsActiveFinishButton(false);
    }
  }, [accountNum, bankType, owner]);

  const handleAccountNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    setAccountNum(sanitizedValue);
  };

  const handlePostAccountInfo = () => {
    // 임시조건
    if (accountNum !== '' && bankType !== '' && owner !== '') {
      //서버로 POST
    }
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/minder/setting');
          }}
        />
        <Heading color={Grey1}>환불계좌 관리</Heading>
      </HeaderWrapper>
      <Space height="0.8rem" />
      <Form>
        <div className="account-num">
          <Body1>계좌번호</Body1>
          <Input
            width="100%"
            height="4.8rem"
            isBoxSizing={true}
            padding="1rem 1.6rem"
            value={accountNum}
            onChange={handleAccountNumChange}
          />
        </div>
        <div className="bank-type">
          <Body1>은행</Body1>
          <BankTypeInput
            onClick={() => {
              setIsBankModalOpen(true);
            }}
          >
            <BankIcon bankType={bankType} />
            <Body1>{bankType}</Body1>
          </BankTypeInput>
        </div>
        <div className="name">
          <Body1>예금주</Body1>
          <Input
            width="100%"
            value={owner}
            onChange={(e) => {
              setOwner(e.target.value);
            }}
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
          isActive={isActiveFisnishButton ? true : false}
          onClick={() => {
            handlePostAccountInfo();
            navigate('/minder/setting');
          }}
        />
      </BottomButtonWrapper>
      {isBankModalOpen && (
        <>
          <BackDrop /> <BankSelectModal setSelectBankType={setBankType} />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const BankTypeInput = styled.div`
  display: flex;
  border-radius: 1.2rem;
  background: ${Grey6};
  cursor: pointer;
  gap: 0.8rem;
  box-sizing: border-box;
  padding: 1.2rem 1.6rem;
`;
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
