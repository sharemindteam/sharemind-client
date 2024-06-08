import { useViewResize } from 'hooks/useViewResize';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Grey6, White } from 'styles/color';
import { scrollLockState } from 'utils/atom';

//
//
//

interface AppContainerProps {
  children: React.ReactNode;
}

//
//
//

export const AppContainer = ({ children }: AppContainerProps) => {
  useViewResize();
  const scrollLock = useRecoilValue<boolean>(scrollLockState);
  var { pathname, search } = useLocation();
  const [isGray, setIsGray] = useState(false);

  const isOpenConsultWithNumber = /^\/open-consult\/\d+$/.test(pathname);

  const isGreyBackground =
    pathname === '/minder/mypage/viewProfile' ||
    pathname === '/minder/mypage' ||
    pathname === '/minder/mypage/modifyProfile' ||
    pathname === '/mypage' ||
    pathname === '/review' ||
    pathname === '/paymentDetail' ||
    pathname.includes('/chat/') ||
    (pathname.includes('/open-consult') && !isOpenConsultWithNumber) ||
    (pathname.includes('/consult') && search.includes('type=open-consult'));

  //
  //
  //
  useEffect(() => {
    if (isGreyBackground) {
      setIsGray(true);
    } else {
      setIsGray(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search]);

  //
  //
  //

  return (
    <StyledApp $isGray={isGray} $scrollLock={scrollLock}>
      {children}
    </StyledApp>
  );
};

const StyledApp = styled.div<{ $isGray: boolean; $scrollLock: boolean }>`
  height: calc(var(--vh, 1vh) * 100);
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  @media (max-width: 767px) {
    width: 100vw;
  }
  background-color: ${(props) => (props.$isGray ? Grey6 : White)};
  overflow-y: ${(props) => (props.$scrollLock ? 'hidden' : 'scroll')};
`;
