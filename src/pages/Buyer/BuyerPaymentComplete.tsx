import { HeaderWrapper } from 'components/Buyer/Common/Header';
import { useNavigate } from 'react-router-dom';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';
import { ReactComponent as Graphic } from 'assets/icons/graphic-payment-complete.svg';
export const BuyerPaymentComplete = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderWrapper>
        <Heading color={Grey1}>상담 신청완료</Heading>
      </HeaderWrapper>
      <Graphic />
    </>
  );
};
