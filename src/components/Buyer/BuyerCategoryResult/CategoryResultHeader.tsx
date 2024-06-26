import styled from 'styled-components';
import { Grey1, Grey6, White } from 'styles/color';
import { Heading } from 'styles/font';
import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
interface ResultHeaderProps {
  categoryType: string;
}
export const CategoryResultHeader = ({ categoryType }: ResultHeaderProps) => {
  const url = new URL(window.location.href);
  const params = useMemo(() => new URLSearchParams(url.search), [url.search]);
  const navigate = useNavigate();
  const handleClickBackIcon = useCallback(() => {
    if (params.has('from', 'search')) { 
      navigate('/search');
    } else {
      navigate('/share');
    }
  }, [navigate, params]);
  return (
    <Wrapper>
      <BackIcon onClick={handleClickBackIcon} />
      <Heading color={Grey1}>{categoryType}</Heading>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 5.2rem;
  background-color: ${White};
  position: relative;
  border-bottom: 1px solid ${Grey6};
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;
const BackIcon = styled(Back)`
  position: absolute;
  top: 1.2rem;
  left: 2rem;
  cursor: pointer;
`;
