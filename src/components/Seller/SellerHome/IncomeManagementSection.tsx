import { ContentTag } from 'pages/Seller/SellerHome';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Black, Green, Grey5, Grey6 } from 'styles/color';
import { Body1, Subtitle } from 'styles/font';
import { ReactComponent as RightArrow } from 'assets/icons/right-arrow.svg';
import { useNavigate } from 'react-router-dom';
import { getPaymentsHome } from 'api/get';
// 섹션 안에서 axios 요청
export const IncomeManagementSection = () => {
  const navigate = useNavigate();
  const [revenue, setRevenue] = useState({
    recent: '0',
    notYet: '0',
  });
  useEffect(() => {
    const fetchInComeData = async () => {
      const res: any = await getPaymentsHome();
      if (res?.status === 200) {
        setRevenue({
          recent: res?.data?.month,
          notYet: res?.data?.total,
        });
      }
    };
    fetchInComeData();
  }, []);
  return (
    <>
      <ContentTag
        onClick={() => {
          navigate('/minder/calculatemanagement');
        }}
      >
        <Subtitle color={Black} margin="0px auto 0px 0px">
          수익 관리
        </Subtitle>
        <RightArrow />
      </ContentTag>
      <IncomeManagementBoxWrapper>
        <RecentThirtyDayRevenue>
          <Body1>최근 30일 판매 수익</Body1>
          <Body1 color={Green} margin="0 0 0 auto">
            {revenue?.recent?.toLocaleString()} 원
          </Body1>
        </RecentThirtyDayRevenue>
        <UnsettledAmount>
          <Body1>미정산 금액</Body1>
          <Body1 margin="0 0 0 auto">
            {revenue?.notYet.toLocaleString()} 원
          </Body1>
        </UnsettledAmount>
      </IncomeManagementBoxWrapper>
    </>
  );
};

const IncomeManagementBoxWrapper = styled.div`
  margin: 0 2rem;
  background-color: ${Grey6};
  border-radius: 1.2rem;
`;

const RecentThirtyDayRevenue = styled.div`
  display: flex;
  padding: 2rem;
  border-bottom: 1px solid ${Grey5};
`;
const UnsettledAmount = styled.div`
  display: flex;
  padding: 2rem;
`;

export default IncomeManagementSection;
