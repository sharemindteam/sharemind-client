import styled from 'styled-components';
import { Grey1, Grey2, Grey6, White } from 'styles/color';
import { TagA2Cartegory } from './TagA2Cartegory';
import { Body1, Body3, Caption2 } from 'styles/font';
import { Characters } from 'utils/Characters';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
import { ReactComponent as NoneBookMark } from 'assets/icons/icon-save1.svg';
import { ReactComponent as BookMark } from 'assets/icons/icon-save2.svg';
import { ReactComponent as DownIcon } from 'assets/icons/icon-down-toggle.svg';
interface ReadyConsultCardProps {
  index: number;
  tagList: CartegoryStateArray;
  title: string;
  name: string;
  level: number;
  bookmarkStates: boolean[];
  setBookmarkStates: React.Dispatch<React.SetStateAction<boolean[]>>;
  rate: number;
  reviewNumber: number;
  iconNumber: number;
}
export const ReadyConsultCard = ({
  index,
  tagList,
  title,
  name,
  level,
  bookmarkStates,
  setBookmarkStates,
  rate,
  reviewNumber,
  iconNumber,
}: ReadyConsultCardProps) => {
  const handleBookmark = () => {
    const newStates = [...bookmarkStates];
    newStates[index] = !newStates[index];
    setBookmarkStates(newStates);
  };
  return (
    <Wrapper>
      <UpperWrapper>
        <TagWrapper>
          {tagList.map((value) => {
            return <TagA2Cartegory tagType={value} bgColorType={1} />;
          })}
        </TagWrapper>
        <Body1 margin={'0.8rem 1.6rem 0 1.6rem'}>{title}</Body1>
      </UpperWrapper>
      <LowerWrapper>
        <Characters
          number={iconNumber}
          width="6.5rem"
          height="5.4rem"
          margin="1.2rem 0 0 1.6rem"
        />
        <div className="col2">
          <div className="row1">
            <Body1>{name}</Body1>
            <Caption2 color={Grey1}>{'Lv. ' + level}</Caption2>
          </div>
          <div className="row2">
            <HeartIcon />
            <Body3 color={Grey2}>{rate + ' (' + reviewNumber + ')'}</Body3>
          </div>
        </div>
        {bookmarkStates[index] ? (
          <BookMarkIcon onClick={handleBookmark} />
        ) : (
          <NoneBookMarkIcon onClick={handleBookmark} />
        )}
      </LowerWrapper>
      <ToggleBar>
        <DownIcon />
      </ToggleBar>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 89%;
  background-color: ${Grey6};
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  margin-bottom: 0.9rem;
`;
const UpperWrapper = styled.div`
  height: 10rem;
  border-bottom: 1px solid ${White};
`;
const TagWrapper = styled.div`
  display: flex;
  margin-top: 1.6rem;
  gap: 0.8rem;
  margin-left: 1.6rem;
`;
const LowerWrapper = styled.div`
  height: 7.5rem;
  display: flex;
  gap: 0.8rem;
  position: relative;
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
`;
const BookMarkIcon = styled(BookMark)`
  position: absolute;
  right: 1.6rem;
  top: 1.2rem;
`;
const NoneBookMarkIcon = styled(NoneBookMark)`
  position: absolute;
  right: 1.6rem;
  top: 1.2rem;
`;
const ToggleBar = styled.div`
  height: 2.1rem;
  background-color: #f1f1f8;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
