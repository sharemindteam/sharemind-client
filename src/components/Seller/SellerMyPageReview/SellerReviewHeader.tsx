import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { White } from 'styles/color';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { Heading } from 'styles/font';

export const SellerReviewHeader = () => {
  const navigate = useNavigate();
  return (
    <SellerReviewHeaderWrapper>
      <div style={{ position: 'absolute', left: '2rem', cursor: 'pointer' }}>
        <LeftArrowIcon
          onClick={() => {
            navigate('/minder/mypage');
          }}
        />
      </div>
      <Heading>받은 리뷰</Heading>
    </SellerReviewHeaderWrapper>
  );
};
export const SellerReviewHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${White};
  border-bottom: 1px solid rgba(242, 241, 248, 0.95);
  justify-content: center;
  height: 5.2rem;
  position: sticky;
  top: 0;
`;
