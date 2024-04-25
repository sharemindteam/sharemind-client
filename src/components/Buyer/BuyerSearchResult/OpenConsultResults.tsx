import React from 'react';
import styled from 'styled-components';
import { openConsultApiObject } from 'pages/Buyer/BuyerConsult';
import SavedOpenConsultCard from '../BuyerSavedCounselor.tsx/SavedOpenConsultCard';
interface OpenConsultResultProps {
  openConsultList: openConsultApiObject[];
}
function OpenConsultResults({ openConsultList }: OpenConsultResultProps) {
  return (
    <Wrapper>
      {openConsultList.map((item) => (
        <SavedOpenConsultCard item={item} />
      ))}
    </Wrapper>
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
