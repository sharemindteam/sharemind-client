import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { White } from 'styles/color';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { Heading } from 'styles/font';
import {
  ModifyProfileHeader,
  ModifyProfileHeaderWrapper,
} from '../SellerMyPageModifyProfile/ModifyProfileHeader';

export const LetterWriteHeader = () => {
  const navigate = useNavigate();
  return (
    <LetterWriteHeaderWrapper>
      <div style={{ position: 'absolute', left: '2rem', cursor: 'pointer' }}>
        <LeftArrowIcon
          onClick={() => {
            navigate('/seller/mypage/viewProfile');
          }}
        />
      </div>
      <Heading>답장 쓰기</Heading>
    </LetterWriteHeaderWrapper>
  );
};

const LetterWriteHeaderWrapper = styled(ModifyProfileHeaderWrapper)``;
