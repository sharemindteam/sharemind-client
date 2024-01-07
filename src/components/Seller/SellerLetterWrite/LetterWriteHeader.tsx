import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { Heading } from 'styles/font';
import { ModifyProfileHeaderWrapper } from '../SellerMyPageModifyProfile/ModifyProfileHeader';

export const LetterWriteHeader = () => {
  const navigate = useNavigate();
  const { consultid } = useParams();
  return (
    <LetterWriteHeaderWrapper>
      <div style={{ position: 'absolute', left: '2rem', cursor: 'pointer' }}>
        <LeftArrowIcon
          onClick={() => {
            navigate(`/seller/letter/${consultid}`);
          }}
        />
      </div>
      <Heading>답장 쓰기</Heading>
    </LetterWriteHeaderWrapper>
  );
};

const LetterWriteHeaderWrapper = styled(ModifyProfileHeaderWrapper)``;
