import React from 'react';
import styled from 'styled-components';
import { White } from 'styles/color';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { ReactComponent as OptionIcon } from 'assets/icons/icon-option.svg';
import { Heading } from 'styles/font';
import { useNavigate, useSearchParams } from 'react-router-dom';

function OpenConsultHeader() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <OpenConsultHeaderWrapper>
      <LeftArrow
        onClick={() => {
          if (searchParams.get('isMine') === 'true') {
            navigate('/minder/consult?type=open-consult');
          } else {
            navigate('/minder');
          }
        }}
      />
      <Heading>공개 상담</Heading>
    </OpenConsultHeaderWrapper>
  );
}

const OpenConsultHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 5.2rem;
  box-sizing: border-box;
  padding: 1.2rem 2rem;
  background-color: ${White};
  justify-content: center;
  position: sticky;
  border-bottom: 1px solid rgba(242, 241, 248, 0.95);
  top: 0;
  z-index: 1000;
`;

const LeftArrow = styled(LeftArrowIcon)`
  cursor: pointer;
  position: absolute;
  top: 1.2rem;
  left: 2rem;
`;

export default React.memo(OpenConsultHeader);
