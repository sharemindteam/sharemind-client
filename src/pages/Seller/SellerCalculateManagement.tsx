import { ManagementHeader } from 'components/Seller/SellerCalculateManagement/ManagementHeader';
import styled from 'styled-components';
import { useState } from 'react';
import { ManagementStatusSelector } from 'components/Seller/SellerCalculateManagement/ManagementStatusSelector';
import { Heading, Subtitle } from 'styles/font';
import { Red } from 'styles/color';
import { SellerCalulateCard } from 'components/Seller/SellerCalculateManagement/SellerCalculateCard';

export const SellerCaculateManagement = () => {
  const [manageStatus, setManageStatus] = useState<string>('완료');
  return (
    <>
      <ManagementHeader />
      <ManagementStatusSelector
        manageStatus={manageStatus}
        setManageStatus={setManageStatus}
      />
      <TotalEarnMoney>
        <Heading>
          {manageStatus === '완료'
            ? '완료 금액 합계'
            : manageStatus === '진행 중'
            ? '정산 중 금액 합계'
            : '예정 금액 합계'}
        </Heading>
        <Subtitle color={Red}>100,000 원</Subtitle>
      </TotalEarnMoney>

      <SellerCalculateCardList>
        {/* //정산 예정일 걸릴경우 calculateActivate false true로~*/}
        <SellerCalulateCard
          customerName="정인영"
          calculateActivate={true}
          consultType="편지"
          netProfit={3000}
          commission={1000}
          paymentAccount="카카오뱅크 123-2342244"
          paymentDate="2024.01.05"
          salePrice={4000}
        />

        <SellerCalulateCard
          customerName="이규호"
          calculateActivate={false}
          consultType="채팅"
          netProfit={3000}
          commission={1000}
          paymentAccount="카카오뱅크 123-2342244"
          paymentDate="2024.01.05"
          salePrice={4000}
        />
      </SellerCalculateCardList>
    </>
  );
};

const TotalEarnMoney = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 2.8rem 2rem 1.2rem;
`;

const SellerCalculateCardList = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.4rem 2rem;
  flex-direction: column;
`;
