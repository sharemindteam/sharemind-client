import { Button } from 'components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { APP_WIDTH } from 'styles/AppStyle';
import { Grey4, Grey6 } from 'styles/color';
import { isModifyReviewState } from 'utils/atom';

//
//
//

export const ReviewModal = () => {
  const navigate = useNavigate();
  //modal 여부
  const isModalOpen = useRecoilValue(isModifyReviewState);

  //
  //
  //

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
            navigate('/review/0');
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
  width: 100%;
  @media (min-width: 768px) {
    width: ${APP_WIDTH};
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
