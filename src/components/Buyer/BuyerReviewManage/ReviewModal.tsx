import { Button } from 'components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { Grey4, Grey6 } from 'styles/color';
import { isModifyReviewState } from 'utils/atom';
//최근순 읽지않은순 modal
export const ReviewModal = () => {
  const navigate = useNavigate();
  //modal 여부
  const isModalOpen = useRecoilValue(isModifyReviewState);
  //여기서 unmount 시 sortType 바꾸고 새로 request

  return (
    <Wrapper visible={isModalOpen}>
      <div className="bar-wrapper">
        <Bar />
      </div>
      <div className="button-wrapper">
        <Button
          text="수정하기"
          width="89.33%"
          height="5.2rem"
          onClick={() => {
            //추후 클릭한 consult id에 대한 리뷰로 넘어감
            //props로 받으면될듯
            navigate('/buyer/review/0');
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
  height: 9.8rem;
  background-color: ${Grey6};
  bottom: 0;
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 2002;
  animation: ${({ visible }) => (visible ? slideIn : slideOut)} 0.3s ease-in-out;

  .bar-wrapper {
    height: 1.9rem;
    display: flex;
    justify-content: center;
  }
  .button-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0.4rem 0;
  }
`;
const Bar = styled.div`
  margin-top: 1.2rem;
  width: 3.1rem;
  height: 0.3rem;
  background-color: ${Grey4};
`;
