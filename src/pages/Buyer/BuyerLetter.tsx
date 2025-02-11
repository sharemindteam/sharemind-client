import {
  getLetterDeadline,
  getLetterMessages,
  getLetterRecentType,
  getLettersNickname,
} from 'api/get';
import { ReactComponent as More } from 'assets/icons/icon-more-review-card.svg';
import { LetterMainSection } from 'components/Buyer/BuyerLetter/LetterMainSection';
import { LetterTags } from 'components/Buyer/BuyerLetter/LetterTags';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { BackDrop } from 'components/Common/BackDrop';
import { ComplaintModal } from 'components/Seller/Common/ComplaintModal';
import { useShowComplainttModal } from 'hooks/useShowComplaintModal';
import { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { isLoadingState } from 'utils/atom';
import { GetMessagesType } from 'utils/type';

//
//
//

export const BuyerLetter = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // 질문, 답장, 추가질문 , 추가답장 : 0,1,2,3 / 어디까지 가능한지 여부
  const [active, setActive] = useState<number>(0);

  // 질문, 답장, 추가질문 , 추가답장 : 0,1,2,3
  // 태그 변경될 때마다 get 요청해야함
  const [tagStatus, setTagStatus] = useState<number>(0);

  // 메세지 get 요청 response
  const [messageResponse, setMessageResponse] = useState<GetMessagesType>({
    content: null,
    messageId: null,
    messageType: null,
    updatedAt: null,
  });

  //마감기한
  const [deadline, setDeadline] = useState<string>('');
  //로딩 state
  const [isLoading, setIsLoading] = useRecoilState<boolean>(isLoadingState);
  const { isComplaintModalOpen, handleBackDropClick, handleMoreButtonClick } =
    useShowComplainttModal();
  //상대 이름 state
  const [opponentNickname, setOpponentNickname] = useState<string>('');

  /**
   *
   */
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res: any = await getLetterRecentType(id);
      if (res.status === 200) {
        if (
          res.data.recentType === '해당 편지에 대해 작성된 메시지가 없습니다.'
        ) {
          setActive(0);
        } else if (res.data.recentType === '질문') {
          await fetchDeadline();
          setActive(1);
        } else if (res.data.recentType === '답장') {
          await fetchDeadline();
          setActive(2);
        } else if (
          res.data.recentType === '추가 질문' ||
          res.data.recentType === '추가 답장'
        ) {
          await fetchDeadline();
          setActive(3);
        }
      } else if (res.response.status === 404) {
        console.error('Failed to fetch recent type:', res);
      }
    } catch (error) {
      console.error('Error fetching recent type:', error);
    } finally {
      await fetchMessageData(); // API 요청이 완료되면 isLoading을 false로 설정
    }
  };

  /**
   *
   */
  const fetchDeadline = async () => {
    try {
      const res: any = await getLetterDeadline(id);
      if (res.status === 200) {
        setDeadline(res.data.deadline);
      } else if (res.response.status === 404) {
        alert('존재하지 않는 상담입니다.');
        navigate('/consult');
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   *
   */
  const fetchMessageData = async () => {
    //tagStatus에 따라 메세지 가져와서 있는지 없는지 여부랑
    //있으면 내용까지 같이
    let messageTypeValue;
    if (tagStatus === 0) {
      messageTypeValue = 'first_question';
    } else if (tagStatus === 1) {
      messageTypeValue = 'first_reply';
    } else if (tagStatus === 2) {
      messageTypeValue = 'second_question';
    } else if (tagStatus === 3) {
      messageTypeValue = 'second_reply';
    }
    const params = {
      messageType: messageTypeValue,
      isCompleted: true,
    };
    try {
      const res: any = await getLetterMessages({ params }, id);
      if (res.status === 200) {
        setMessageResponse(res.data);
      } else if (res.response.status === 403) {
        alert('접근 권한이 없습니다.');
        navigate('/consult');
      } else if (res.response.status === 404) {
        alert('존재하지 않는 편지 아이디로 요청되었습니다.');
      }
    } catch (e) {
      console.log(e);
    } finally {
      // setIsLoading(false); // API 요청이 완료되면 isLoading을 false로 설정
      setTimeout(() => {
        setIsLoading(false);
      }, 1);
    }
  };

  /**
   *
   */
  const fetchNicknameData = async () => {
    const res: any = await getLettersNickname(id);
    if (res.status === 200) {
      setOpponentNickname(res.data);
    } else if (res.response.status === 403) {
      alert('편지 참여자가 아닙니다.');
    } else if (res.response.status === 403) {
      alert('존재하지 않는 편지 아이디입니다.');
    }
  };

  //
  // location null일 시 예외처리
  //
  useLayoutEffect(() => {
    fetchData();
  }, [tagStatus]);

  //
  //
  //
  useLayoutEffect(() => {
    fetchNicknameData();
  }, []);

  //
  //
  //

  const handleComplaintButtonClick = () => {
    window.open(process.env.REACT_APP_REPORT_URL);
  };

  if (isLoading) {
    return (
      <>
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate('/consult');
            }}
          />
          <MoreIcon />
        </HeaderWrapper>
        <div
          style={{
            height: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (id !== undefined) {
    return (
      <>
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate('/consult');
            }}
          />
          {/* params로 넘어온 id에 해당하는 상담이름 */}
          <Heading color={Grey1}>{opponentNickname}</Heading>
          <MoreIcon onClick={handleMoreButtonClick} />
        </HeaderWrapper>
        {isComplaintModalOpen && (
          <>
            <BackDrop onClick={handleBackDropClick} />
            <ComplaintModal
              handleComplaintButtonClick={handleComplaintButtonClick}
            />
          </>
        )}
        <LetterTags
          tagStatus={tagStatus}
          setTagStatus={setTagStatus}
          active={active}
        />
        {/* 현재 선택된 tag와 해당 태그에  content가 있는지 여부를 전달 */}
        <LetterMainSection
          tagStatus={tagStatus}
          consultId={id}
          messageResponse={messageResponse}
          deadline={deadline}
        />
      </>
    );
  } else {
    <>404 error</>;
  }
};
const MoreIcon = styled(More)`
  padding: 1.2rem 0.4rem;
  position: absolute;
  top: 1.2rem;
  right: 2rem;
  cursor: pointer;
`;
