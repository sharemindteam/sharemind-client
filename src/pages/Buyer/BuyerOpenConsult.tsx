import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import OpenConsultList from 'components/Buyer/BuyerOpenConsult/OpenConsultList';
import HotOpenConsultList from 'components/Buyer/BuyerOpenConsult/HotOpenConsultList';
import { Button } from 'components/Common/Button';
import { Space } from 'components/Common/Space';

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
      <section>
        <HotOpenConsultList />
      </section>
      <section>
        <OpenConsultList />
        <Space height="5.2rem" />
      </section>
      <CreateConsultButtonWrapper>
        <Button
          text="공개상담 신청하기"
          width="100%"
          height="5.2rem"
          onClick={() => {
            navigate('/openConsultRequest');
          }}
        />
      </CreateConsultButtonWrapper>
    </>
  );
};

//
//
//

const CreateConsultButtonWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  bottom: 1.5rem;
  flex-direction: column;
  @media (min-width: 768px) {
    width: 375px;
  }
`;
export default BuyerOpenConsult;
