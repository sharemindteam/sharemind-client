import styled from 'styled-components';
import { Grey1, Grey2, Grey6 } from 'styles/color';
import { Body1, Caption1, Caption2 } from 'styles/font';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/icon-save2.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/icon-comment.svg';
import { Space } from 'components/Common/Space';

import { openConsultApiObject } from 'pages/Buyer/BuyerConsult';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'components/Common/Flex';

//
//
//

interface SavedCounselorCardProps {
  item: openConsultApiObject;
}

//
//
//

function SavedOpenConsultCard({ item }: SavedCounselorCardProps) {
  const navigate = useNavigate();

  //
  //
  //

  return (
    <Wrapper
      onClick={() => {
        navigate(`/open-consult/${item.postId}`);
      }}
    >
      <div className="row1">
        <Body1 style={{ textAlign: 'left' }}>{item.title}</Body1>
      </div>
      <Space height="1.2rem" />
      <div className="row2">{item.content}</div>
      <Flex justify="space-between">
        <Flex gap="1.2rem">
          <IconItem>
            <HeartResizeIcon />
            <Caption1 color={Grey2}>{item.totalLike}</Caption1>
          </IconItem>
          <IconItem>
            <SaveIcon />
            <Caption1 color={Grey2}>{item.totalScrap}</Caption1>
          </IconItem>
          <IconItem>
            <CommentIcon />
            <Caption1 color={Grey2}>{item.totalComment}</Caption1>
          </IconItem>
        </Flex>
        <Caption2 color={Grey2}>{item.updatedAt}</Caption2>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 14rem;
  cursor: pointer;

  background-color: ${Grey6};
  padding: 1.6rem;
  box-sizing: border-box;
  border-radius: 1.2rem;
  .row1 {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .row2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    align-self: flex-end;
    -webkit-line-clamp: 2;
    margin-bottom: 0.4rem;
    color: ${Grey1};
    height: 4.6rem;
    text-overflow: ellipsis;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 155%;
  }
`;
const HeartResizeIcon = styled(HeartIcon)`
  width: 2rem;
  height: 2rem;
`;
const IconItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default SavedOpenConsultCard;
