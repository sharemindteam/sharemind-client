import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1, Grey6 } from 'styles/color';
import { Body2, Heading } from 'styles/font';

function SellerAccountSetting() {
  const navigate = useNavigate();
  return (
    <>
      {' '}
      <Wrapper>
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate('/minder/mypage');
            }}
          />
          <Heading color={Grey1}>계정 설정</Heading>
        </HeaderWrapper>

        <div
          className="row"
          onClick={() => {
            navigate('/minder/setting/changePassword');
          }}
        >
          <Body2 color={Grey1}>비밀번호 변경</Body2>
        </div>
        <div
          className="row"
          onClick={() => {
            navigate('/minder/profitBankAccount');
          }}
        >
          <Body2 color={Grey1}>수익계좌 관리</Body2>
        </div>
        <div
          className="row"
          onClick={() => {
            navigate('/minder/setting/terminate');
          }}
        >
          <Body2 color={Grey1}>회원 탈퇴</Body2>
        </div>
        <div
          className="row"
          onClick={() => {
            navigate('/minder/setting/logout');
          }}
        >
          <Body2 color={Grey1} onClick={() => {}}>
            로그아웃
          </Body2>
        </div>
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  .row {
    display: flex;
    align-items: center;
    height: 4.8rem;
    padding: 0 2rem;
    border-bottom: 1px solid ${Grey6};
    cursor: pointer;
  }
`;
export default SellerAccountSetting;
