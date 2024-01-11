import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { White } from 'styles/color';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { Heading } from 'styles/font';
import { TabB2 } from 'components/Common/TabB2';
export const ModifyProfileHeader = () => {
  const navigate = useNavigate();
  return (
    <TabB2>
      <div className="left-icon">
        <LeftArrowIcon
          onClick={() => {
            navigate('/seller/mypage/viewProfile');
          }}
        />
      </div>
      <Heading>판매정보 수정</Heading>
    </TabB2>
  );
};
