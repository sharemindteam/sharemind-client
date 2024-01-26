import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { ReactComponent as OptionIcon } from 'assets/icons/icon-option.svg';
import styled from 'styled-components';
import { Heading } from 'styles/font';
import { White } from 'styles/color';

function ChatHeader({ customerName }: { customerName: string }) {
  const navigate = useNavigate();
  return (
    <LetterHeaderWrapper>
      <LeftArrow
        onClick={() => {
          navigate('/seller/consult');
        }}
      />
      <Heading>{customerName}</Heading>
      <Option onClick={() => {}} />
    </LetterHeaderWrapper>
  );
}
const LetterHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 5.2rem;
  box-sizing: border-box;
  padding: 1.2rem 2rem;
  background-color: ${White};
  justify-content: space-between;
  position: sticky;
  border-bottom: 1px solid rgba(242, 241, 248, 0.95);
  top: 0;
`;

const LeftArrow = styled(LeftArrowIcon)`
  cursor: pointer;
`;
const Option = styled(OptionIcon)`
  cursor: pointer;
`;

export default ChatHeader;
