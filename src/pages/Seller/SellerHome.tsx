import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IncomeManagementSection } from 'components/Seller/IncomeManagementSection';
import OnGoingConsultSection from 'components/Common/OnGoingConsultSection';
import { ConsultReviewSection } from 'components/Seller/ConsultReviewsSection';
export const SellerHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="main-seller">
        <Header
          isBuyer={false}
          onClick={() => {
            navigate('/seller');
          }}
        />
        <TabA1 isBuyer={false} initState={1} />
        <OnGoingConsultSection />
        <IncomeManagementSection />
        <ConsultReviewSection />
      </section>
    </>
  );
};

export const ContentTag = styled.div`
  display: flex;
  gap: 0.8rem;
  margin: 2.2rem 3.2rem 2.2rem 2rem;
  align-items: center;
`;
