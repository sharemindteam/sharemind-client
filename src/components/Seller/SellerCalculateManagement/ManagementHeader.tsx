import styled from 'styled-components';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { ReactComponent as MoreIcon } from 'assets/icons/icon-more2.svg';
import { Heading } from 'styles/font';
import { useNavigate } from 'react-router-dom';
export const ManagementHeader = () => {
  const navigate = useNavigate();
  return (
    <ManagementHeaderWrapper>
      <div style={{ position: 'absolute', left: '2rem', cursor: 'pointer' }}>
        <LeftArrowIcon
          onClick={() => {
            navigate('/seller');
          }}
        />
      </div>
      <Heading>수익 관리</Heading>
    </ManagementHeaderWrapper>
  );
};

const ManagementHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5.2rem;
  position: relative;
`;
