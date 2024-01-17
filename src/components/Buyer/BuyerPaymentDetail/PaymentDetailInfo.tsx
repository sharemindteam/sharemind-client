import styled from 'styled-components';
import { Green, Grey2, Grey3, Grey6, White } from 'styles/color';
import { Body1, Body3, Caption2, Heading } from 'styles/font';
import { Characters } from 'utils/Characters';
import { ReactComponent as Heart } from 'assets/icons/icon-heart2.svg';
import { TagA2Cartegory } from '../../Common/TagA2Cartegory';
interface PaymentDetailInfoProps {
  nickname: string;
  level: number;
  rating: number;
  reviewNumber: number;
  tagList: CartegoryStateArray;
  iconNumber: number;
}
export const PaymentDetailInfo = ({
  nickname,
  level,
  rating,
  reviewNumber,
  tagList,
  iconNumber,
}: PaymentDetailInfoProps) => {
  return (
    <Wrapper>
      <div className="card-headline">
        <Body1 color={Grey3} padding="0.2rem 0">
          상품 정보
        </Body1>
      </div>
      <CardWrapper>
        <div className="col1">
          <div className="row1">
            <Heading>{nickname}</Heading>
            <LevelTag>
              <Caption2 color={White}>Lv {level}</Caption2>
            </LevelTag>
          </div>
          <div className="row2">
            <HeartIcon />
            <Body3 color={Grey2} padding="0.04rem 0 0 0">
              {rating + ' (' + reviewNumber + ')'}
            </Body3>
          </div>
          <div className="row3">
            {tagList.map((value) => {
              return <TagA2Cartegory tagType={value} bgColorType={3} />;
            })}
          </div>
        </div>
        <div className="col2">
          <Characters number={iconNumber} width="7.6rem" height="7rem" />
        </div>
      </CardWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background-color: ${White};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem 0;
  margin: 0.4rem 0 0.8rem 0;
  .card-headline {
    width: 33.5rem;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 1.6rem 0 2.4rem 0;
  width: 33.5rem;
  gap: 7.7rem;
  .col1 {
    display: flex;
    flex-direction: column;
  }
  .row1 {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 1.05rem;
  }
  .row2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.8rem;
  }
  .row3 {
    display: flex;
    gap: 0.8rem;
  }
`;

const LevelTag = styled.div`
  background-color: ${Green};
  padding: 0.4rem 1.2rem;
  border-radius: 0.8rem;
`;
const HeartIcon = styled(Heart)`
  width: 1.9rem;
  height: 1.8rem;
`;
