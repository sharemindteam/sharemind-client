import { useViewResize } from 'hooks/useViewResize';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Grey6, White } from 'styles/color';
import { scrollLockState } from 'utils/atom';
import { useTokenRefresh } from 'hooks/useTokenRefresh';
interface AppContainerProps {
  children: React.ReactNode;
}

export const AppContainer = ({ children }: AppContainerProps) => {
  useViewResize();
  useTokenRefresh();
  const scrollLock = useRecoilValue<boolean>(scrollLockState);
  var { pathname } = useLocation();
  const [isGray, setIsGray] = useState(false);
  useEffect(() => {
    const reviewPageRegex = /^\/buyer\/review\/\d+$/;
    if (
      pathname === '/seller/mypage/viewProfile' ||
      pathname === '/seller/mypage' ||
      pathname === '/buyer/mypage' ||
      pathname === '/seller/mypage/modifyProfile' ||
      reviewPageRegex.test(pathname) ||
      pathname === '/buyer/paymentDetail'
    ) {
      setIsGray(true);
    } else {
      setIsGray(false);
    }
  }, [pathname]);
  return (
    <StyledApp isGray={isGray} scrollLock={scrollLock}>
      {children}
    </StyledApp>
  );
};
const StyledApp = styled.div<{ isGray: boolean; scrollLock: boolean }>`
  height: calc(var(--vh, 1vh) * 100);
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  background-color: ${(props) => (props.isGray ? Grey6 : White)};
  overflow-y: ${(props) => (props.scrollLock ? 'hidden' : 'scroll')};
`;
