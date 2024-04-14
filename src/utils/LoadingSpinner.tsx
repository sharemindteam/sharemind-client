import styled, { keyframes } from 'styled-components';

export const LoadingSpinner = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 20rem;
  height: 20rem;
  margin: 20px auto;
`;
const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: calc(50% - 25px) auto;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(18, 192, 181, 0.3);
  box-sizing: border-box;
  border-top-color: rgba(18, 192, 181, 0.7);
  border-radius: 100%;
  animation: ${spinAnimation} 1s ease-in-out infinite;
`;
