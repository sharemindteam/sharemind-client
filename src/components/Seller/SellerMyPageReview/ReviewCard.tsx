import styled from 'styled-components';
import { Body1, Body3 } from 'styles/font';
import { Characters } from 'utils/Characters';
import { ReactComponent as MoreIcon } from 'assets/icons/icon-more2.svg';
import { Grey3, Grey6, White } from 'styles/color';
import { HeartRate } from 'utils/HeartRate';
import { useRecoilState } from 'recoil';
import { isReviewComplaintOpenState } from 'utils/atom';
import { BackDrop } from 'components/Common/BackDrop';
import { ReviewComplaintMenu } from './ReviewComplaintMenu';

//
//
//

export interface ReviewCardProps {
  id: number;
  name: string;
  iconType: number;
  consultType: string;
  date: string;
  price: string;
  rating: number;
  review: string;
}

//
//
//

export const ReviewCard = ({
  id,
  name,
  iconType,
  consultType,
  date,
  price,
  rating,
  review,
}: ReviewCardProps) => {
  const [isReviewComplaintOpen, setIsReviewComplaintOpen] = useRecoilState(
    isReviewComplaintOpenState,
  );

  //
  //
  //

  return (
    <>
      {isReviewComplaintOpen && (
        <>
          <BackDrop
            onClick={() => {
              setIsReviewComplaintOpen(false);
            }}
          />
          <ReviewComplaintMenu id={id} />
        </>
      )}
      <ReviewCardWrapper>
        <div className="row1">
          <Characters width="4.4rem" number={iconType} />
          <Body1>{name}</Body1>
          <ComplaintIcon
            onClick={() => {
              setIsReviewComplaintOpen(true);
            }}
          />
        </div>
        <div className="row2">
          <div className="consultType">
            <Body3 color={Grey3}>상담유형</Body3>
            <Body3>{consultType}</Body3>
          </div>
          <div className="date">
            <Body3 color={Grey3}>상담일자</Body3>
            <Body3>{date}</Body3>
          </div>
          <div className="price">
            <Body3 color={Grey3}>상담가격</Body3>
            <Body3>{price}원</Body3>
          </div>
          <div className="rating">
            <Body3 color={Grey3}>별점</Body3>
            <HeartRate rating={rating} />
          </div>
        </div>
        <div className="row3">
          <div className="review">
            <Body3>{review}</Body3>
          </div>
        </div>
      </ReviewCardWrapper>
    </>
  );
};

const ReviewCardWrapper = styled.div`
  background-color: ${Grey6};
  width: calc(100% - 4rem);
  border-radius: 0.8rem;
  .row1 {
    display: flex;
    height: 5.6rem;
    padding: 1rem 1.6rem;
    box-sizing: border-box;
    align-items: center;
    gap: 2.5rem;
    border-bottom: 1px solid ${White};
  }
  .row2 {
    padding: 1rem 1.6rem 1.8rem;
    border-bottom: 1px solid ${White};
  }
  .row2 > div {
    display: flex;
    gap: 2rem;
  }
  .row2 .rating {
    height: 2.5rem;
    align-items: center;
    margin-top: 0.8rem;
    gap: 4.3rem;
  }
  .row3 {
    padding: 1.6rem;
  }
`;

const ComplaintIcon = styled(MoreIcon)`
  margin-left: auto;
  cursor: pointer;
`;
