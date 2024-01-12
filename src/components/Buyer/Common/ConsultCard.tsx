import styled from 'styled-components';
import { Black, Green, Grey1, Grey2, Grey6, White } from 'styles/color';
import { Body1, Caption2 } from 'styles/font';

import { Characters } from 'utils/Characters';
import { TagA2Consult } from '../../Common/TagA2Consult';
import { useNavigate } from 'react-router-dom';

interface ConsultCardProps {
  consultId: number;
  name: string;
  consultState: ConsultState;
  time: string;
  content: string;
  unread: number;
}
export const ConsultCard = ({
  consultId,
  name,
  consultState,
  time,
  content,
  unread,
}: ConsultCardProps) => {
  const navigate = useNavigate();
  return (
    <Wrapper
      onClick={() => {
        //추후 consult id에 해당하는 letter로 navigate, 채팅 편지 구분까지
        navigate('/buyer/letter/0');
      }}
    >
      <ConsultContent>
        <ConsultStateBox>
          <div className="col1">
            <TagA2Consult tagType={consultState} />
            <Characters number={9} width="5.4rem" height="5.1rem" />
          </div>
          <div className="col2">
            <div className="name-row">
              <Body1 color={Black}>{name}</Body1>
              <Caption2 color={Grey2}>•</Caption2>
              <Caption2 color={Grey2}>{time}</Caption2>
              {unread > 0 ? (
                <Unread>
                  <Caption2 color={White}>{unread}</Caption2>
                </Unread>
              ) : null}
            </div>
            <CardText color={Grey1}>{content}</CardText>
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
