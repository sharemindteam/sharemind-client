import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1, Grey2, Grey3, Red, White } from 'styles/color';
import { Body1, Body3, Caption2, Heading } from 'styles/font';
import { Characters } from 'utils/Characters';
import { reviewDummyData as dummy } from 'utils/counselorDummy';
import { ReactComponent as Heart } from 'assets/icons/icon-review-empty-heart.svg';
import { ReactComponent as EmptyRate } from 'assets/icons/icon-write-review-empty-heart.svg';
import { ReactComponent as Rate } from 'assets/icons/icon-write-review-heart.svg';
import { ChangeEvent, useState } from 'react';
import { Button } from 'components/Common/Button';
import { Space } from 'components/Common/Space';
export const BuyerWriteReview = () => {
  const navigate = useNavigate();
  //   나중에 여기서 consult id 받아오기, 현재는 0으로 처리
  //   const { id } = useParams();
  //평점
  const [rating, setRating] = useState<number>(0);
  //comment
  const [comment, setComment] = useState<string>('');
  return (
    <Wrapper>
      <HeaderWrapper border={false}>
        <BackIcon
          onClick={() => {
            navigate('/buyer/reviewManage');
          }}
        />
        <Heading color={Grey1}>리뷰 작성</Heading>
      </HeaderWrapper>
      <div className="body-wrapper">
        <div className="title-wrapper">
          <Body1 color={Grey3}>상담 정보</Body1>
        </div>
        <InfoCard>
          <div className="consult-wrapper">
            <Characters
              number={dummy[0].iconNumber}
              width="6.1rem"
              height="5.4rem"
              margin="1.2rem 0 0 1.6rem"
            />
            <div>
              <div className="row1">
                <Body1>{dummy[0].nickname}</Body1>
                <Caption2 color={Grey1}>{'Lv. ' + dummy[0].level}</Caption2>
              </div>
              <div className="row2">
                <HeartIcon />
                <Body3 color={Grey2}>
                  {dummy[0].rating_average + ' (' + dummy[0].reviewNumber + ')'}
                </Body3>
              </div>
            </div>
          </div>
          <div className="detail-wrapper">
            <div className="row">
              <Body3 color={Grey3}>상담유형</Body3>
              <Body3 color={Grey1}>{dummy[0].consultType}</Body3>
            </div>
            <div className="row">
              <Body3 color={Grey3}>상담일자</Body3>
              <Body3 color={Grey1}>{dummy[0].date}</Body3>
            </div>
            <div className="row3">
              <Body3 color={Grey3}>상담가격</Body3>
              <Body3 color={Grey1}>{dummy[0].price}원</Body3>
            </div>
          </div>
        </InfoCard>
        <div className="rate-title-wrapper">
          <Body1 color={Grey3}>평점</Body1>
        </div>
        <RateWrapper>
          {rating >= 1 ? (
            <RateIcon
              onClick={() => {
                setRating(1);
              }}
            />
          ) : (
            <EmptyRateIcon
              onClick={() => {
                setRating(1);
              }}
            />
          )}
          {rating >= 2 ? (
            <RateIcon
              onClick={() => {
                setRating(2);
              }}
            />
          ) : (
            <EmptyRateIcon
              onClick={() => {
                setRating(2);
              }}
            />
          )}
          {rating >= 3 ? (
            <RateIcon
              onClick={() => {
                setRating(3);
              }}
            />
          ) : (
            <EmptyRateIcon
              onClick={() => {
                setRating(3);
              }}
            />
          )}
          {rating >= 4 ? (
            <RateIcon
              onClick={() => {
                setRating(4);
              }}
            />
          ) : (
            <EmptyRateIcon
              onClick={() => {
                setRating(4);
              }}
            />
          )}
          {rating >= 5 ? (
            <RateIcon
              onClick={() => {
                setRating(5);
              }}
            />
          ) : (
            <EmptyRateIcon
              onClick={() => {
                setRating(5);
              }}
            />
          )}
        </RateWrapper>
        <div className="content-title-wrapper">
          <Body1 color={Grey3}>내용</Body1>
        </div>
        <Textarea
          value={comment}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setComment(e.target.value);
          }}
          placeholder="상담 과정은 어땠나요?"
        ></Textarea>
        <div className="length-wrapper">
          <Caption2 color={Red}>{comment.length}</Caption2>
          <Caption2 color={Grey3}>/500</Caption2>
        </div>
        <Button text="작성 완료하기" width="89.33%" height="5.2rem"></Button>
        <Space height="3.2rem" />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .body-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title-wrapper {
    width: 89.33%;
    margin: 1.4rem 0 0.6rem 0;
  }
  .rate-title-wrapper {
    width: 89.33%;
    margin: 3rem 0 0.6rem 0;
  }
  .content-title-wrapper {
    width: 89.33%;
    margin: 1rem 0 0.6rem 0;
  }
  .length-wrapper {
    display: flex;
    width: 89.33%;
    justify-content: flex-end;
    margin-top: 0.4rem;
    margin-bottom: 7rem;
  }
`;
const InfoCard = styled.div`
  height: 16.8rem;
  width: 89.33%;
  border-radius: 0.8rem;
  background-color: ${White};
  .consult-wrapper {
    display: flex;
    gap: 0.8rem;
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
  }

  .detail-wrapper {
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
  }
`;
const HeartIcon = styled(Heart)`
  padding-bottom: 0.2rem;
`;
const RateWrapper = styled.div`
  display: flex;
`;
const RateIcon = styled(Rate)`
  cursor: pointer;
`;
const EmptyRateIcon = styled(EmptyRate)`
  cursor: pointer;
`;
const Textarea = styled.textarea`
  width: 89.33%;
  height: 18.9rem;
  padding: 1.6rem;
  box-sizing: border-box;
  border-radius: 1.2rem;
  border: none;
  outline: none;
  resize: none;
  color: ${Grey1};
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  &::placeholder {
    color: ${Grey3};
  }
`;
