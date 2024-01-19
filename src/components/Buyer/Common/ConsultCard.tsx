import styled from 'styled-components';
import { Black, Green, Grey1, Grey2, Grey6, White } from 'styles/color';
import { Body1, Caption2 } from 'styles/font';

import { Characters } from 'utils/Characters';
import { TagA2Consult } from '../../Common/TagA2Consult';
import { useNavigate } from 'react-router-dom';

interface ConsultCardProps {
  consultStyle: string;
  id: number;
  latestMessageContent: string | null;
  latestMessageIsCustomer: boolean | null;
  latestMessageUpdatedAt: string | null;
  opponentNickname: string;
  status: string;
  unreadMessageCount: number | null;
}
export const ConsultCard = ({
  consultStyle,
  id,
  latestMessageContent,
  latestMessageIsCustomer,
  latestMessageUpdatedAt,
  opponentNickname,
  status,
  unreadMessageCount,
}: ConsultCardProps) => {
  const navigate = useNavigate();
  const consultStatus = status as ConsultState;
  if (unreadMessageCount === null) {
    unreadMessageCount = 0;
  }
  return (
    <Wrapper
      onClick={() => {
        //추후 consult id에 해당하는 letter로 navigate, 채팅 편지 구분까지
        navigate(`/buyer/letter`, { state: { consultId: id } });
      }}
    >
      <ConsultContent>
        <ConsultStateBox>
          <div className="col1">
            <TagA2Consult tagType={consultStatus} />
            <Characters number={9} width="5.4rem" height="5.1rem" />
          </div>
          <div className="col2">
            <div className="name-row">
              <Body1 color={Black}>{opponentNickname}</Body1>
              {latestMessageUpdatedAt !== null && (
                <>
                  <Caption2 color={Grey2}>•</Caption2>
                  <Caption2 color={Grey2}>{latestMessageUpdatedAt}</Caption2>
                </>
              )}

              {unreadMessageCount > 0 ? (
                <Unread>
                  <Caption2 color={White}>{unreadMessageCount}</Caption2>
                </Unread>
              ) : null}
            </div>
            {latestMessageContent !== null ? (
              <CardText color={Grey1}>{latestMessageContent}</CardText>
            ) : (
              <CardText color={Grey1}>
                {opponentNickname}님께 고민 내용을 남겨 주세요.
              </CardText>
            )}
          </div>
        </ConsultStateBox>
      </ConsultContent>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 89%;
  height: 11.5rem;
  background-color: ${Grey6};
  border-radius: 1.2rem;
  cursor: pointer;
`;
const ConsultContent = styled.div`
  padding: 1.6rem;
`;
const Unread = styled.div`
  position: absolute;
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
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }
  .name-row {
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
    gap: 0.8rem;
    position: relative;
  }
  .col2 {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
`;
export const CardText = styled.div`
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  font-family: Pretendard;
  color: ${Grey1};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 155%;
`;
