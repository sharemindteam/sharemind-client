import { patchWishLists } from 'api/patch';
import { postWishLists } from 'api/post';
import { SavedCounselorResults } from 'components/Buyer/BuyerSavedCounselor.tsx/SavedCounselorResults';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { SearchResults } from 'components/Buyer/Common/SearchResults';
import { Space } from 'components/Common/Space';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { isLoadingState } from 'utils/atom';
import { SearchResultData, WishlistDataType } from 'utils/type';
// TODO: 찜한 마인더 없을 시 페이지 추후 백 연동 시 구현
export const BuyerSavedCounselor = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [updatedAt, setUpdatedAt] = useState<string>('');
  const [wishlistData, setWishlistData] = useState<WishlistDataType[]>([]);
  useEffect(() => {
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
      } else if (res.response.status !== 401) {
        console.log(res.response.data.message);
        navigate('/buyer/mypage');
      }
      setIsLoading(false);
    };
    fetchReviewData();
  }, []);
  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
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
        <Space height="1.2rem" />
        <SavedCounselorResults wishlistData={wishlistData} />
      </>
    );
  }
};
