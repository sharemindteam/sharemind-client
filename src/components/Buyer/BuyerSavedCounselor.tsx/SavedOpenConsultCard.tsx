import styled from 'styled-components';
import { Grey1, Grey2, Grey6 } from 'styles/color';
import { Body1, Caption1 } from 'styles/font';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/icon-save2.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/icon-comment.svg';
import { Space } from 'components/Common/Space';

import { openConsultApiObject } from 'pages/Buyer/BuyerConsult';
import { useNavigate } from 'react-router-dom';

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
        <Body1>{item.title}</Body1>
      </div>
      <Space height="1.2rem" />
      <div className="row2">{item.content}</div>
      <div className="row3">
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
      </div>
      <TimeLeft>{item.updatedAt}</TimeLeft>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 89%;
  height: 14rem;
  cursor: pointer;
  position: relative;
  background-color: ${Grey6};
  padding: 1.6rem;
  box-sizing: border-box;
  border-radius: 1.2rem;
  .row1 {
    width: calc(100% - 5rem);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    max-height: 5rem;
    overflow: hidden;
  }
  .row2 {
    display: -webkit-box;
    max-height: 4.7rem;
    -webkit-box-orient: vertical;
    overflow: hidden;
    align-self: flex-end;
    margin-bottom: 0.4rem;
    -webkit-line-clamp: 2;
    color: ${Grey1};
    height: 4.6rem;
    text-overflow: ellipsis;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 155%;
  }
  .row3 {
    display: flex;
    gap: 1.2rem;
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
const TimeLeft = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${Grey2};
  position: absolute;
  bottom: 1.8rem;
  right: 1.6rem;
`;

export default SavedOpenConsultCard;
