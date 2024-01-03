import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IncomeManagementSection } from 'components/Seller/IncomeManagementSection';
import OnGoingConsultSection from 'components/Common/OnGoingConsultSection';
import { ConsultReviewSection } from 'components/Seller/ConsultReviewsSection';
import HomeAboutFooterSection from 'components/Common/HomeAboutFooterSection';
import { Grey6 } from 'styles/color';
export const SellerHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header
        isBuyer={false}
        onClick={() => {
          navigate('/seller');
        }}
      />
      <main
        style={{
          paddingBottom: '1.86rem',
          borderBottom: `1px solid ${Grey6} `,
        }}
      >
        <TabA1 isBuyer={false} initState={1} />
        <OnGoingConsultSection />
        <IncomeManagementSection />
        <ConsultReviewSection />
      </main>
      <footer>
        <HomeAboutFooterSection isBuyer={false} />
      </footer>
    </>
  );
};

export const ContentTag = styled.div`
  display: flex;
  gap: 0.8rem;
  margin: 2.2rem 3.2rem 2.2rem 2rem;
  align-items: center;
`;
