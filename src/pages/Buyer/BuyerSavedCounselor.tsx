import { postWishLists } from 'api/post';
import { SavedCounselorResults } from 'components/Buyer/BuyerSavedCounselor.tsx/SavedCounselorResults';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { Space } from 'components/Common/Space';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { isLoadingState } from 'utils/atom';
import { WishlistDataType } from 'utils/type';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import styled from 'styled-components';
// TODO: 찜한 마인더 없을 시 페이지 추후 백 연동 시 구현
export const BuyerSavedCounselor = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [updatedAt, setUpdatedAt] = useState<string>('');
  const [wishlistData, setWishlistData] = useState<WishlistDataType[]>([]);
  useLayoutEffect(() => {
    const fetchReviewData = async () => {
      setIsLoading(true);
      // 찜하기 목록을 받아오는 api마지막 찜하기의 wishlistId와 updatedAt 바디로 넘겨주시면 됩니다~4개씩 리턴합니다.처음 요청의 경우 wishlistId 0으로 쏴주세요해당 wishlsit가 없을 경우 빈배열로 리턴합니다.
      const body = {
        wishlistId: 0,
        updatedAt: updatedAt,
      };
      const res: any = await postWishLists(body);
      if (res.status === 200) {
        setWishlistData(res.data);
        console.log(res.data[res.data.length]);
      } else if (res.response.status !== 401) {
        navigate('/buyer/mypage');
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1);
    };
    fetchReviewData();
  }, []);
  if (isLoading) {
    return (
      <>
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate('/buyer/mypage');
            }}
          />
          <Heading color={Grey1}>찜 목록</Heading>
        </HeaderWrapper>
        <Space height="30vh" />
        <LoadingSpinner />
      </>
    );
  } else {
    if (wishlistData.length !== 0) {
      return (
        <>
          <HeaderWrapper>
            <BackIcon
              onClick={() => {
                navigate('/buyer/mypage');
              }}
            />
            <Heading color={Grey1}>찜 목록</Heading>
          </HeaderWrapper>
          <Space height="1.2rem" />
          <SavedCounselorResults wishlistData={wishlistData} />
        </>
      );
    } else {
      return (
        <>
          <HeaderWrapper>
            <BackIcon
              onClick={() => {
                navigate('/buyer/mypage');
              }}
            />
            <Heading color={Grey1}>찜 목록</Heading>
          </HeaderWrapper>
          <EmptyWrapper>
            <EmptyIcon />
            <Heading>아직 후기가 없어요.</Heading>
          </EmptyWrapper>
        </>
      );
    }
  }
};
const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const EmptyIcon = styled(Empty)`
  margin-top: 20vh;
  padding: 4.7rem 4.413rem 4.603rem 4.5rem;
`;
