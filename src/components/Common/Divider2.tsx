import React, { useState } from 'react';
import styled from 'styled-components';
import { Black, Green, Grey4, Grey6 } from 'styles/color';
import { ReactComponent as UnderLineBuyer } from 'assets/icons/underline-buyer.svg';
import { ReactComponent as UnderLineBuyerBig } from 'assets/icons/underline-big.svg';
import { Subtitle } from 'styles/font';
interface Divder2Props {
  tabState: number;
  setTabState: React.Dispatch<React.SetStateAction<number>>;
}
function Divider2({ tabState, setTabState }: Divder2Props) {
  return (
    <Wrapper>
      <TabButton
        tabState={1}
        onClick={() => {
          setTabState(1);
        }}
      >
        {tabState === 1 ? (
          <>
            <Subtitle color={Green}>상담사</Subtitle>
            <UnderLineBuyer />
          </>
        ) : (
          <Subtitle color={Grey4}>상담사</Subtitle>
        )}
      </TabButton>
      <TabButton
        tabState={2}
        onClick={() => {
          setTabState(2);
        }}
      >
        {tabState === 2 ? (
          <>
            <Subtitle color={Green}>공개상담</Subtitle>
            <UnderLineBuyerBig />
          </>
        ) : (
          <Subtitle color={Grey4}>공개상담</Subtitle>
        )}
      </TabButton>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  box-sizing: border-box;
  padding-top: 0.8rem;
  height: 4.4rem;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${Grey6};
  background-color: white;
  z-index: 999;
`;

const TabButton = styled.div<{ tabState: number }>`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  cursor: pointer;
`;

export default Divider2;
