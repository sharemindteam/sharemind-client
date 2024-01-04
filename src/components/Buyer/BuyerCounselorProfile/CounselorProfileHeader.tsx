import styled from 'styled-components';
import { Grey1, Grey6, White } from 'styles/color';
import { Heading } from 'styles/font';
import { ReactComponent as Arrow } from 'assets/icons/icon-arrow-back.svg';
import { useNavigate } from 'react-router-dom';
export const CounselorProfileHeader = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <ArrowIcon
        onClick={() => {
          navigate(-1);
        }}
      />
      <Heading color={Grey1}>상담사 프로필</Heading>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 5.2rem;
  background-color: ${White};
  position: sticky;
  top: 0;
  z-index: 999;
  position: relative;
  border-bottom: 1px solid ${Grey6};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ArrowIcon = styled(Arrow)`
  position: absolute;
  top: 1.4rem;
  left: 2.2rem;
  cursor: pointer;
`;
