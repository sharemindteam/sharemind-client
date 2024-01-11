import { TabB2 } from 'components/Common/TabB2';
import React, { useEffect, useState } from 'react';
import { ReactComponent as XIcon } from 'assets/icons/icon-x.svg';
import { Heading } from 'styles/font';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, LightGreen } from 'styles/color';
function VerifyMaterialHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgess] = useState<string | undefined>(undefined);
  useEffect(() => {
    let path = location.pathname;
    if (path === '/seller/education/first') {
      setProgess('25%');
    } else if (path === '/seller/education/second') {
      setProgess('50%');
    } else if (path === '/seller/education/third') {
      setProgess('75%');
    }
    else if (path ==="/seller/education/final"){
      setProgess("100%");
    }
  }, [location]);
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
        <ProgressCurrentStatus width={progress} />
      </ProgressBar>
    </>
  );
}

const ProgressBar = styled.div`
  margin: 1.2rem 2rem 2.7rem;
  border-radius: 1.2rem;
  height: 0.9rem;
  background: ${LightGreen};
  position: sticky;
  top: 5.3rem;
`;

const ProgressCurrentStatus = styled.div<{ width: string | undefined }>`
  border-radius: 1.2rem;
  transition: 0.5s;
  height: 0.9rem;
  background: ${Green};
  width: ${(props) => (props.width ? props?.width : '0%')};
`;
export default VerifyMaterialHeader;
