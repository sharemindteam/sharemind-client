import styled, { CSSProperties } from 'styled-components';
import { Green, Grey1, Grey2, Grey6, Red, White } from 'styles/color';
import { Body1, Body3, Caption2 } from 'styles/font';
import { Characters } from 'utils/Characters';
import { CartegoryState } from 'utils/type';
import { Flex } from './Flex';
import { ReactComponent as HeartIcon } from 'assets/open-consult/open-consult-heart.svg';
import { Space } from './Space';
import { TagA2Cartegory } from './TagA2Cartegory';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as NoneBookMark } from 'assets/icons/icon-save1.svg';
import { ReactComponent as BookMark } from 'assets/icons/icon-save2.svg';
import { useState } from 'react';
import { patchWishLists } from 'api/patch';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteWishLists } from 'api/delete';

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
  isRealtime?: boolean;
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

const PATCH_WISHLISTS_MUTATION_KEY = 'patchWishLists';

const DELETE_WISHLISTS_MUTATION_KEY = 'deleteWishLists';

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
  isRealtime,
}: CounselorCardProps) => {
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState<boolean>(isWishList);

  const today = new Date();
  const hours = today.getHours();

  //
  //
  //
  const { mutate: addWishListsMutate } = useMutation({
    mutationKey: [PATCH_WISHLISTS_MUTATION_KEY],
    mutationFn: (counselorId: number) => patchWishLists(counselorId),
    onSuccess: () => {
      setIsSaved(true);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        alert('이미 찜하기 처리된 상담사입니다.');
      } else if (error.response?.status === 404) {
        alert('존재하지 않는 상담사입니다.');
      } else {
        alert('찜하기 요청 도중 오류가 발생했습니다.');
      }
    },
  });

  //
  //
  //
  const { mutate: deleteWishListsMutate } = useMutation({
    mutationKey: [DELETE_WISHLISTS_MUTATION_KEY],
    mutationFn: (counselorId: number) => deleteWishLists(counselorId),
    onSuccess: () => {
      setIsSaved(false);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        alert('이미 찜하기 취소된 상담사입니다.');
      } else if (error.response?.status === 404) {
        alert('존재하지 않는 상담사입니다.');
      } else {
        alert('찜하기 취소 요청 도중 오류가 발생했습니다.');
      }
    },
  });

  /**
   *
   */
  const handleUnBookmark = () => {
    deleteWishListsMutate(counselorId);
  };

  /**
   *
   */
  const handleBookmark = () => {
    addWishListsMutate(counselorId);
  };

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
      <Flex direction="column" align="flex-start">
        {isRealtime ? (
          <Flex justify="flex-start" width="100%">
            <TimeWrapper>
              <Caption2
                color={White}
              >{`${hours}시 기준 실시간 상담 가능`}</Caption2>
            </TimeWrapper>
          </Flex>
        ) : null}
        <InfoWrapper isRealtime={isRealtime}>
          <Flex direction="column" gap="1rem" align="flex-start">
            <Flex gap="1rem" width="100%" justify="flex-start">
              <ImgWrapper>
                <Characters number={consultStyle} />
              </ImgWrapper>
              <Flex direction="column" align="flex-start" gap="0.2rem">
                <Flex gap="1.2rem" width="100%" justify="flex-start">
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
            <Flex gap="0.8rem" width="100%" justify="flex-start">
              {tagList.map((value: any) => {
                return (
                  <TagA2Cartegory key={value} tagType={value} bgColorType={3} />
                );
              })}
            </Flex>
          </Flex>
        </InfoWrapper>
      </Flex>
    );
  };

  /**
   *
   */
  const renderButtonSection = () => {
    return (
      <Flex gap="0.8rem">
        {isSaved ? (
          <BookMarkIcon onClick={handleUnBookmark} />
        ) : (
          <NoneBookMarkIcon onClick={handleBookmark} />
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

const InfoWrapper = styled.div<{ isRealtime?: boolean }>`
  width: 100%;
  background-color: ${White};
  box-sizing: border-box;
  padding: 1.2rem;
  border-radius: ${({ isRealtime }) =>
    isRealtime ? '0 1rem 1rem 1rem' : '1rem'};
`;

const TimeWrapper = styled.div`
  box-sizing: border-box;
  padding: 0.4rem 1.2rem;
  width: fit-content;
  border-radius: 1rem 1rem 0 0;
  background-color: ${Red};
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
