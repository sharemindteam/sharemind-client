import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as RightArrow } from 'assets/icons/right-arrow.svg';
import { Black, Red } from 'styles/color';
import { Body1, Heading } from 'styles/font';
import OngoingCounslutBox from 'components/Common/OngoingCounsultBox';
import { IncomeManagementSection } from 'components/Common/IncomeManagementSection';
import OnGoingConsultSection from 'components/Common/OnGoingConsultSection';
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
        <ContentTag>
          <Heading color={Black} margin="0px auto 0px 0px">
            상담 후기
          </Heading>
          <RightArrow />
        </ContentTag>
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
