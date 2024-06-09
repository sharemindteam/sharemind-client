import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import styled from 'styled-components';
import { Grey1, Grey6, White } from 'styles/color';
import { Heading } from 'styles/font';

//
//
//

interface AppHeaderProps {
  title: string;
  border?: boolean;
  onBackClick?: () => void;
}

//
//
//

/** Header with title, backspace button. */
const AppHeader = ({ title, border = true, onBackClick }: AppHeaderProps) => {
  return (
    <HeaderWrapper border={border}>
      <BackIcon onClick={onBackClick} />
      <Heading color={Grey1}>{title}</Heading>
    </HeaderWrapper>
  );
};

export default AppHeader;

//
//
//

export const HeaderWrapper = styled.header<{ border?: boolean }>`
  height: 5.2rem;
  background-color: ${White};
  position: relative;
  ${(props) =>
    props.border || props.border === undefined
      ? `border-bottom: 1px solid ${Grey6};`
      : null}
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;

export const BackIcon = styled(Back)`
  position: absolute;
  top: 1.2rem;
  left: 2rem;
  cursor: pointer;
`;
