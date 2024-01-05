import { SearchHeader } from 'components/Buyer/BuyerSearch/SearchHeader';
import { SearchRecent } from 'components/Buyer/BuyerSearch/SearchRecent';
import { CartegorySearch } from 'components/Buyer/Common/CartegorySearch';
import styled from 'styled-components';
import { Subtitle } from 'styles/font';

export const BuyerSearch = () => {
  return (
    <Wrapper>
      <SearchHeader />
      <SearchRecent />
      <Subtitle padding="1.2rem 0 1.2rem 2rem">카테고리</Subtitle>
      <CartegorySearch />
    </Wrapper>
  );
};
const Wrapper = styled.div``;
