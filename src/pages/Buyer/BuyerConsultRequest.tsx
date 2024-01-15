import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useNavigate } from 'react-router-dom';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';

export const BuyerConsultRequest = () => {
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <BackIcon
        onClick={() => {
          navigate('/signup');
        }}
      />
      <Heading color={Grey1}>상담 신청하기</Heading>
    </HeaderWrapper>
  );
};
