import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import OpenConsultList from 'components/Buyer/BuyerOpenConsult/OpenConsultList';
import HotOpenConsultList from 'components/Buyer/BuyerOpenConsult/HotOpenConsultList';
import { Button } from 'components/Common/Button';
import { Space } from 'components/Common/Space';
import { APP_WIDTH } from 'styles/AppStyle';

//
//
//

const BuyerOpenConsult = () => {
  const navigate = useNavigate();

  //
  //
  //

  return (
    <>
      <Header
        isBuyer={true}
        onClick={() => {
          navigate('/share');
        }}
      />
      <TabA1 isBuyer={true} initState={3} />

      <HotOpenConsultList />
      <OpenConsultList />
      <Space height="8.9rem" />

      <ButtonWrapper>
        <Button
          text="공개상담 신청하기"
          width="100%"
          height="5.2rem"
          onClick={() => {
            navigate('/openConsultRequest');
          }}
        />
      </ButtonWrapper>
    </>
  );
};

//
//
//

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
  position: fixed;
  bottom: 1.5rem;
  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }
`;

export default BuyerOpenConsult;
