import styled from 'styled-components';
import { ReactComponent as NotWrite } from 'assets/icons/graphic-not-write.svg';
import { BottomButtonWrapper } from '../Common/BottomButton';
import { Button } from 'components/Common/Button';
import { useNavigate } from 'react-router-dom';

//
//
//

function NoProfileSection() {
  const navigate = useNavigate();

  //
  //
  //

  return (
    <>
      <NotWriteSection>
        <NotWriteGraphic />
        <NotWriteMessage>판매 정보를 작성해주세요</NotWriteMessage>
        <AlertMessage>
          판매정보를 작성하고
          <br />
          마인더로서 상담활동을 시작해볼까요?
        </AlertMessage>
      </NotWriteSection>
      <BottomButtonWrapper>
        <Button
          text="판매정보 작성하기"
          width="calc(100% - 4rem)"
          height="5.2rem"
          onClick={() => {
            navigate('/minder/mypage/modifyProfile');
          }}
        />
      </BottomButtonWrapper>
    </>
  );
}
const NotWriteSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: calc(100vh - 5.3rem);
  gap: 4rem;
`;
const AlertMessage = styled.div`
  font-family: Pretendard;
  text-align: center;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const NotWriteGraphic = styled(NotWrite)`
  margin-top: 16.4rem;
`;
const NotWriteMessage = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3rem;
  margin-bottom: -3rem;
`;
export default NoProfileSection;
