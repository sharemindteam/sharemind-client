import { TabB2 } from 'components/Common/TabB2';
import React from 'react';
import { ReactComponent as XIcon } from 'assets/icons/icon-x.svg';
import { Heading } from 'styles/font';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, LightGreen } from 'styles/color';
function VerifyMaterialHeader() {
  const navigate = useNavigate();
  return (
    <>
      <TabB2>
        <div className="left-icon">
          <XIcon
            onClick={() => {
              navigate('/seller/mypage');
            }}
          />
        </div>
        <Heading>마인더 인증하기</Heading>
      </TabB2>
      <ProgressBar>
        <ProgressCurrentStatus />
      </ProgressBar>
    </>
  );
}

const ProgressBar = styled.div`
  margin: 1.2rem 2rem 2.7rem;
  border-radius: 1.2rem;
  height: 0.9rem;
  background: ${LightGreen};
`;

const ProgressCurrentStatus = styled.div`
  border-radius: 1.2rem;
  transition: 1s;
  height: 0.9rem;
  background: ${Green};
  width: 25%;
`;
export default VerifyMaterialHeader;
