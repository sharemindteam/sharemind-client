import styled from 'styled-components';
import { Grey1, Grey4, Grey6 } from 'styles/color';
import { Body1, Body2, Body3 } from 'styles/font';
import { HeartRate } from 'utils/HeartRate';
interface CounselorReviewProps {
  reviewList: Review[];
}
export const CounselorReview = ({ reviewList }: CounselorReviewProps) => {
  return (
    <Wrapper>
      <Body1 color={Grey4} margin="0 0 1.2rem 0">
        상담 후기
      </Body1>

      {reviewList.map((value) => {
        return (
          <ReviewCard>
            <div className="row1">
              <Body1 color={Grey1}>{value.name}</Body1>
              <Body3 color={Grey1}>{value.time}</Body3>
            </div>
            <div className="row2">
              <HeartRate rating={value.rating}></HeartRate>
            </div>
            <div className="row3">
              <Body2>{value.comment}</Body2>
            </div>
          </ReviewCard>
        );
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 1.2rem 2rem 2rem 2rem;
  margin-bottom: 5.2rem;
`;
const ReviewCard = styled.div`
  padding: 1.6rem;
  border-radius: 1.2rem;
  background-color: ${Grey6};
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.2rem;
  .row1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
