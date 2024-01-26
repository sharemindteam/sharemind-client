import styled from 'styled-components';
import { Green, Grey2, Grey6, White } from 'styles/color';
import { Body3, Caption2, Heading } from 'styles/font';
import { Characters } from 'utils/Characters';
import { ReactComponent as Heart } from 'assets/icons/icon-heart2.svg';
import { TagA2Cartegory } from '../../Common/TagA2Cartegory';
import { CartegoryState } from 'utils/type';
interface CounselorProfileCardProps {
  nickname: string;
  level: number;
  rating: number;
  reviewNumber: number;
  tagList: CartegoryState[];
  consultStyle: number;
}
export const CounselorProfileCard = ({
  nickname,
  level,
  rating,
  reviewNumber,
  tagList,
  consultStyle,
}: CounselorProfileCardProps) => {
  //여기 dummy data 나중에는 page에서 props로 뿌리는게 나을듯함

  return (
    <Wrapper>
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
          <Characters number={consultStyle} width="7.6rem" height="7rem" />
        </div>
      </CardWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CardWrapper = styled.div`
  display: flex;
  width: 33.5rem;
  justify-content: space-between;
  padding: 1.6rem 2rem;
  border-bottom: 1px solid ${Grey6};
  .col1 {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  .row1 {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
  .row2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
