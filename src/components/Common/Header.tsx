import styled from 'styled-components';
import { ReactComponent as LogoBuyer } from 'assets/icons/logo-buyer.svg';
import { ReactComponent as LogoSeller } from 'assets/icons/logo-seller.svg';
import { ReactComponent as LogoText } from 'assets/icons/logo-text.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import { useNavigate } from 'react-router-dom';
interface HeaderProps {
  isBuyer: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export const Header = ({ isBuyer, onClick }: HeaderProps) => {
  const navigate = useNavigate();

  if (isBuyer === true) {
    return (
      <Wrapper>
        <Logo onClick={onClick}>
          <LogoBuyer />
          <StyledLogoText width="98.202px" height="16.364px" />
        </Logo>
        <StyledSearch
          onClick={() => {
            if (isBuyer) {
              navigate('/buyer/search');
            } else {
              navigate('/seller/search');
            }
          }}
        />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Logo>
          <LogoSeller />
          <StyledLogoText width="98.202px" height="16.364px" />
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
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 999;
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
