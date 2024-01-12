import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';

export const BuyerLetterWrite = () => {
  const navigate = useNavigate();
  //params로 consult id 넘어옴
  const { id } = useParams();
  return (
    <>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/buyer/letter/0');
          }}
        />
        <Heading color={Grey1}>질문</Heading>
      </HeaderWrapper>
    </>
  );
};
