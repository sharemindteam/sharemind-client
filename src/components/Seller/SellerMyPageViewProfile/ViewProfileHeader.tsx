import styled from 'styled-components';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { Heading } from 'styles/font';
import { useNavigate } from 'react-router-dom';
import { White } from 'styles/color';

export const ViewProfileHeader = () => {
  const navigate = useNavigate();

  return (
    <ViewProfileHeaderWrapper>
      <div
        className="back-button"
        style={{ position: 'absolute', left: '2rem', cursor: 'pointer' }}
      >
        <LeftArrowIcon
          onClick={() => {
            navigate('/minder/mypage');
          }}
        />
      </div>
      <Heading>판매정보</Heading>
    </ViewProfileHeaderWrapper>
  );
};
const ViewProfileHeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  background-color: ${White};
  justify-content: center;
  height: 5.2rem;
  position: sticky;
  top: 0;
  border-bottom: 1px solid rgba(242, 241, 248, 0.95);
`;
