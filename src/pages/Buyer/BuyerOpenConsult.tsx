import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green } from 'styles/color';
import { ReactComponent as WriteIcon } from 'assets/icons/icon-write.svg';
import OpenConsultList from 'components/Buyer/BuyerOpenConsult/OpenConsultList';
import HotOpenConsultList from 'components/Buyer/BuyerOpenConsult/HotOpenConsultList';
function BuyerOpenConsult() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header
        isBuyer={true}
        onClick={() => {
          navigate('/share');
        }}
      />
      <TabA1 isBuyer={true} initState={3} />
      <section className="fire">
        <HotOpenConsultList />
      </section>
      <section className="consult-list">
        <OpenConsultList />
      </section>
      <CreateConsultButtonWrapper>
        <CreateConsultButton onClick={() => {}}>
          <WriteIcon />
        </CreateConsultButton>
      </CreateConsultButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  section.fire {
    height: 4.6rem;
    margin: 1.2rem 0rem 1.2rem 2rem;
    overflow: hidden;
    width: calc(100% - 2rem);
  }
`;
const CreateConsultButton = styled.button`
  width: 5.8rem;
  height: 5.8rem;
  border-radius: 100%;
  background-color: ${Green};
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
  align-self: flex-end;
`;
const CreateConsultButtonWrapper = styled.div`
  width: 100%;
  padding: 0 3.3rem;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  bottom: 3.5rem;
  flex-direction: column;
  @media (min-width: 768px) {
    width: 375px;
  }
`;
export default BuyerOpenConsult;
