import styled from 'styled-components';
import { ReactComponent as NotWrite } from 'assets/icons/graphic-not-write.svg';
import { ReactComponent as NotArriveGraphic } from 'assets/icons/graphic-not-arrive.svg';
import { Body1, Body2, Body3, Body4 } from 'styles/font';
import { Grey1, Grey3, Grey6 } from 'styles/color';
import { Button } from 'components/Common/Button';
import { Space } from 'components/Common/Space';
import { useNavigate } from 'react-router-dom';
import { GetMessagesType } from 'utils/type';
interface LetterMainSectionProps {
  tagStatus: number;
  consultId: string;
  messageResponse: GetMessagesType;
}
//TODO :마감시간 api로 받아서 전달
export const LetterMainSection = ({
  tagStatus,
  consultId,
  messageResponse,
}: LetterMainSectionProps) => {
  const navigate = useNavigate();

  if (messageResponse.messageId === null) {
    if (tagStatus === 0) {
      return (
        <SectionWrapper>
          <div className="body-wrapper-question">
            <NotWriteGraphic />
            <Space height="1.2rem" />
            <BodyText>고민 내용을 남겨주세요</BodyText>
            <Space height="1.2rem" />
            <Body2 color={Grey1}>연애상담마스터 님이</Body2>
            <div className="text-wrapper">
              <Body1 color={Grey1}>24시간 이내</Body1>
              <Body2 color={Grey1}>에 답장을 드릴 거예요.</Body2>
            </div>
          </div>

          <ButtonWrapper>
            <Button
              text="질문 작성하기"
              width="89.33%"
              height="5.2rem"
              onClick={() => {
                navigate(`/buyer/writeLetter/${consultId}`, {
                  state: { tagStatus: tagStatus },
                });
              }}
            />
            <Space height="3.2rem" />
          </ButtonWrapper>
        </SectionWrapper>
      );
    } else if (tagStatus === 1) {
      return (
        <SectionWrapper>
          <div className="body-wrapper-answer">
            <NotArriveGraphic />
            <Space height="3.4rem" />
            <BodyText>아직 답장이 오지 않았어요!</BodyText>
            <Space height="1.2rem" />
            <Body1 color={Grey1}>2023년 12월 23일 00시까지</Body1>
            <Body2 color={Grey1}>답장이 달리지 않을 경우</Body2>
            <Body2 color={Grey1}>자동으로 환불처리를 진행해드릴게요.</Body2>
            <Body2 color={Grey1}>환불이 진행될 시 이메일로 안내됩니다.</Body2>
          </div>
        </SectionWrapper>
      );
    } else if (tagStatus === 2) {
      return (
        <SectionWrapper>
          <div className="body-wrapper-question">
            <NotWriteGraphic />
            <BodyText>1회 더 질문할 수 있어요</BodyText>
            <Space height="2.2rem" />
            <Body1 color={Grey1}>2023년 12월 23일 00시까지</Body1>
            <Body2 color={Grey1}>추가 질문을 작성하지 않으면</Body2>
            <Body2 color={Grey1}>자동으로 상담이 종료됩니다.</Body2>
          </div>

          <ButtonWrapper>
            <Button
              text="추가질문 작성하기"
              width="89.33%"
              height="5.2rem"
              onClick={() => {
                navigate(`/buyer/writeLetter/${consultId}`, {
                  state: { tagStatus: tagStatus },
                });
              }}
            />
            <Space height="3.2rem" />
          </ButtonWrapper>
        </SectionWrapper>
      );
    } else if (tagStatus === 3) {
      return (
        <SectionWrapper>
          <div className="body-wrapper-answer">
            <NotArriveGraphic />
            <Space height="3.4rem" />
            <BodyText>아직 답장이 오지 않았어요!</BodyText>
            <Space height="1.2rem" />
            <Body1 color={Grey1}>2023년 12월 23일 00시까지</Body1>
            <Body2 color={Grey1}>답장이 달리지 않을 경우</Body2>
            <Body2 color={Grey1}>자동으로 환불처리를 진행해드릴게요.</Body2>
            <Body2 color={Grey1}>환불이 진행될 시 이메일로 안내됩니다.</Body2>
          </div>
        </SectionWrapper>
      );
    }
  } else {
    if (tagStatus === 0) {
      return (
        <SectionWrapper>
          <UpdatedAtBox>
            <Body3 color={Grey3}>{messageResponse.updatedAt}</Body3>
          </UpdatedAtBox>
          <ContentBox>
            <Body2 color={Grey1}>{messageResponse.content}</Body2>
          </ContentBox>
        </SectionWrapper>
      );
    } else if (tagStatus === 1) {
      return (
        <SectionWrapper>
          <div className="body-wrapper-answer">
            <NotArriveGraphic />
            <Space height="3.4rem" />
            <BodyText>아직 답장이 오지 않았어요!</BodyText>
            <Space height="1.2rem" />
            <Body1 color={Grey1}>2023년 12월 23일 00시까지</Body1>
            <Body2 color={Grey1}>답장이 달리지 않을 경우</Body2>
            <Body2 color={Grey1}>자동으로 환불처리를 진행해드릴게요.</Body2>
            <Body2 color={Grey1}>환불이 진행될 시 이메일로 안내됩니다.</Body2>
          </div>
        </SectionWrapper>
      );
    } else if (tagStatus === 2) {
      return (
        <SectionWrapper>
          <div className="body-wrapper-question">
            <NotWriteGraphic />
            <BodyText>1회 더 질문할 수 있어요</BodyText>
            <Space height="2.2rem" />
            <Body1 color={Grey1}>2023년 12월 23일 00시까지</Body1>
            <Body2 color={Grey1}>추가 질문을 작성하지 않으면</Body2>
            <Body2 color={Grey1}>자동으로 상담이 종료됩니다.</Body2>
          </div>

          <ButtonWrapper>
            <Button
              text="추가질문 작성하기"
              width="89.33%"
              height="5.2rem"
              onClick={() => {
                navigate(`/buyer/writeLetter/${consultId}`, {
                  state: { tagStatus: tagStatus },
                });
              }}
            />
            <Space height="3.2rem" />
          </ButtonWrapper>
        </SectionWrapper>
      );
    } else if (tagStatus === 3) {
      return (
        <SectionWrapper>
          <div className="body-wrapper-answer">
            <NotArriveGraphic />
            <Space height="3.4rem" />
            <BodyText>아직 답장이 오지 않았어요!</BodyText>
            <Space height="1.2rem" />
            <Body1 color={Grey1}>2023년 12월 23일 00시까지</Body1>
            <Body2 color={Grey1}>답장이 달리지 않을 경우</Body2>
            <Body2 color={Grey1}>자동으로 환불처리를 진행해드릴게요.</Body2>
            <Body2 color={Grey1}>환불이 진행될 시 이메일로 안내됩니다.</Body2>
          </div>
        </SectionWrapper>
      );
    }
  }
};
const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .text-wrapper {
    display: flex;
  }
  .body-wrapper-question {
    display: flex;
    margin-top: 10vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .body-wrapper-answer {
    display: flex;
    margin-top: 8vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const BodyText = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3rem;
`;
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
`;
const ContentBox = styled.div`
  background-color: ${Grey6};
  padding: 1.6rem;
  width: 89.33%;
  border-radius: 1.2rem;
  box-sizing: border-box;
`;
const UpdatedAtBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.2rem 2.4rem;
  width: 100%;
  box-sizing: border-box;
`;
const NotWriteGraphic = styled(NotWrite)`
  margin: 3.2rem 0;
`;
