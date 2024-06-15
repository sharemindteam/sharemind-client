import styled from 'styled-components';

import { getPostsCustomersPublic } from 'api/get';
import { useNavigate } from 'react-router-dom';

import OpenConsultCard from './OpenConsultCard';
import { Body1 } from 'styles/font';
import { Flex } from 'components/Common/Flex';

import { ReactComponent as RecentIcon } from 'assets/open-consult/open-consult-recent.svg';
import { ReactComponent as ArrowIcon } from 'assets/open-consult/open-consult-arrow.svg';
import { Space } from 'components/Common/Space';
import { useQuery } from '@tanstack/react-query';

//
//
//

export interface getPostsCustomersPublicResponse {
  postId: number;
  title: string;
  content: string;
  isLiked: boolean;
  isScrapped: boolean;
  totalLike: number;
  totalScrap: number;
  totalComment: number;
  updatedAt: string;
  finishedAt: string;
}

//
//
//

const OpenConsultList = () => {
  const navigate = useNavigate();

  const params = {
    postId: 0,
    finishedAt: new Date().toISOString().slice(0, 19),
  };

  const { data: recentConsultList } = useQuery<
    getPostsCustomersPublicResponse[]
  >({
    queryKey: ['getPostsCustomersPublic'],
    queryFn: async () =>
      await getPostsCustomersPublic(params).then((res) => res.data),
  });

  //
  //
  //

  return (
    <Wrapper>
      <PointerFlex
        justify="space-between"
        onClick={() => {
          navigate('/open-consult/recents');
        }}
      >
        <Flex gap="0.6rem">
          <RecentIcon />
          <Body1>최신글</Body1>
        </Flex>
        <ArrowIcon />
      </PointerFlex>
      <Space height="1rem" />
      <Flex direction="column" gap="1.2rem">
        {recentConsultList?.map((consult) => (
          <OpenConsultCard
            key={consult.postId}
            title={consult.title}
            content={consult.content}
            totalLike={consult.totalLike}
            totalScrap={consult.totalScrap}
            totalComment={consult.totalComment}
            updatedAt={consult.updatedAt}
            onClick={() => {
              navigate(`/open-consult/${consult.postId}`);
            }}
          />
        ))}
      </Flex>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.section`
  padding: 0 2rem;
`;

const PointerFlex = styled(Flex)`
  cursor: pointer;
`;

export default OpenConsultList;
