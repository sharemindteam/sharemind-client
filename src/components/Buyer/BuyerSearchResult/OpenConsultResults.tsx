import React from 'react';
import styled from 'styled-components';
import { openConsultApiObject } from 'pages/Buyer/BuyerConsult';
import SavedOpenConsultCard from '../BuyerSavedCounselor.tsx/SavedOpenConsultCard';
import { Flex } from 'components/Common/Flex';
interface OpenConsultResultProps {
  openConsultList: openConsultApiObject[];
}
function OpenConsultResults({ openConsultList }: OpenConsultResultProps) {
  return (
    <Flex
      direction="column"
      gap="0.8rem"
      align="center"
      style={{ padding: '0 2rem' }}
    >
      {openConsultList.map((item) => (
        <SavedOpenConsultCard item={item} />
      ))}
    </Flex>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  width: 100%;
`;
export default OpenConsultResults;
