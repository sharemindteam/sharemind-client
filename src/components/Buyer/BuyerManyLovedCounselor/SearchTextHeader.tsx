import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import { Space } from 'components/Common/Space';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { APP_HEADER_HEIGHT, APP_WIDTH } from 'styles/AppStyle';
import { Grey1, Grey6, White } from 'styles/color';
import { Subtitle } from 'styles/font';

interface AppHeaderProps {
  title: string;
  border?: boolean;
  onBackClick?: () => void;
}

export default function SearchTextHeader({
  title,
  border = true,
  onBackClick,
}: AppHeaderProps) {
  const navigate = useNavigate();
  return (
    <>
      <HeaderWrapper border={border}>
        <BackIcon onClick={onBackClick} />
        <Subtitle color={Grey1}>{title}</Subtitle>
        <SearchIcon
          onClick={() => {
            navigate('/search');
          }}
        />
      </HeaderWrapper>
      <Space height={APP_HEADER_HEIGHT} />
    </>
  );
}

export const HeaderWrapper = styled.header<{ border?: boolean }>`
  height: ${APP_HEADER_HEIGHT};
  background-color: ${White};
  position: relative;
  ${(props) =>
    props.border || props.border === undefined
      ? `border-bottom: 1px solid ${Grey6};`
      : null}
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }
  top: 0;
  z-index: 999;
`;

export const BackIcon = styled(Back)`
  position: absolute;
  top: 1.2rem;
  left: 2rem;
  cursor: pointer;
`;

export const SearchIcon = styled(Search)`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  cursor: pointer;
`;
