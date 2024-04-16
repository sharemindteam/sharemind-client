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
          <LogoText />
        </Logo>
        <StyledSearch
          onClick={() => {
            if (isBuyer) {
              navigate('/search');
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
        <Logo onClick={onClick}>
          <LogoSeller />
          <LogoText />
        </Logo>
      </Wrapper>
    );
  }
};
const Wrapper = styled.header`
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
  margin-left: 2.1rem;
  margin-top: 1.4rem;
  display: flex;
  cursor: pointer;
`;
const StyledSearch = styled(Search)`
  margin-top: 1rem;
  margin-right: 2.4rem;
  cursor: pointer;
`;
