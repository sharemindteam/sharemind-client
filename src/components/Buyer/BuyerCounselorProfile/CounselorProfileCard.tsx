import styled from 'styled-components';
import { Green, Grey2, Grey6, White } from 'styles/color';
import { Body3, Caption2, Heading } from 'styles/font';
import { Characters } from 'utils/Characters';
import { counselorDummyData as dummy } from 'utils/counselorDummy';
import { ReactComponent as Heart } from 'assets/icons/icon-heart2.svg';
import { TagA2Cartegory } from '../../Common/TagA2Cartegory';
interface CounselorProfileCardProps {
  counselorId: string | undefined;
}
export const CounselorProfileCard = ({
  counselorId,
}: CounselorProfileCardProps) => {
  if (counselorId === undefined) {
    return <>404 error</>;
  } else {
    const id = parseInt(counselorId, 10);
    const tagListCast: CartegoryStateArray = dummy[id]
      .tagList as CartegoryStateArray;
    return (
      <Wrapper>
        <div className="col1">
          <div className="row1">
            <Heading>{dummy[id].nickname}</Heading>
            <LevelTag>
              <Caption2 color={White}>Lv {dummy[id].level}</Caption2>
            </LevelTag>
          </div>
          <div className="row2">
            <HeartIcon />
            <Body3 color={Grey2} padding="0.04rem 0 0 0">
              {dummy[id].rating + ' (' + dummy[id].reviewNumber + ')'}
            </Body3>
          </div>
          <div className="row3">
            {tagListCast.map((value) => {
              return <TagA2Cartegory tagType={value} bgColorType={3} />;
            })}
          </div>
        </div>
        <div className="col2">
          <Characters
            number={dummy[id].iconNumber}
            width="7.6rem"
            height="7rem"
          />
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  gap: 6.8rem;
  padding: 1.6rem 2rem;
  padding-bottom: 1.6rem;
  border: 1px solid ${Grey6};
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
