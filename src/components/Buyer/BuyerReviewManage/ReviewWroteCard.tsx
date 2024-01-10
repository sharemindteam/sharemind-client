import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1, Grey2, Grey3, Grey6, White } from 'styles/color';
import { Body1, Body3, Caption2 } from 'styles/font';
import { Characters } from 'utils/Characters';
import { ReactComponent as Heart } from 'assets/icons/icon-review-empty-heart.svg';
import { ReactComponent as More } from 'assets/icons/icon-more-review-card.svg';
import { HeartRate } from 'utils/HeartRate';
interface ReviewWroteCardProps {
  counselorId: number;
  nickname: string;
  level: number;
  ratingAverage: number;
  reviewNumber: number;
  iconNumber: number;
  consultType: string;
  price: number;
  date: string;
  rating: number;
  comment: string;
}
//캐릭터 넘버 레벨 별점 후기개수 상담유형 상담일자 상담가격 (남긴리뷰) 리뷰내용
export const ReviewWroteCard = ({
  counselorId,
  nickname,
  level,
  ratingAverage,
  reviewNumber,
  iconNumber,
  consultType,
  price,
  date,
  rating,
  comment,
}: ReviewWroteCardProps) => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <UpperWrapper>
        <Characters
          number={iconNumber}
          width="6.1rem"
          height="5.4rem"
          margin="1.2rem 0 0 1.6rem"
        />
        <div>
          <div className="row1">
            <Body1>{nickname}</Body1>
            <Caption2 color={Grey1}>{'Lv. ' + level}</Caption2>
          </div>
          <div className="row2">
            <HeartIcon />
            <Body3 color={Grey2}>
              {ratingAverage + ' (' + reviewNumber + ')'}
            </Body3>
          </div>
        </div>

        <MoreIcon />
      </UpperWrapper>
      <MiddleWrapper>
        <div className="row">
          <Body3 color={Grey3}>상담유형</Body3>
          <Body3 color={Grey1}>{consultType}</Body3>
        </div>
        <div className="row">
          <Body3 color={Grey3}>상담일자</Body3>
          <Body3 color={Grey1}>{date}</Body3>
        </div>
        <div className="row">
          <Body3 color={Grey3}>상담가격</Body3>
          <Body3 color={Grey1}>{price}원</Body3>
        </div>
        <div className="rate-row">
          <Body3 color={Grey3}>별점</Body3>
          <HeartRate rating={rating} />
        </div>
      </MiddleWrapper>
      <LowerWrapper>
        <Body3 color={Grey1}>{comment}</Body3>
      </LowerWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 89%;
  border-radius: 0.8rem;
  background-color: ${Grey6};
`;
const UpperWrapper = styled.div`
  height: 7.2rem;
  display: flex;
  position: relative;
  gap: 0.8rem;
  border-bottom: 1px solid ${White};
  .row1 {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-top: 1.2rem;
  }
  .row2 {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
`;
const HeartIcon = styled(Heart)`
  padding-bottom: 0.2rem;
`;
const MiddleWrapper = styled.div`
  height: 9.2rem;
  padding: 1.8rem 1.6rem 1.6rem 1.6rem;
  border-bottom: 1px solid ${White};
  .row {
    display: flex;
    gap: 2rem;
  }
  .rate-row {
    margin-top: 0.8rem;
    display: flex;
    gap: 4.3rem;
  }
`;
const LowerWrapper = styled.div`
  height: 8.8rem;
  padding: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MoreIcon = styled(More)`
  padding: 1.2rem 0.4rem;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  cursor: pointer;
`;
