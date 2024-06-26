import { getCounselorsAccount } from 'api/get';
import { patchCounselorsAccount } from 'api/patch';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { BackDrop } from 'components/Common/BackDrop';
import { Button } from 'components/Common/Button';
import Input from 'components/Common/Input';
import { Space } from 'components/Common/Space';
import BankSelectModal from 'components/Seller/Common/BankSelectModal';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { APP_WIDTH } from 'styles/AppStyle';
import { Grey1, Grey6 } from 'styles/color';
import { Body1, Heading } from 'styles/font';
import { BankIcon } from 'utils/BankIcon';
import { isBankModalOpenState } from 'utils/atom';

//
//
//

function SellerProfitBankAccount() {
  const navigate = useNavigate();
  const [accountNum, setAccountNum] = useState<string>('');
  const [bankType, setBankType] = useState<string>('');
  const [owner, setOwner] = useState<string>('');

  // 완료버튼 활성화 여부
  const isActiveFinishButton =
    accountNum?.length > 0 && bankType?.length > 0 && owner?.length > 0;

  // 은행 모달
  const [isBankModalOpen, setIsBankModalOpen] =
    useRecoilState(isBankModalOpenState);

  //
  //
  //
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const res: any = await getCounselorsAccount();
        if (res.status === 200) {
          setAccountNum(res.data.account);
          setBankType(res.data.bank);
          setOwner(res.data.accountHolder);
        }
      } catch (err) {
        alert(err);
      }
    };

    fetchAccountData();
  }, []);

  /**
   *
   */
  const handleAccountNumChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const sanitizedValue = value.replace(/[^0-9]/g, '');
      setAccountNum(sanitizedValue);
    },
    [],
  );

  /**
   *
   */
  const handlePostAccountInfo = useCallback(async () => {
    if (accountNum !== '' && bankType !== '' && owner !== '') {
      const body = {
        account: accountNum,
        bank: bankType,
        accountHolder: owner,
      };
      try {
        const res: any = await patchCounselorsAccount(body);
        if (res.status === 200) {
          navigate('/minder/mypage');
        } else {
          alert('수익계좌 업데이트 중 오류가 발생했습니다.');
        }
      } catch (err) {
        alert(err);
      }
    }
  }, [accountNum, bankType, owner, navigate]);

  //
  //
  //

  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/minder/setting');
          }}
        />
        <Heading color={Grey1}>수익계좌 관리</Heading>
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
            placeholder="계좌번호를 입력해주세요 (숫자만)"
          />
        </div>
        <div className="bank-type">
          <Body1>은행</Body1>
          <BankTypeInput
            onClick={() => {
              setIsBankModalOpen(true);
            }}
          >
            {bankType && <BankIcon bankType={bankType} />}
            <Body1>{bankType ?? '은행을 선택해주세요.'}</Body1>
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
            placeholder="예금주명을 입력해주세요. (예: 김00)"
          />
        </div>
      </Form>

      <ButtonWrapper>
        <Button
          text="완료"
          width="100%"
          height="5.2rem"
          isActive={isActiveFinishButton ? true : false}
          onClick={() => {
            handlePostAccountInfo();
          }}
        />
      </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }

  padding: 0.8rem 2rem 1.2rem 2rem;
  box-sizing: border-box;
`;

export default SellerProfitBankAccount;
