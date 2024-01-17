import { Button } from 'components/Common/Button';
import styled from 'styled-components';
import { White } from 'styles/color';

export const PaymentDetailFooter = () => {
  return (
    <Wrapper>
      <Button text="결제하기" width="33.5rem" height="5.2rem" />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  height: 7.9rem;
  background-color: ${White};
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding-top: 0.8rem;
  box-sizing: border-box;
`;
