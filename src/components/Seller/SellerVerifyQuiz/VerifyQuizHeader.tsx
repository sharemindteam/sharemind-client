import { TabB2 } from 'components/Common/TabB2';
import React from 'react';
import { Heading } from 'styles/font';
import { ProgressBar, ProgressCurrentStatus } from '../Common/ProgressStatus';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as XIcon } from 'assets/icons/icon-x.svg';

function VerifyQuizHeader({ progress }: { progress: string }) {
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
        <Heading>퀴즈</Heading>
      </TabB2>
      <ProgressBar>
        <ProgressCurrentStatus width={progress} />
      </ProgressBar>
    </>
  );
}

export default VerifyQuizHeader;
