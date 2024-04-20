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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartegoryState, ConsultTimes } from 'utils/type';
import { convertTimeToString } from 'utils/convertTimeToString';
import { deleteWishLists } from 'api/delete';

//
//
//

interface SavedCounselorCardProps {
  counselorId: number;
  tagList: CartegoryState[];
  consultTimes: ConsultTimes;
  introduction: string;
  nickname: string;
  level: number;
  wishlistId: number;
  rating: number;
  totalReview: number;
  consultType: string[];
  letterPrice: number;
  chattingPrice: number;
  consultStyle: number;
}

//
//
//

export const SavedCounselorCard = ({
  counselorId,
  tagList,
  consultTimes,
  introduction,
  nickname,
  level,
  wishlistId,
  rating,
  totalReview,
  consultType,
  letterPrice,
  chattingPrice,
  consultStyle,
}: SavedCounselorCardProps) => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const handleBookmark = async (
    e: React.MouseEvent<HTMLElement> | React.MouseEvent<SVGSVGElement>,
  ) => {
    e.stopPropagation();
    if (isSending) {
      return;
    }
    try {
      setIsSending(true);
      const res: any = await deleteWishLists(counselorId);

      if (res.status === 200) {
        // Handle success
      } else if (res.response?.status === 400) {
        alert('이미 찜하기 취소된 상담사입니다.');
      } else if (res.response?.status === 404) {
        alert('존재하지 않는 상담사입니다.');
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    } finally {
      setIsSending(false);
      setIsSaved(false);
    }
  };
  //
  //
  //
  if (isSaved) {
    return (
      <Wrapper>
        <UpperWrapper
          onClick={() => {
            navigate(`/profile/${counselorId}`);
          }}
        >
          <TagWrapper>
            {tagList.map((value: CartegoryState) => {
              return (
                <TagA2Cartegory tagType={value} bgColorType={1} key={value} />
              );
            })}
          </TagWrapper>
          <Body1 margin={'0.8rem 1.6rem 1.2rem 1.6rem'}>{introduction}</Body1>
        </UpperWrapper>
        <LowerWrapper
          onClick={() => {
            navigate(`/profile/${counselorId}`);
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
          {isSaved ? (
            <BookMarkIcon onClick={handleBookmark} />
          ) : (
            <NoneBookMarkIcon
              onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                e.stopPropagation();
                setIsSaved(true);
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
  } else {
    return <></>;
  }
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
