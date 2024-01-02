import { useViewResize } from 'hooks/useViewResize';
import styled from 'styled-components';

interface AppContainerProps {
  children: React.ReactNode;
}

export const AppContainer = ({ children }: AppContainerProps) => {
  useViewResize();
  return <StyledApp>{children}</StyledApp>;
};
const StyledApp = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  background-color: white;
`;
