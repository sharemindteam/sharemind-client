import styled, { CSSProperties } from 'styled-components';
import { Green, Grey1, Grey2, Grey6, White } from 'styles/color';
import { Body1, Body3, Caption2 } from 'styles/font';
import { Characters } from 'utils/Characters';
import { CartegoryState } from 'utils/type';
import { Flex } from './Flex';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
import { Space } from './Space';
import { TagA2Cartegory } from './TagA2Cartegory';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as NoneBookMark } from 'assets/icons/icon-save1.svg';
import { ReactComponent as BookMark } from 'assets/icons/icon-save2.svg';
import { useState } from 'react';

//
//
//

interface CounselorCardProps {
  counselorId: number;
  tagList: CartegoryState[];
  introduction: string;
  nickname: string;
  level: number;
  isWishList: boolean;
  rating: number;
  totalReview: number;
  totalConsult: number;
  consultStyle?: number;
}

//
//
//

const twoLineEllipsis: CSSProperties = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 2,
  lineClamp: 2,
};

//
//
//

const CounselorCard = ({
  counselorId,
  tagList,
  introduction,
  nickname,
  level,
  isWishList,
  rating,
  totalReview,
  consultStyle,
  totalConsult,
}: CounselorCardProps) => {
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState<boolean>(isWishList);

  /**
   *
   */
  const renderIntroSection = () => {
    return (
      <Body1
        color={Grey1}
        style={{ textAlign: 'left', paddingLeft: '0.8rem', ...twoLineEllipsis }}
      >
        {introduction}
      </Body1>
    );
  };

  /**
   *
   */
  const renderInfoSection = () => {
    return (
      <InfoWrapper>
        <Flex direction="column" gap="1rem" align="flex-start">
          <Flex gap="1rem">
            <ImgWrapper>
              <Characters number={consultStyle} />
            </ImgWrapper>
            <Flex direction="column" align="flex-start" gap="0.2rem">
              <Flex gap="1.2rem">
                <Body1 color={Grey1}>{nickname}</Body1>
                <Caption2 color={Grey1}>{'LV. ' + level}</Caption2>
              </Flex>
              <Flex gap="0.8rem">
                <Body3 color={Grey2}>상담 {totalConsult}회</Body3>
                <Divider />
                <Body3 color={Grey2}>후기 {totalReview}개</Body3>
                <Divider />
                <Flex gap="0.2rem">
                  <HeartIcon />
                  <Body3 color={Grey2}>{rating}</Body3>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex gap="0.8rem">
            {tagList.map((value: any) => {
              return (
                <TagA2Cartegory key={value} tagType={value} bgColorType={3} />
              );
            })}
          </Flex>
        </Flex>
      </InfoWrapper>
    );
  };

  /**
   *
   */
  const renderButtonSection = () => {
    return (
      <Flex gap="0.8rem">
        {isSaved ? (
          <BookMarkIcon
          //onClick={handleUnBookmark}
          />
        ) : (
          <NoneBookMarkIcon
          //   onClick={handleBookmark}
          />
        )}
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
      </Flex>
    );
  };

  //
  //
  //

  return (
    <Wrapper>
      {renderIntroSection()}
      <Space height="1.2rem" />
      {renderInfoSection()}
      <Space height="1rem" />
      {renderButtonSection()}
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  width: 100%;
  border-radius: 1rem;
  box-sizing: border-box;
  padding: 1.6rem 1.6rem 2rem 1.6rem;
  background-color: ${Grey6};
`;

const InfoWrapper = styled.div`
  width: 100%;
  background-color: ${White};
  box-sizing: border-box;
  padding: 1.2rem;
  border-radius: 1rem;
`;

const ImgWrapper = styled.div`
  border-radius: 100%;
  background-color: white;
  width: 4.5rem;
  height: 4.1rem;
  background-color: ${Grey6};
`;

const Divider = styled.div`
  width: 0.1rem;
  height: 1.5rem;
  background: #bbb;
`;

const BookMarkIcon = styled(BookMark)`
  padding-left: 0.8rem;
  cursor: pointer;
`;
const NoneBookMarkIcon = styled(NoneBookMark)`
  padding-left: 0.8rem;
  cursor: pointer;
`;

export default CounselorCard;
