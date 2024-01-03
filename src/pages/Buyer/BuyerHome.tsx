import { AboutUs } from 'components/Buyer/BuyerHome/AboutUs';
import { CartegorySearch } from 'components/Buyer/BuyerHome/CartegorySearch';
import { ConsultInProgress } from 'components/Buyer/BuyerHome/ConsultInProgress';
import { ConsultInReady } from 'components/Buyer/BuyerHome/ConsultInReady';
import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
export const BuyerHome = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header
        isBuyer={true}
        onClick={() => {
          navigate('/buyer');
        }}
      />
      <TabA1 isBuyer={true} initState={1} />
      <ContentWrapper>
        <CartegorySearch />
        <ConsultInProgress />
        <ConsultInReady />
        <AboutUs />
      </ContentWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
`;
const ContentWrapper = styled.div``;
