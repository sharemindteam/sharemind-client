import React from 'react';
import styled from 'styled-components';
import { ReactComponent as FireIcon } from 'assets/icons/icon-fire.svg';
import { Body3, Body4 } from 'styles/font';
import { Grey6 } from 'styles/color';
function HotOpenConsultList() {
  return (
    <HotList>
      <FireIconWrapper>
        <FireIcon />
      </FireIconWrapper>
      <HotTitleItem>
        <Body4>이거 권태기 증상 맞나요?</Body4>
      </HotTitleItem>
      <HotTitleItem>
        <Body4>이거 권태기 증상 맞나요?</Body4>
      </HotTitleItem>
      <HotTitleItem>
        <Body4>이거 권태기 증상 맞나요?</Body4>
      </HotTitleItem>
    </HotList>
  );
}

const HotList = styled.div`
  display: flex;
  white-space: nowrap;
  flex-wrap: nowrap;
  overflow-x: scroll;
  gap: 1.2rem;
  align-items: center;
`;

const HotTitleItem = styled.div`
  padding: 1.2rem 1.6rem;
  background-color: ${Grey6};
  border-radius: 1.2rem;
`;

const FireIconWrapper = styled.div``;

export default HotOpenConsultList;
