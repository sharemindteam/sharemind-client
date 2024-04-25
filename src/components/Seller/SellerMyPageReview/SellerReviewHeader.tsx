import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { White } from 'styles/color';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { Heading } from 'styles/font';
import { useCallback, useMemo } from 'react';

export const SellerReviewHeader = () => {
  const url = new URL(window.location.href);
  const params = useMemo(() => new URLSearchParams(url.search), [url.search]);
  const navigate = useNavigate();
  const handleClickBackIcon = useCallback(() => {
    if (params.has('from', 'home')) {
      navigate('/minder');
    } else {
      navigate('/minder/mypage');
    }
  }, [navigate, params]);
  return (
    <SellerReviewHeaderWrapper>
      <div style={{ position: 'absolute', left: '2rem', cursor: 'pointer' }}>
        <LeftArrowIcon onClick={handleClickBackIcon} />
      </div>
      <Heading>받은 리뷰</Heading>
    </SellerReviewHeaderWrapper>
  );
};
export const SellerReviewHeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  background-color: ${White};
  border-bottom: 1px solid rgba(242, 241, 248, 0.95);
  justify-content: center;
  height: 5.2rem;
  position: sticky;
  top: 0;
`;
