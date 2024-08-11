import styled from 'styled-components';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import { useNavigate } from 'react-router-dom';

import betaTagImageUrl from 'assets/logo/beta_logo.png';
import { Flex } from './Flex';

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

  //
  //
  //

  if (isBuyer === true) {
    return (
      <Wrapper>
        <Flex
          gap="0.8rem"
          style={{ marginLeft: '2rem', backgroundColor: 'pink' }}
        >
          <Logo onClick={onClick} />
          <BetaTagImage src={betaTagImageUrl} />
        </Flex>
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
        <Flex gap="0.8rem" style={{ marginLeft: '2rem' }}>
          <Logo onClick={onClick} />
          <BetaTagImage src={betaTagImageUrl} />
        </Flex>
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
  cursor: pointer;
`;

const StyledSearch = styled(Search)`
  margin-top: 1.6rem;
  margin-right: 2.17rem;
  cursor: pointer;
`;

const BetaTagImage = styled.img`
  width: 4.6rem;
  height: 2.2rem;
`;
