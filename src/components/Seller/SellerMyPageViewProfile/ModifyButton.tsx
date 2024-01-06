import { Button } from 'components/Common/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Red } from 'styles/color';

export const ModifyButton = () => {
  const navigate = useNavigate();
  return (
    <ModifyButtonWrapper>
      <Button
        onClick={() => {
          navigate('/seller/mypage/modifyProfile');
        }}
        text="수정하기"
        width="80%"
        backgroundColor={Red}
        height="5.2rem"
      ></Button>
    </ModifyButtonWrapper>
  );
};

const ModifyButtonWrapper = styled.button`
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
