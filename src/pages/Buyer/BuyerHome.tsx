import { CartegorySearch } from 'components/Buyer/Common/CartegorySearch';
import { ConsultInProgress } from 'components/Buyer/BuyerHome/ConsultInProgress';
import { ConsultInReady } from 'components/Buyer/BuyerHome/ConsultInReady';
import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeAboutFooterSection from 'components/Common/HomeAboutFooterSection';
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

      <CartegorySearch />
      <ConsultInProgress />
      <ConsultInReady />
      <HomeAboutFooterSection isBuyer={true} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
`;
