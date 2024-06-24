import styled from 'styled-components';
import { Green, Grey2, Grey3, Grey6, White } from 'styles/color';
import { TagA2Cartegory } from '../../Common/TagA2Cartegory';
import { Body1, Body3, Caption2 } from 'styles/font';
import { Characters } from 'utils/Characters';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
import { ReactComponent as NoneBookMark } from 'assets/icons/icon-save1.svg';
import { ReactComponent as BookMark } from 'assets/icons/icon-save2.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartegoryState, ConsultTimes } from 'utils/type';
import { deleteWishLists } from 'api/delete';
import { patchWishLists } from 'api/patch';
import { Space } from 'components/Common/Space';
import { Button } from 'components/Common/Button';

//
//
//

interface ReadyConsultCardProps {
  counselorId: number;
  tagList: CartegoryState[];
  consultTimes: ConsultTimes;
  introduction: string;
  nickname: string;
  level: number;
  isWishList: boolean;
  rating: number;
  totalReview: number;
  consultType: string[];
  letterPrice: number;
  chattingPrice: number;
  consultStyle: number | undefined;
  totalConsult: number;
}

//
//
//

export const ReadyConsultCard = ({
  counselorId,
  tagList,
  consultTimes,
  introduction,
  nickname,
  level,
  isWishList,
  rating,
  totalReview,
  consultType,
  letterPrice,
  chattingPrice,
  consultStyle,
  totalConsult,
}: ReadyConsultCardProps) => {
  const navigate = useNavigate();
  //찜하기 여부
  const [isSaved, setIsSaved] = useState<boolean>(isWishList);
  //보내는 동안 중복 클릭 방지
  const [isSending, setIsSending] = useState<boolean>(false);
  //찜하기 업데이트
  const handleBookmark = async (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    if (isSending) {
      return;
    }
    try {
      setIsSending(true);
      const res: any = await patchWishLists(counselorId);
      if (res.response?.status === 400) {
        alert('이미 찜하기 처리된 상담사입니다.');
      } else if (res.response?.status === 404) {
        alert('존재하지 않는 상담사입니다.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSending(false);
      setIsSaved(true);
    }
  };
  const handleUnBookmark = async (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    if (isSending) {
      return;
    }
    try {
      setIsSending(true);
      const res: any = await deleteWishLists(counselorId);
      if (res.response?.status === 400) {
        alert('이미 찜하기 취소된 상담사입니다.');
      } else if (res.response?.status === 404) {
        alert('존재하지 않는 상담사입니다.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSending(false);
      setIsSaved(false);
    }
  };

  //
  //
  //

  return (
    <Wrapper>
      <UpperWrapper>
        <Body1 style={{ textAlign: 'left' }}>{introduction}</Body1>
        <Space height="1.5rem" />
        <TagWrapper>
          {tagList.map((value: any, index) => {
            return (
              <TagA2Cartegory key={value} tagType={value} bgColorType={1} />
            );
          })}
        </TagWrapper>
      </UpperWrapper>
      <LowerWrapper
        onClick={() => {
          navigate(`/profile/${counselorId}`);
        }}
      >
        <div className="row1">
          <div className="col1 character-circle">
            <Characters number={consultStyle} />
          </div>
          <div className="col2">
            <div className="col2 row1">
              <Body1>{nickname}</Body1>
              <Caption2 color={Grey3}>{'LV. ' + level}</Caption2>
            </div>
            <div className="col2 row2">
              <Body3 color={Grey2}>상담 {totalConsult}회</Body3>
              <DivideLine />
              <Body3 color={Grey2}>후기 {totalReview}회</Body3>
              <DivideLine />
              <div className="heart">
                <HeartIcon />
                <Body3 color={Grey2}>{rating}</Body3>
              </div>
            </div>
          </div>
        </div>
        <Space height="1.6rem" />
        <Button
          text="프로필 바로가기"
          width="100%"
          height="4.2rem"
          color={Green}
          backgroundColor={White}
          border={`1px solid ${Green}`}
          borderRadius="0.8rem"
          onClick={() => {
            navigate(`/profile/${counselorId}`);
          }}
        />
        {isSaved ? (
          <BookMarkIcon onClick={handleUnBookmark} />
        ) : (
          <NoneBookMarkIcon onClick={handleBookmark} />
        )}
      </LowerWrapper>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  width: 100%;
  border-radius: 0.8rem;
  background-color: ${Grey6};
`;
const UpperWrapper = styled.div`
  border-bottom: 1px solid ${White};
  background: linear-gradient(90deg, #2dc7bd 0%, #ecfaf9 100%);
  padding: 1.4rem 2rem 1.2rem 1.6rem;
  border-radius: 0.8rem 0.8rem 0 0;
`;
const TagWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
`;
const LowerWrapper = styled.div`
  padding: 1.5rem 2rem;
  gap: 0.8rem;
  position: relative;
  .row1 {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
  .character-circle {
    border-radius: 100%;
    background-color: white;
    width: 4.5rem;
    height: 4.1rem;
  }
  .row2 {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  .row2 .heart {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
`;
const BookMarkIcon = styled(BookMark)`
  position: absolute;
  top: 3rem;
  right: 2rem;
  cursor: pointer;
`;
const NoneBookMarkIcon = styled(NoneBookMark)`
  position: absolute;
  top: 3rem;
  right: 2rem;
  cursor: pointer;
`;

const DivideLine = styled.div`
  width: 0.1rem;
  height: 1.5rem;
  background: #bbb;
`;
