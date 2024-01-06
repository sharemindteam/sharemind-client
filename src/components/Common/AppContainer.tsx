import { useViewResize } from 'hooks/useViewResize';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Grey6, White } from 'styles/color';
import { scrollLockState } from 'utils/atom';
interface AppContainerProps {
  children: React.ReactNode;
}

export const AppContainer = ({ children }: AppContainerProps) => {
  useViewResize();
  const scrollLock = useRecoilValue<boolean>(scrollLockState);
  const { pathname } = useLocation();
  if (pathname === '/seller/mypage' || '/buyer/mypage') {
  }
  return (
    <StyledApp currentPath={pathname} scrollLock={scrollLock}>
      {children}
    </StyledApp>
  );
};
const StyledApp = styled.div<{ currentPath: string; scrollLock: boolean }>`
  height: calc(var(--vh, 1vh) * 100);
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  background-color: ${(props) =>
    props.currentPath === ('/seller/mypage' || '/buyer/mypage')
      ? Grey6
      : White};
  overflow-y: ${(props) => (props.scrollLock ? 'hidden' : 'scroll')};
`;
