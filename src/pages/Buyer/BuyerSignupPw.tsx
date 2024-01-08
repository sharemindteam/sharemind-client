import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';

export const BuyerSignupPw = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate(-1);
          }}
        />
        <Heading color={Grey1}>회원가입</Heading>
      </HeaderWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
