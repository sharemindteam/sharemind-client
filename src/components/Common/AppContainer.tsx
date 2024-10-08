import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Grey6, White } from 'styles/color';
import { scrollLockState } from 'utils/atom';
import { APP_WIDTH } from 'styles/AppStyle';
import useManipulateServerDown from 'hooks/useManipulateSeverDown';

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
  const scrollLock = useRecoilValue<boolean>(scrollLockState);

  var { pathname, search } = useLocation();

  const [isGray, setIsGray] = useState(false);

  const isOpenConsultDetailPage =
    /^(\/open-consult\/\d+|\/minder\/open-consult\/\d+)$/.test(pathname);

  const isPaymentDetailPage = /^\/paymentDetail\/\d+$/.test(pathname);

  const isProfilePage = /^\/profile\/\d+$/.test(pathname);

  const isGreyBackground =
    pathname === '/minder/mypage/viewProfile' ||
    pathname === '/minder/mypage' ||
    pathname === '/minder/mypage/modifyProfile' ||
    pathname === '/mypage' ||
    pathname === '/review' ||
    pathname === '/openPaymentDetail' ||
    pathname.includes('/chat/') ||
    (pathname.includes('/open-consult') && !isOpenConsultDetailPage) ||
    (pathname.includes('/consult') && search.includes('type=open-consult')) ||
    isPaymentDetailPage ||
    isProfilePage;

  //
  //
  //
  // Redirect to inspection page when service is shut down
  useManipulateServerDown();

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

  width: ${APP_WIDTH};

  @media (max-width: 767px) {
    width: 100vw;
  }

  background-color: ${(props) => (props.$isGray ? Grey6 : White)};
  overflow-y: ${(props) => (props.$scrollLock ? 'hidden' : 'scroll')};
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
`;
