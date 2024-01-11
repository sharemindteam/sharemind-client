import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { SearchResults } from 'components/Buyer/Common/SearchResults';
import { Space } from 'components/Common/Space';
import { useNavigate } from 'react-router-dom';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';
// TODO: 찜한 마인더 없을 시 페이지 추후 백 연동 시 구현
export const BuyerSavedCounselor = () => {
  const navigate = useNavigate();
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
      <SearchResults />
    </>
  );
};
