import { useViewResize } from 'hooks/useViewResize';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Grey6, White } from 'styles/color';
interface AppContainerProps {
  children: React.ReactNode;
}

export const AppContainer = ({ children }: AppContainerProps) => {
  useViewResize();
  var { pathname } = useLocation();
  const [isGray, setIsGray] = useState(false);
  useEffect(() => {
    if (
      pathname ===
      ('/seller/mypage/viewProfile' ||
        '/seller/mypage' ||
        '/buyer/mypage' ||
        '/seller/mypage/modifyProfile')
    ) {
      setIsGray(true);
    }
  }, [pathname]);

  return <StyledApp isGray={isGray}>{children}</StyledApp>;
};
const StyledApp = styled.div<{ isGray: boolean }>`
  height: calc(var(--vh, 1vh) * 100);
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  background-color: ${(props) => (props.isGray ? Grey6 : White)};
  overflow-y: scroll;
`;
