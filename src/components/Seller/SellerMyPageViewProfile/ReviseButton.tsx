import { Button } from 'components/Common/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Red } from 'styles/color';

export const ReviseButton = () => {
  const navigate = useNavigate();
  return (
    <ReviseButtonWrapper>
      <Button
        onClick={() => {
          navigate('/mypage/reviseProfile');
        }}
        text="수정하기"
        width="80%"
        backgroundColor={Red}
        height="5.2rem"
      ></Button>
    </ReviseButtonWrapper>
  );
};

const ReviseButtonWrapper = styled.button`
  height: 5.2rem;
  width: 100%;
  margin-bottom: 1.6rem;
  border-radius: 1.2rem;
  @media (max-width: 767px) {
    position: fixed;
    bottom: 1rem;
  }
  @media (min-width: 768px) {
    position: sticky;
    bottom: 1rem;
  }
`;
