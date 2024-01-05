import { useViewResize } from 'hooks/useViewResize';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Grey6, White } from 'styles/color';
interface AppContainerProps {
  children: React.ReactNode;
}

export const AppContainer = ({ children }: AppContainerProps) => {
  useViewResize();
  const { pathname } = useLocation();
  console.log(pathname);
  return <StyledApp currentPath={pathname}>{children}</StyledApp>;
};
const StyledApp = styled.div<{ currentPath: string }>`
  height: calc(var(--vh, 1vh) * 100);
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  background-color: ${(props) =>
    props.currentPath === '/seller/mypage' ||
    '/buyer/mypage' ||
    '/seller/mypage/viewProfile'
      ? Grey6
      : White};
  overflow-y: scroll;
`;
