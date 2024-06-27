import styled from 'styled-components';
import {
  Black,
  Green,
  Grey1,
  Grey2,
  Grey3,
  Grey4,
  Grey6,
  White,
} from 'styles/color';
import { Body1, Caption2 } from 'styles/font';
import { Characters } from 'utils/Characters';
import { TagA2Consult } from '../../Common/TagA2Consult';
import { useNavigate } from 'react-router-dom';
import { ConsultState } from 'utils/type';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { Button } from 'components/Common/Button';

//
//
//

interface ConsultCardProps {
  consultStyle: string;
  id: number;
  latestMessageContent: string | null;
  latestMessageIsCustomer: boolean | null;
  latestMessageUpdatedAt: string | null;
  opponentNickname: string;
  status: string;
  unreadMessageCount: number | null;
  reviewCompleted: boolean | null;
  consultId: number | null;
  isLetter: boolean;
}

//
//
//

export const ConsultCard = ({
  consultStyle,
  id,
  latestMessageContent,
  latestMessageIsCustomer,
  latestMessageUpdatedAt,
  opponentNickname,
  status,
  unreadMessageCount,
  reviewCompleted,
  consultId,
  isLetter,
}: ConsultCardProps) => {
  const navigate = useNavigate();
  const consultStatus = status as ConsultState;
  const isBlur: boolean =
    consultStatus === '상담 종료' || consultStatus === '상담 취소';

  const filterdUnreadMessageCount = unreadMessageCount ?? 0;

  /**
   *
   */
  const handleReviewClick = (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    navigate('/reviewManage');
  };

  //
  //
  //

  return (
    <Wrapper
      onClick={() => {
        if (isLetter) {
          navigate(`/letter/${id}`, {
            state: { isReviewCompleted: reviewCompleted },
          });
        } else {
          navigate(`/chat/${id}`);
        }
      }}
    >
      <ConsultContent>
        <ConsultStateBox>
          <div className="col1">
            <TagA2Consult tagType={consultStatus} />
            <div
              style={{
                opacity: `${isBlur ? '0.5' : '1'}`,
              }}
            >
              <Characters
                number={consultStyleToCharNum(consultStyle)}
                width="5.4rem"
                height="5.1rem"
              />
            </div>
          </div>
          <div className="col2">
            <div className="col2-row1">
              <div className="name-row">
                <Body1 color={isBlur ? Grey3 : Black}>{opponentNickname}</Body1>
                {latestMessageUpdatedAt !== null && (
                  <>
                    <Caption2 color={isBlur ? Grey4 : Grey2}>•</Caption2>
                    <Caption2 color={isBlur ? Grey4 : Grey2}>
                      {latestMessageUpdatedAt}
                    </Caption2>
                  </>
                )}
              </div>
              {filterdUnreadMessageCount > 0 ? (
                <Unread>
                  <Caption2 color={White}>{filterdUnreadMessageCount}</Caption2>
                </Unread>
              ) : null}
            </div>
            {latestMessageContent !== null ? (
              <CardText $color={isBlur ? Grey3 : Grey1}>
                {latestMessageContent}
              </CardText>
            ) : (
              <CardText $color={Grey1}>
                {opponentNickname}님께 고민 내용을 남겨 주세요.{' '}
                {opponentNickname}님이 24시간 이내 답장을 드릴 거예요.
              </CardText>
            )}
          </div>
        </ConsultStateBox>
      </ConsultContent>
      {reviewCompleted === false && (
        <Button
          text="리뷰 작성하기"
          height="4.2rem"
          width="90.44%"
          backgroundColor={White}
          color={Green}
          buttonTextType={2}
          margin="0 0 1.6rem 0"
          onClick={handleReviewClick}
        />
      )}
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  width: 100%;
  background-color: ${Grey6};
  border-radius: 0.75rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConsultContent = styled.div`
  padding: 1.6rem;
  width: 100%;
  box-sizing: border-box;
`;

const Unread = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  background-color: ${Green};
  width: 1.9rem;
  height: 1.9rem;
  right: 0;
`;

const ConsultStateBox = styled.div`
  display: flex;
  gap: 1.6rem;
  .col1 {
    display: flex;
    flex-basis: auto;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }
  .name-row {
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
    gap: 0.8rem;
  }
  .col2 {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap: 1.2rem;
  }
  .col2-row1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const CardText = styled.div<{ $color: string }>`
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  font-family: Pretendard;
  color: ${(props) => props.$color};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 155%;
  text-align: left;
`;
