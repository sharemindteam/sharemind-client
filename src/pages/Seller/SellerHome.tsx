import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IncomeManagementSection } from 'components/Seller/SellerHome/IncomeManagementSection';
import OnGoingConsultSection from 'components/Seller/SellerHome/OnGoingConsultSection';
import { ConsultReviewSection } from 'components/Seller/SellerHome/ConsultReviewsSection';
import HomeAboutFooterSection from 'components/Common/HomeAboutFooterSection';
import { Grey6 } from 'styles/color';
export const SellerHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header
        isBuyer={false}
        onClick={() => {
          navigate('/minder');
        }}
      />
      <TabA1 isBuyer={false} initState={1} />
      <div style={{ height: 'calc(100vh - 5rem)', overflow: 'scroll' }}>
        <main
          style={{
            paddingBottom: '1.86rem',
            borderBottom: `1px solid ${Grey6} `,
          }}
        >
          <OnGoingConsultSection />
          <IncomeManagementSection />
          <ConsultReviewSection />
        </main>
        <footer>
          <HomeAboutFooterSection isBuyer={false} />
        </footer>
      </div>
    </>
  );
};

export const ContentTag = styled.div`
  display: flex;
  cursor: pointer;
  gap: 0.8rem;
  margin: 2.2rem 3.2rem 1.2rem 2rem;
  align-items: center;
`;
