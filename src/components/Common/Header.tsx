import styled from 'styled-components';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import { useNavigate } from 'react-router-dom';
//
//
//
interface HeaderProps {
  isBuyer: boolean;
  onClick?: React.MouseEventHandler<SVGElement>;
}
//
//
//
export const Header = ({ isBuyer, onClick }: HeaderProps) => {
  const navigate = useNavigate();
  if (isBuyer === true) {
    return (
      <Wrapper>
        <Logo onClick={onClick}></Logo>
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
        <Logo onClick={onClick} />
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
const Logo = styled(LogoImg)`
  margin-left: 2.1rem;
  margin-top: 1.4rem;
  cursor: pointer;
`;
const StyledSearch = styled(Search)`
  margin-top: 1.6rem;
  margin-right: 2.17rem;
  cursor: pointer;
`;
