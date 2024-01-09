import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { ReactComponent as XIcon } from 'assets/icons/icon-x.svg';
import { Heading } from 'styles/font';
import { ModifyProfileHeaderWrapper } from '../SellerMyPageModifyProfile/ModifyProfileHeader';
import { useRecoilValue } from 'recoil';
import { replyState } from 'utils/atom';

export const LetterWriteHeader = ({
  isViewQuestion,
  setIsViewQuestion,
}: {
  isViewQuestion: boolean;
  setIsViewQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { consultid } = useParams();
  // 추가답장여부
  const replyStatus = useRecoilValue(replyState);
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
      <Heading>{isViewQuestion ? '질문 보기' : replyStatus}</Heading>
    </LetterWriteHeaderWrapper>
  );
};

const LetterWriteHeaderWrapper = styled(ModifyProfileHeaderWrapper)``;
