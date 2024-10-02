import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { ReactComponent as XIcon } from 'assets/icons/icon-x.svg';
import { Heading } from 'styles/font';
import { TabB2 } from 'components/Common/TabB2';
import { useEffect, useState } from 'react';
import { getLetterRecentType } from 'api/get';

//
//
//

export const LetterWriteHeader = ({
  isViewQuestion,
  setIsViewQuestion,
}: {
  isViewQuestion: boolean;
  setIsViewQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { consultid } = useParams();
  const [replyLevel, setReplyLevel] = useState('답장 쓰기');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1: any = await getLetterRecentType(consultid);
        if (res1.data.recentType === '질문') {
          setReplyLevel('답장 쓰기');
        } else if (res1.data.recentType === '추가 질문') {
          setReplyLevel('추가답장 쓰기');
        }
        // 현재 답장 쓰기 단계가 아닌데 들어왔을 떄
        else {
          alert('현재 답장 쓰기 단계가 아닙니다.');
          navigate('/minder');
        }
      } catch (err) {
        alert(err);
        navigate('/minder');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  //
  //

  // 추가답장여부
  return (
    <TabB2>
      <div className="left-icon">
        {isViewQuestion ? (
          <XIcon
            onClick={() => {
              setIsViewQuestion(false);
            }}
          />
        ) : (
          <LeftArrowIcon
            onClick={() => {
              navigate(`/minder/letter/${consultid}`);
            }}
          />
        )}
      </div>

      <Heading>{isViewQuestion ? '질문 보기' : replyLevel}</Heading>
    </TabB2>
  );
};
