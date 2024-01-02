import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import styled from 'styled-components';

export const BuyerHome = () => {
  return (
    <Wrapper>
      <Header isBuyer={true} />
      <TabA1 isBuyer={true} initState={1} />
    </Wrapper>
  );
};
const Wrapper = styled.div``;
