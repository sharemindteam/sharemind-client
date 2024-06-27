import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1, Grey2, Grey3, Grey6, White } from 'styles/color';
import { Body1, Body3, Caption2 } from 'styles/font';
import { Characters } from 'utils/Characters';
import { ReactComponent as Heart } from 'assets/icons/icon-review-empty-heart.svg';
import { Button } from 'components/Common/Button';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { BuyerReview } from 'utils/type';

//
//
//

interface ReviewManageCardProps {
  reviewData: BuyerReview;
}

//
//
//

export const ReviewManageCard = ({ reviewData }: ReviewManageCardProps) => {
  const navigate = useNavigate();

  //
  //
  //

  return (
    <Wrapper>
      <UpperWrapper>
        <Characters
          number={consultStyleToCharNum(reviewData.consultStyle)}
          width="6.1rem"
          height="5.4rem"
          margin="1.2rem 0 0 1.6rem"
        />
        <div>
          <div className="row1">
            <Body1>{reviewData.nickname}</Body1>
            <Caption2 color={Grey1}>{'Lv. ' + reviewData.level}</Caption2>
          </div>
          <div className="row2">
            <HeartIcon />
            <Body3 color={Grey2}>
              {reviewData.ratingAverage + ' (' + reviewData.totalReview + ')'}
            </Body3>
          </div>
        </div>
      </UpperWrapper>
      <LowerWrapper>
        <div className="row">
          <Body3 color={Grey3}>상담유형</Body3>
          <Body3 color={Grey1}>{reviewData.consultType}</Body3>
        </div>
        <div className="row">
          <Body3 color={Grey3}>상담일자</Body3>
          <Body3 color={Grey1}>{reviewData.consultedAt}</Body3>
        </div>
        <div className="row3">
          <Body3 color={Grey3}>상담가격</Body3>
          <Body3 color={Grey1}>
            {reviewData.consultCost.toLocaleString()}원
          </Body3>
        </div>
        <Button
          text="리뷰 작성하기"
          width="100%"
          height="4.2rem"
          borderRadius="0.8rem"
          onClick={() => {
            //추후 해당하는 consult id에 해당하는 review로 넘어감
            navigate('/review', { state: { reviewData: reviewData } });
          }}
        />
      </LowerWrapper>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  width: 89%;
  border-radius: 0.8rem;
  background-color: ${Grey6};
`;

const UpperWrapper = styled.div`
  height: 7.2rem;
  display: flex;
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

const LowerWrapper = styled.div`
  height: 12rem;
  padding: 1.8rem 1.6rem 1.6rem 1.6rem;
  .row {
    display: flex;
    gap: 2rem;
  }
  .row3 {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.2rem;
  }
`;
