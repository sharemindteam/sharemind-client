import { openConsultApiObject } from 'pages/Buyer/BuyerConsult';
import React from 'react';
import styled from 'styled-components';
import SavedOpenConsultCard from './SavedOpenConsultCard';

interface SavedOpenConsultResultsProps {
  openConsultList: openConsultApiObject[];
}
function SavedOpenConsultResults({
  openConsultList,
}: SavedOpenConsultResultsProps) {
  return (
    <Wrapper>
      {openConsultList.map((card) => (
        <SavedOpenConsultCard item={card} />
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
export default SavedOpenConsultResults;
