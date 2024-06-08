import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as FireIcon } from 'assets/buyer-open-consult/open-consult-fire.svg';
import { ReactComponent as ArrowIcon } from 'assets/buyer-open-consult/open-consult-arrow.svg';
import { Body1 } from 'styles/font';
import { getPostsCustomersPublicLikes } from 'api/get';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'components/Common/Flex';
import BuyerOpenConsultCard from './BuyerOpenConsultCard';

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

  const [hotConsultList, setHotConsultList] = useState<
    getPostsCustomersPublicLikesResponse[]
  >([]);

  //
  //
  //
  useEffect(() => {
    const fetchHotConsultList = async () => {
      try {
        const params = {
          postId: 0,
          finishedAt: new Date().toISOString().slice(0, 19),
        };

        const res: any = await getPostsCustomersPublicLikes({ params });
        if (res.status === 200) {
          setHotConsultList(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchHotConsultList();
  }, []);

  //
  //
  //

  return (
    <Wrapper>
      {/* TODO: add navigate url */}
      <Flex
        justify="space-between"
        onClick={() => {
          navigate('/');
        }}
      >
        <Flex gap="0.6rem">
          <FireIcon />
          <Body1>인기글</Body1>
        </Flex>
        <ArrowIcon />
      </Flex>
      <Flex direction="column">
        {hotConsultList?.map((item) => (
          <BuyerOpenConsultCard
            key={item.postId}
            title={item.title}
            content={item.content}
            totalLike={item.totalLike}
            totalScrap={item.totalScrap}
            totalComment={item.totalComment}
            updatedAt={item.updatedAt}
            onClick={() => {
              navigate(`/open-consult/${item.postId}`);
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

const Wrapper = styled.div`
  padding: 1.2rem 2rem 2.3rem 2rem;
`;

export default HotOpenConsultList;
