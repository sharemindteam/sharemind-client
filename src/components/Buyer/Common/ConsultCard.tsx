import styled from 'styled-components';
import { Black, Grey1, Grey2, Grey6 } from 'styles/color';
import { Body1, Caption2 } from 'styles/font';

import { Characters } from 'utils/Characters';
import { TagA2Consult } from './TagA2Consult';

interface ConsultCardProps {
  name: string;
  consultState: BuyerConsultState;
  time: string;
  content: string;
}
export const ConsultCard = ({
  name,
  consultState,
  time,
  content,
}: ConsultCardProps) => {
  return (
    <Wrapper>
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
    gap: 0.8rem;
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
