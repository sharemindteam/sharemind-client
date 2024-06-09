import styled from 'styled-components';
import { ReactComponent as FireIcon } from 'assets/open-consult/open-consult-fire.svg';
import { ReactComponent as ArrowIcon } from 'assets/open-consult/open-consult-arrow.svg';
import { Body1, Caption2 } from 'styles/font';
import { getPostsCustomersPublicLikes } from 'api/get';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'components/Common/Flex';
import OpenConsultCard from './OpenConsultCard';
import { Grey2 } from 'styles/color';
import { Space } from 'components/Common/Space';
import { useQuery } from '@tanstack/react-query';

//
//
//

export interface getPostsCustomersPublicLikesResponse {
  postId: number;
  title: string;
  content: string;
  isLiked: boolean;
  isScrapped: boolean;
  totalLike: number;
  totalScrap: number;
  totalComment: number;
  updatedAt: string;
}

//
//
//

const HotOpenConsultList = () => {
  const navigate = useNavigate();

  const params = {
    postId: 0,
    finishedAt: new Date().toISOString().slice(0, 19),
  };

  const { data: hotConsultList } = useQuery<
    getPostsCustomersPublicLikesResponse[]
  >({
    queryKey: ['getPostsCustomersPublicLikes'],
    queryFn: async () =>
      await getPostsCustomersPublicLikes(params).then((res) => res.data),
  });

  //
  //
  //

  return (
    <Wrapper>
      <PointerFlex
        justify="space-between"
        onClick={() => {
          navigate('/open-consult/likes');
        }}
      >
        <Flex gap="0.6rem">
          <FireIcon />
          <Body1>인기글</Body1>
        </Flex>
        <ArrowIcon />
      </PointerFlex>
      <Caption2 color={Grey2} margin="0 0 0 3rem">
        공감을 10개 이상 받았어요
      </Caption2>
      <Space height="1rem" />
      <Flex direction="column" gap="1.2rem">
        {hotConsultList?.map((consult) => (
          <OpenConsultCard
            key={consult.postId}
            title={consult.title}
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
  padding: 1.2rem 2rem 2.3rem 2rem;
`;

const PointerFlex = styled(Flex)`
  cursor: pointer;
`;

export default HotOpenConsultList;
