import { Button } from 'components/Common/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { Grey4, Grey6 } from 'styles/color';
import { isReviewComplaintOpenState } from 'utils/atom';
interface ReviewComplaintMenuProps {
  id: number;
}
export const ReviewComplaintMenu = ({ id }: ReviewComplaintMenuProps) => {
  const [isReviewComplaintOpen, setIsReviewComplaintOpen] = useRecoilState(
    isReviewComplaintOpenState,
  );
  const handleComplaint = () => {
    // 여기서 서버로 id 신고 ㄱㄱㄱ
    // 후에 신고 되었씁니다~ 화면 위해서 신고접수여부 True로
    setIsReviewComplaintOpen(false);
  };
  return (
    <Wrapper visible={isReviewComplaintOpen}>
      {' '}
      <div className="bar-wrapper">
        <Bar />
      </div>
      <div className="row">
        <ComplaintButton
          text="신고하기"
          width="calc(100% - 4rem)"
          height="5.2rem"
          onClick={() => {
            setIsReviewComplaintOpen(true);
          }}
        />
      </div>
    </Wrapper>
  );
};
const slideIn = keyframes`
  from{
    transform : translateY(100%);
  }
  to{
    transform : translateY(0%);
  }
`;
const slideOut = keyframes`
  from{
    transform : translateY(0%);
  }
  to{
    transform : translateY(100%);
  }
`;
const Wrapper = styled.div<{ visible: boolean }>`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  position: fixed;
  height: 10.3rem;
  background-color: ${Grey6};
  bottom: 0;
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 2002;
  animation: ${({ visible }) => (visible ? slideIn : slideOut)} 0.3s ease-in-out;

  .bar-wrapper {
    height: 2.3rem;
    display: flex;
    justify-content: center;
    margin-bottom: 0.4rem;
  }
  .row {
    display: flex;
    height: 4.4rem;
    justify-content: center;
  }
`;
const Bar = styled.div`
  margin-top: 1.2rem;
  width: 3.1rem;
  height: 0.3rem;
  background-color: ${Grey4};
`;

const ComplaintButton = styled(Button)``;
