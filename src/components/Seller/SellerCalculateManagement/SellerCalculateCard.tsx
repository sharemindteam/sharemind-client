import { Button } from 'components/Common/Button';
import styled from 'styled-components';
import { Grey3, Grey6, Green,  White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';

interface SellerCalulateCardProps {
  customerName: string;
  consultType: string;
  netProfit: number;
  salePrice: number;
  commission: number;
  paymentDate: string;
  paymentAccount: string;
  calculateActivate: boolean;
}

export const SellerCalulateCard = ({
  customerName,
  consultType,
  netProfit,
  salePrice,
  commission,
  paymentAccount,
  paymentDate,
  calculateActivate,
}: SellerCalulateCardProps) => {
  return (
    <SellerCalulateCardWrapper>
      <CustomerConsultType>
        <Body1>
          <span style={{ color: `${Green}` }}>{customerName} </span>님과의{' '}
          <span style={{ color: `${Green}` }}>{consultType}</span> 상담
        </Body1>
      </CustomerConsultType>
      <ConsultEarnInfoItem>
        <Body3 color={Grey3}>순수익</Body3>
        <Body3>{netProfit.toLocaleString()} 원</Body3>
      </ConsultEarnInfoItem>
      <ConsultEarnInfoItem>
        <Body3 color={Grey3}>판매금액</Body3>
        <Body3>{salePrice.toLocaleString()} 원</Body3>
      </ConsultEarnInfoItem>
      <ConsultEarnInfoItem>
        <Body3 color={Grey3}>수수료</Body3>
        <Body3>{commission.toLocaleString()} 원</Body3>
      </ConsultEarnInfoItem>
      <ConsultEarnInfoItem>
        <Body3 color={Grey3}>지급일자</Body3>
        <Body3>{paymentDate}</Body3>
      </ConsultEarnInfoItem>
      <ConsultEarnInfoItem>
        <Body3 color={Grey3}>지급계좌</Body3>
        <Body3>{paymentAccount}</Body3>
      </ConsultEarnInfoItem>
      {calculateActivate ? (
        <Button
          text="정산 신청하기"
          buttonTextType={2}
          width="100%"
          height="4.2rem"
          color={Green}
          backgroundColor={White}
        />
      ) : (
        ''
      )}
    </SellerCalulateCardWrapper>
  );
};

const SellerCalulateCardWrapper = styled.div`
  border-radius: 1.2rem;
  background: ${Grey6};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.6rem;
`;

const CustomerConsultType = styled.div`
  margin-bottom: 0.2rem;
`;

const ConsultEarnInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
