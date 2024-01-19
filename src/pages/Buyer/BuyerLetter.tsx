import {
  getCounselorCategories,
  getLetterMessages,
  getLetterRecentType,
} from 'api/get';
import { ReactComponent as More } from 'assets/icons/icon-more-review-card.svg';
import { LetterMainSection } from 'components/Buyer/BuyerLetter/LetterMainSection';
import { LetterTags } from 'components/Buyer/BuyerLetter/LetterTags';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';
export const BuyerLetter = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // 질문, 답장, 추가질문 , 추가답장 : 0,1,2,3 / 어디까지 가능한지 여부
  const [active, setActive] = useState<number>(0);
  // 질문, 답장, 추가질문 , 추가답장 : 0,1,2,3
  // 태그 변경될 때마다 get 요청해야함
  const [tagStatus, setTagStatus] = useState<number>(0);
  //제일 먼저 현재 상담 상태 정보업데이트
  const fetchRecentType = async () => {
    try {
      const res: any = await getLetterRecentType(id);

      if (res.status === 200) {
        if (
          res.data.recentType === '해당 편지에 대해 작성된 메시지가 없습니다.'
        ) {
          setActive(0);
          // await fetchMessageData();
        }
      } else if (res.response.status === 404) {
        console.error('Failed to fetch recent type:', res);
      }
    } catch (error) {
      console.error('Error fetching recent type:', error);
    }
  };
  //그 후 message가져옴 tagState에 따라 params 다르게처리
  //isCompleted가 true면 최종제출된걸 가져옴
  //false면 임시저장으로가져옴
  const fetchMessageData = async () => {
    const params = {
      messageType: 'FIRST_QUESTION',
      isCompleted: true,
    };
    try {
      const res: any = await getLetterMessages({ params }, id);
      if (res.status === 200) {
      } else if (res.response.status === 403) {
        alert('접근 권한이 없습니다.');
        navigate('/buyer/consult');
      } else if (res.response.status === 404) {
        alert('존재하지 않는 편지 아이디로 요청되었습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };
  //location null 시 예외처리
  useEffect(() => {
    fetchRecentType();
    fetchMessageData();
  }, [tagStatus]);
  if (id !== undefined) {
    return (
      <>
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate('/buyer/consult');
            }}
          />
          {/* params로 넘어온 id에 해당하는 상담이름 */}
          <Heading color={Grey1}>연애상담마스터</Heading>
          <MoreIcon />
        </HeaderWrapper>
        <LetterTags
          tagStatus={tagStatus}
          setTagStatus={setTagStatus}
          active={active}
        />
        {/* 현재 선택된 tag와 해당 태그에  content가 있는지 여부를 전달 */}
        <LetterMainSection tagStatus={tagStatus} consultId={id} />
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
