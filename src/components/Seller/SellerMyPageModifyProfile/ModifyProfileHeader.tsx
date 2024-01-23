import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { White } from 'styles/color';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { ReactComponent as XIcon } from 'assets/icons/icon-x.svg';
import { Heading } from 'styles/font';
import { TabB2 } from 'components/Common/TabB2';
import { SetStateAction } from 'react';
interface ModifyProfileHeaderProps {
  isSetChatTime: boolean;
  setIsSetChatTime: React.Dispatch<SetStateAction<boolean>>;
  isNoProfile: boolean;
}
export const ModifyProfileHeader = ({
  isSetChatTime,
  setIsSetChatTime,
  isNoProfile,
}: ModifyProfileHeaderProps) => {
  const navigate = useNavigate();
  return (
    <TabB2>
      <div className="left-icon">
        {isSetChatTime ? (
          <XIcon
            onClick={() => {
              setIsSetChatTime(false);
            }}
          />
        ) : (
          <LeftArrowIcon
            onClick={() => {
              navigate('/seller/mypage/viewProfile');
            }}
          />
        )}
      </div>
      <Heading>
        {isSetChatTime
          ? '상담 시간'
          : isNoProfile
          ? '판매정보 작성'
          : '판매정보 수정'}
      </Heading>
    </TabB2>
  );
};
