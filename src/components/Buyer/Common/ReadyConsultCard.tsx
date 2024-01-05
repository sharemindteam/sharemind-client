import styled from 'styled-components';
import { Grey1, Grey2, Grey3, Grey6, White } from 'styles/color';
import { TagA2Cartegory } from '../../Common/TagA2Cartegory';
import { Body1, Body3, Caption2 } from 'styles/font';
import { Characters } from 'utils/Characters';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
import { ReactComponent as NoneBookMark } from 'assets/icons/icon-save1.svg';
import { ReactComponent as BookMark } from 'assets/icons/icon-save2.svg';
import { ReactComponent as DownIcon } from 'assets/icons/icon-down-toggle.svg';
import { ReactComponent as UpIcon } from 'assets/icons/icon-up-toggle.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { consultTypeList } from 'utils/constant';
interface ReadyConsultCardProps {
  index: number;
  counselorId: number;
  tagList: CartegoryStateArray;
  introduction: string;
  nickname: string;
  level: number;
  bookmarkStates: boolean[];
  setBookmarkStates: React.Dispatch<React.SetStateAction<boolean[]>>;
  rating: number;
  reviewNumber: number;
  iconNumber: number;
  consultType: number;
  letterPrice: number;
  chattingPrice: number;
}
//일단 toggle파트 제외하고 클릭 시 상담프로필로 navigate하게 구현
export const ReadyConsultCard = ({
  index,
  counselorId,
  tagList,
  introduction,
  nickname,
  level,
  bookmarkStates,
  setBookmarkStates,
  rating,
  reviewNumber,
  iconNumber,
  consultType,
  letterPrice,
  chattingPrice,
}: ReadyConsultCardProps) => {
  const navigate = useNavigate();
  //toggle
  const [toggle, setToggle] = useState<boolean>(false);
  const handleBookmark = () => {
    const newStates = [...bookmarkStates];
    newStates[index] = !newStates[index];
    setBookmarkStates(newStates);
  };

  let availableConsult: string = consultTypeList[consultType];
  return (
    <Wrapper>
      <UpperWrapper
        onClick={() => {
          navigate('/buyer/profile/' + counselorId);
        }}
      >
        <TagWrapper>
          {tagList.map((value) => {
            return <TagA2Cartegory tagType={value} bgColorType={1} />;
          })}
        </TagWrapper>
        <Body1 margin={'0.8rem 1.6rem 0 1.6rem'}>{introduction}</Body1>
      </UpperWrapper>
      <LowerWrapper
        onClick={() => {
          navigate('/buyer/profile/' + counselorId);
        }}
      >
        <Characters
          number={iconNumber}
          width="6.5rem"
          height="5.4rem"
          margin="1.2rem 0 0 1.6rem"
        />
        <div className="col2">
          <div className="row1">
            <Body1>{nickname}</Body1>
            <Caption2 color={Grey1}>{'Lv. ' + level}</Caption2>
          </div>
          <div className="row2">
            <HeartIcon />
            <Body3 color={Grey2}>{rating + ' (' + reviewNumber + ')'}</Body3>
          </div>
        </div>
        {bookmarkStates[index] ? (
          <BookMarkIcon
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.stopPropagation();
              handleBookmark();
            }}
          />
        ) : (
          <NoneBookMarkIcon
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.stopPropagation();
              handleBookmark();
            }}
          />
        )}
      </LowerWrapper>
      {toggle ? (
        <ToggleWrapper>
          <div className="row1">
            <Body3 color={Grey3}>상담 방식</Body3>
            <Body3 color={Grey1}>{availableConsult}</Body3>
          </div>
          <div className="row2">
            <Body3 color={Grey3}>상담가능 시간</Body3>
            <Body3 color={Grey1}>
              월-금 21:00-24:00
              <br />
              토-일 09:00-22:00
            </Body3>
          </div>
          <div className="row3">
            <Body3 color={Grey3}>상담료</Body3>
            <Body3 color={Grey1}>
              편지 1건 {letterPrice}원<br />
              실시간 30분당 {chattingPrice}
            </Body3>
          </div>
        </ToggleWrapper>
      ) : null}
      <ToggleBar
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {toggle ? <UpIcon /> : <DownIcon />}
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
  cursor: pointer;
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
  cursor: pointer;
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
  cursor: pointer;
`;
const NoneBookMarkIcon = styled(NoneBookMark)`
  position: absolute;
  right: 1.6rem;
  top: 1.2rem;
  cursor: pointer;
`;
const ToggleWrapper = styled.div`
  height: 11rem;
  padding: 1rem 2rem;
  .row1 {
    display: flex;
    gap: 6.1rem;
  }
  .row2 {
    display: flex;
    gap: 3.6rem;
  }
  .row3 {
    display: flex;
    gap: 7.6rem;
  }
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
