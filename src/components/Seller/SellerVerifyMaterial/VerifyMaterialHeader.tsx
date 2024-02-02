import { TabB2 } from 'components/Common/TabB2';
import React, { useEffect, useState } from 'react';
import { ReactComponent as XIcon } from 'assets/icons/icon-x.svg';
import { Heading } from 'styles/font';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, LightGreen } from 'styles/color';
import { ProgressBar, ProgressCurrentStatus } from '../Common/ProgressStatus';
function VerifyMaterialHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgess] = useState<string | undefined>(undefined);
  useEffect(() => {
    let path = location.pathname;
    if (path === '/minder/education/first') {
      setProgess('25%');
    } else if (path === '/minder/education/second') {
      setProgess('50%');
    } else if (path === '/minder/education/third') {
      setProgess('75%');
    } else if (path === '/minder/education/final') {
      setProgess('100%');
    }
  }, [location]);
  return (
    <>
      <TabB2>
        <div className="left-icon">
          <XIcon
            onClick={() => {
              navigate('/minder/mypage');
            }}
          />
        </div>
        <Heading>마인더 인증하기</Heading>
      </TabB2>
      <ProgressBar>
        <ProgressCurrentStatus width={progress} />
      </ProgressBar>
    </>
  );
}

export default VerifyMaterialHeader;
