import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green } from 'styles/color';
import { ReactComponent as WriteIcon } from 'assets/icons/icon-write.svg';
import OpenConsultList from 'components/Buyer/BuyerOpenConsult/OpenConsultList';
import HotOpenConsultList from 'components/Buyer/BuyerOpenConsult/HotOpenConsultList';
import { Button } from 'components/Common/Button';
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
        <Button
          text="공개상담 신청하기"
          width="100%"
          height="5.2rem"
          onClick={() => {
            navigate('/openConsultRequest');
          }}
        />
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
