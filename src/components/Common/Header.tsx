import styled from 'styled-components';
import { ReactComponent as LogoBuyer } from 'assets/icons/logo-buyer.svg';
import { ReactComponent as LogoSeller } from 'assets/icons/logo-seller.svg';
import { ReactComponent as LogoText } from 'assets/icons/logo-text.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';
interface HeaderProps {
  isBuyer: boolean;
}
export const Header = ({ isBuyer }: HeaderProps) => {
  if (isBuyer === true) {
    return (
      <Wrapper>
        <Logo>
          <LogoBuyer />
          <StyledLogoText />
        </Logo>
        <StyledSearch />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Logo>
          <LogoSeller />
          <StyledLogoText />
        </Logo>
        <StyledSearch />
      </Wrapper>
    );
  }
};
const Wrapper = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: space-between;
`;
const Logo = styled.div`
  margin-left: 2rem;
  margin-top: 1.4rem;
  display: flex;
  cursor: pointer;
`;
const StyledLogoText = styled(LogoText)`
  padding-top: 0.81rem;
`;
const StyledSearch = styled(Search)`
  margin-top: 1rem;
  margin-right: 2.4rem;
  cursor: pointer;
`;
