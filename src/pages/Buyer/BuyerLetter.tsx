import { ReactComponent as More } from 'assets/icons/icon-more-review-card.svg';
import { LetterMainSection } from 'components/Buyer/BuyerLetter/LetterMainSection';
import { LetterTags } from 'components/Buyer/BuyerLetter/LetterTags';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';
export const BuyerLetter = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // 질문, 답장, 추가질문 , 추가답장 : 0,1,2,3
  // 태그 변경될 때마다 get 요청해야함
  const [tagStatus, setTagStatus] = useState<number>(0);
  // 질문, 답장, 추가질문 , 추가답장 : 0,1,2,3 / 어디까지 가능한지 여부
  //넘어온 consult의 state에 따라서 api로 받아서 set 하면 될듯?
  const [active, setActive] = useState<number>(0);
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
      <LetterMainSection tagStatus={tagStatus} />
    </>
  );
};
const MoreIcon = styled(More)`
  padding: 1.2rem 0.4rem;
  position: absolute;
  top: 1.2rem;
  right: 2rem;
  cursor: pointer;
`;
