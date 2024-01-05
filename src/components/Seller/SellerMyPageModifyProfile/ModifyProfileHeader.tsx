import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { White } from 'styles/color';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { Heading } from 'styles/font';
export const ModifyProfileHeader = () => {
  const navigate = useNavigate();

  return (
    <ModifyProfileHeaderWrapper>
      <div style={{ position: 'absolute', left: '2rem', cursor: 'pointer' }}>
        <LeftArrowIcon
          onClick={() => {
            navigate('/seller/mypage/viewProfile');
          }}
        />
      </div>
      <Heading>프로필 수정</Heading>
    </ModifyProfileHeaderWrapper>
  );
};

const ModifyProfileHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${White};
  justify-content: center;
  height: 5.2rem;
  position: sticky;
  top: 0;
`;
