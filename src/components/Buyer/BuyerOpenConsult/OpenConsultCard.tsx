import styled, { css } from 'styled-components';
import { Grey1, Grey2, White } from 'styles/color';
import { Body3, Body4, Caption2 } from 'styles/font';

import { ReactComponent as HeartIcon } from 'assets/open-consult/open-consult-heart.svg';
import { ReactComponent as SaveIcon } from 'assets/open-consult/open-consult-scrap.svg';
import { ReactComponent as CommentIcon } from 'assets/open-consult/open-consult-comment.svg';

import { Flex } from 'components/Common/Flex';
import { getPostsCustomersPublicLikesResponse } from './HotOpenConsultList';

//
//
//

export interface OpenConsultCardProps
  extends Omit<
    getPostsCustomersPublicLikesResponse,
    'content' | 'postId' | 'isLiked' | 'isScrapped' | 'finishedAt'
  > {
  content?: string;
  onClick?: () => void;
}

//
//
//

const ContentTwoLinesCSS = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
`;

//
//
//

const OpenConsultCard = ({
  title,
  content,
  totalLike,
  totalScrap,
  totalComment,
  updatedAt,
  onClick,
}: OpenConsultCardProps) => {
  /**
   *
   */
  const renderConsultInfo = () => (
    <Flex width="100%" justify="space-between">
      <Flex gap="1.2rem">
        <Flex gap="0.4rem">
          <HeartIcon />
          <Caption2 color={Grey2}>{totalLike}</Caption2>
        </Flex>
        <Flex gap="0.4rem">
          <SaveIcon />
          <Caption2 color={Grey2}>{totalScrap}</Caption2>
        </Flex>
        <Flex gap="0.4rem">
          <CommentIcon />
          <Caption2 color={Grey2}>{totalComment}</Caption2>
        </Flex>
      </Flex>
      <Caption2 color={Grey2}>{updatedAt}</Caption2>
    </Flex>
  );

  //
  //
  //

  return (
    <Wrapper onClick={onClick}>
      <Flex direction="column" align="flex-start" gap="0.8rem">
        <Flex justify="space-between" width="100%">
          <Body4 color={Grey1}>{title}</Body4>
        </Flex>
        {content ? (
          <Body3 color={Grey1} customStyles={ContentTwoLinesCSS}>
            {content}
          </Body3>
        ) : null}
        {renderConsultInfo()}
      </Flex>
    </Wrapper>
  );
};

export default OpenConsultCard;

//
//
//

const Wrapper = styled.div`
  padding: 1.2rem 1.6rem;
  box-sizing: border-box;
  width: 100%;
  background-color: ${White};
  border-radius: 1.2rem;
  cursor: pointer;
`;
