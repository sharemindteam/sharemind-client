import styled from 'styled-components';
import { Grey1, Grey2, Grey3, Grey5, Grey6, White } from 'styles/color';
import { TagA2Cartegory } from '../../Common/TagA2Cartegory';
import { Body1, Body3, Caption2 } from 'styles/font';
import { Characters } from 'utils/Characters';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
import { ReactComponent as NoneBookMark } from 'assets/icons/icon-save1.svg';
import { ReactComponent as BookMark } from 'assets/icons/icon-save2.svg';
import { ReactComponent as DownIcon } from 'assets/icons/icon-down-toggle.svg';
import { ReactComponent as UpIcon } from 'assets/icons/icon-up-toggle.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartegoryState, ConsultTimes } from 'utils/type';
import { convertTimeToString } from 'utils/convertTimeToString';
interface ReadyConsultCardProps {
  index: number;
  counselorId: number;
  tagList: CartegoryState[];
  consultTimes: ConsultTimes;
  introduction: string;
  nickname: string;
  level: number;
  bookmarkStates: boolean[];
  setBookmarkStates: React.Dispatch<React.SetStateAction<boolean[]>>;
  rating: number;
  totalReview: number;
  consultType: string[];
  letterPrice: number;
  chattingPrice: number;
  consultStyle: number;
}
//일단 toggle파트 제외하고 클릭 시 상담프로필로 navigate하게 구현
export const ReadyConsultCard = ({
  index,
  counselorId,
  tagList,
  consultTimes,
  introduction,
  nickname,
  level,
  bookmarkStates,
  setBookmarkStates,
  rating,
  totalReview,
  consultType,
  letterPrice,
  chattingPrice,
  consultStyle,
}: ReadyConsultCardProps) => {
  const navigate = useNavigate();
  //toggle
  const [toggle, setToggle] = useState<boolean>(false);
  //찜하기 업데이트
  const handleBookmark = () => {
    const newStates = [...bookmarkStates];
    newStates[index] = !newStates[index];
    setBookmarkStates(newStates);
  };

  return (
    <Wrapper>
      <UpperWrapper
        onClick={() => {
          //마인더 프로필 개발되면 수정
          navigate(`/buyer/profile/${counselorId}`);
        }}
      >
        <TagWrapper>
          {tagList.map((value: any) => {
            return <TagA2Cartegory tagType={value} bgColorType={1} />;
          })}
        </TagWrapper>
        <Body1 margin={'0.8rem 1.6rem 1.2rem 1.6rem'}>{introduction}</Body1>
      </UpperWrapper>
      <LowerWrapper
        onClick={() => {
          navigate(`/buyer/profile/${counselorId}`);
        }}
      >
        <Characters
          number={consultStyle}
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
            <Body3 color={Grey2}>{rating + ' (' + totalReview + ')'}</Body3>
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
            <Body3 color={Grey1}>{consultType.join(', ')}</Body3>
          </div>
          <div className="row2">
            <Body3 color={Grey3}>상담가능 시간</Body3>
            <div>
              {consultTimes.MON !== undefined &&
              consultTimes.MON.length !== 0 ? (
                <Body3 color={Grey1}>
                  월 {convertTimeToString(consultTimes.MON)}
                </Body3>
              ) : null}
              {consultTimes.TUE !== undefined &&
              consultTimes.TUE.length !== 0 ? (
                <Body3 color={Grey1}>
                  화 {convertTimeToString(consultTimes.TUE)}
                </Body3>
              ) : null}
              {consultTimes.WED !== undefined &&
              consultTimes.WED.length !== 0 ? (
                <Body3 color={Grey1}>
                  수 {convertTimeToString(consultTimes.WED)}
                </Body3>
              ) : null}
              {consultTimes.THU !== undefined &&
              consultTimes.THU.length !== 0 ? (
                <Body3 color={Grey1}>
                  목 {convertTimeToString(consultTimes.THU)}
                </Body3>
              ) : null}
              {consultTimes.FRI !== undefined &&
              consultTimes.FRI.length !== 0 ? (
                <Body3 color={Grey1}>
                  금 {convertTimeToString(consultTimes.FRI)}
                </Body3>
              ) : null}
              {consultTimes.SAT !== undefined &&
              consultTimes.SAT.length !== 0 ? (
                <Body3 color={Grey1}>
                  토 {convertTimeToString(consultTimes.SAT)}
                </Body3>
              ) : null}
              {consultTimes.SUN !== undefined &&
              consultTimes.SUN.length !== 0 ? (
                <Body3 color={Grey1}>
                  일 {convertTimeToString(consultTimes.SUN)}
                </Body3>
              ) : null}
            </div>
          </div>
          <div className="row3">
            <Body3 color={Grey3}>상담료</Body3>
            <div>
              {letterPrice !== undefined ? (
                <Body3 color={Grey1}>
                  편지 1건 {letterPrice.toLocaleString()}원
                </Body3>
              ) : null}
              {chattingPrice !== undefined ? (
                <Body3 color={Grey1}>
                  채팅 30분당 {chattingPrice.toLocaleString()}원
                </Body3>
              ) : null}
            </div>
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
  border-radius: 0.8rem;
  margin-bottom: 0.9rem;
  background-color: ${Grey6};
`;
const UpperWrapper = styled.div`
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
  padding: 1rem 2rem;
  .row1 {
    display: flex;
    gap: 6.1rem;
  }
  .row2 {
    margin-top: 0.8rem;
    display: flex;
    gap: 3.6rem;
  }
  .row3 {
    margin-top: 0.8rem;
    display: flex;
    gap: 7.6rem;
  }
`;
const ToggleBar = styled.div`
  height: 2.9rem;
  background-color: ${Grey5};
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
