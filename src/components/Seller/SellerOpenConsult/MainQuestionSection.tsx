import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grey1, Grey2, Grey3, Grey6, White } from 'styles/color';
import { ReactComponent as LockIcon } from 'assets/icons/icon-lock.svg';
import { Body1, Caption1, Caption2 } from 'styles/font';
import { Space } from 'components/Common/Space';
import { getCounselorsOneConsult } from 'api/get';
import { useParams } from 'react-router-dom';
import { openConsultApiObject } from 'pages/Buyer/BuyerConsult';
import { formattedMessage } from 'utils/formattedMessage';

//
//
//

function MainQuestionSection() {
  const { consultid } = useParams();
  const [card, setCard] = useState<openConsultApiObject | undefined>(undefined);

  //
  //
  //
  useEffect(() => {
    const fetchOneConsult = async () => {
      try {
        const res: any = await getCounselorsOneConsult(consultid);
        setCard(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchOneConsult();
  }, [consultid]);

  //
  //
  //

  return (
    <MainQuestionWrapper>
      <MainQuestionText>
        <div className="row1">
          <Body1>{card?.title}</Body1>
          {card?.isPublic && (
            <PrivateSign>
              <LockIcon />
              <Caption1 color={Grey3}>비공개</Caption1>
            </PrivateSign>
          )}
        </div>
        <Space height="1.2rem" />
        <div className="row2">{formattedMessage(card?.content)}</div>
        <Space height="0.8rem" />
        <div className="row3">
          <Caption2 color={Grey2}>{card?.updatedAt}</Caption2>
          <Circle />
          <Caption2 color={Grey2}>{card?.consultCategory}</Caption2>
        </div>
        <Space height="1rem" />
      </MainQuestionText>
      {/* 나중에 사용할수도 있는 코드 */}
      {/* <ButtonList>
        <ButtonItem>
          <HeartIcon />
          <Caption1 color={Grey2}>{card?.totalLike}</Caption1>
        </ButtonItem>
        <ButtonItem>
          <SaveResizeIcon />
          <Caption1 color={Grey2}>{card?.totalScrap}</Caption1>
        </ButtonItem>
      </ButtonList> */}
    </MainQuestionWrapper>
  );
}

//
//
//

const MainQuestionWrapper = styled.section`
  display: flex;
  padding: 1.2rem 2rem;
  flex-direction: column;
  gap: 1.2rem;
  background-color: ${Grey6};
  border-bottom: 1px solid ${Grey6};
`;

const MainQuestionText = styled.div`
  width: 100%;
  position: relative;
  padding: 1.6rem;
  box-sizing: border-box;
  background-color: ${White};
  border-radius: 1.2rem;
  .row1 {
    display: -webkit-box;
    width: calc(100% - 5rem);
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    max-height: 3rem;
    overflow: hidden;
  }
  .row2 {
    align-self: flex-end;
    margin-bottom: 0.4rem;
    color: ${Grey1};
    font-family: Pretendard;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 155%;
  }
  .row3 {
    display: flex;
    gap: 0.8rem;
    align-items: center;
  }
`;
const PrivateSign = styled.div`
  display: flex;
  position: absolute;
  top: 1.95rem;
  right: 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
const Circle = styled.div`
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 100%;
  background-color: ${Grey3};
`;

// 나중에 사용할 수도 있는 코드..
// const ButtonList = styled.div`
//   display: flex;
//   gap: 1.2rem;
// `;

// const ButtonItem = styled.div`
//   border-radius: 0.8rem;
//   background: ${Grey6};
//   display: flex;
//   padding: 0.6rem 1.2rem 0.6rem 0.6rem;
//   align-items: center;
//   gap: 0.4rem;
// `;

// const SaveResizeIcon = styled(SaveIcon)`
//   width: 2rem;
//   height: 2rem;
// `;
export default React.memo(MainQuestionSection);
