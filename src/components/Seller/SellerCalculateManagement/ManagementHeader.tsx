import styled from 'styled-components';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { Heading } from 'styles/font';
import { useNavigate } from 'react-router-dom';
export const ManagementHeader = () => {
  const navigate = useNavigate();
  return (
    <ManagementHeaderWrapper>
      <div style={{ position: 'absolute', left: '2rem', cursor: 'pointer' }}>
        <LeftArrowIcon
          onClick={() => {
            navigate('/minder');
          }}
        />
      </div>
      <Heading>수익 관리</Heading>
    </ManagementHeaderWrapper>
  );
};

const ManagementHeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5.2rem;
  position: sticky;
  background-color: white;
  top: 0;
`;
