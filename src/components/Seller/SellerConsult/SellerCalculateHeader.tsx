import styled from 'styled-components';
import { ReactComponent as RightArrowIcon } from 'assets/icons/right-arrow.svg';
export const SellerCalculateHeader = () => {
  return (
    <SellerCalculateHeaderWrapper>
      <RightArrowIcon />
    </SellerCalculateHeaderWrapper>
  );
};

const SellerCalculateHeaderWrapper = styled.div`
  height: 5.2rem;
`;

