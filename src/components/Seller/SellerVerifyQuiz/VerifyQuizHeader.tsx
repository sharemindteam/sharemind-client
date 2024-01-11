import { TabB2 } from 'components/Common/TabB2';
import React from 'react';
import { Heading } from 'styles/font';
import { ProgressBar, ProgressCurrentStatus } from '../Common/ProgressStatus';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as XIcon } from 'assets/icons/icon-x.svg';
interface VerifyQuizHeaderProps {
  progress: string;
  verifyStatus: string;
  setIsStopModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function VerifyQuizHeader({
  progress,
  verifyStatus,
  setIsStopModalOpen,
}: VerifyQuizHeaderProps) {
  const navigate = useNavigate();
  return (
    <>
      <TabB2>
        <div className="left-icon">
          <XIcon
            onClick={() => {
              if (verifyStatus === '인증 전') {
                setIsStopModalOpen(true);
              } else {
                navigate('/seller/mypage');
              }
            }}
          />
        </div>
        <Heading>퀴즈</Heading>
      </TabB2>
      {verifyStatus === '인증 전' && (
        <ProgressBar>
          <ProgressCurrentStatus width={progress} />
        </ProgressBar>
      )}
    </>
  );
}

export default VerifyQuizHeader;
