import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { ReactComponent as XIcon } from 'assets/icons/icon-x.svg';
import { Heading } from 'styles/font';
import { ModifyProfileHeaderWrapper } from '../SellerMyPageModifyProfile/ModifyProfileHeader';

export const LetterWriteHeader = ({
  isViewQuestion,
  setIsViewQuestion,
}: {
  isViewQuestion: boolean;
  setIsViewQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { consultid } = useParams();
  return (
    <LetterWriteHeaderWrapper>
      <div style={{ position: 'absolute', left: '2rem', cursor: 'pointer' }}>
        {isViewQuestion ? (
          <XIcon
            onClick={() => {
              setIsViewQuestion(false);
            }}
          />
        ) : (
          <LeftArrowIcon
            onClick={() => {
              navigate(`/seller/letter/${consultid}`);
            }}
          />
        )}
      </div>
      <Heading>{isViewQuestion ? '질문 보기' : '답장 쓰기'}</Heading>
    </LetterWriteHeaderWrapper>
  );
};

const LetterWriteHeaderWrapper = styled(ModifyProfileHeaderWrapper)``;
