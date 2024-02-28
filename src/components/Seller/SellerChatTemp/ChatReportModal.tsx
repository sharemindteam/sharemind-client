import styled from 'styled-components';
import { ReactComponent as Bar } from 'assets/icons/icon-modal-bar.svg';
import { White } from 'styles/color';
import { Button } from 'components/Common/Button';
export const ChatReportModal = () => {
  return (
    <ChatReportModalWrapper>
      <div className="bar-wrapper">
        <BarIcon />
      </div>
      <div className="content-wrapper">
        <Button
          text="신고하기"
          width="100%"
          height="5.2rem"
          onClick={() => {}}
        />
      </div>
    </ChatReportModalWrapper>
  );
};
const ChatReportModalWrapper = styled.div`
  position: fixed;
  background-color: ${White};
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0 -0.2rem 1rem 0 rgba(0, 0, 0, 0.1);
  bottom: 0;
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  @media (max-width: 767px) {
    width: 100vw;
  }
  .bar-wrapper {
    height: 1.9rem;
    display: flex;
    justify-content: center;
  }
  z-index: 100;
  .content-wrapper {
    padding: 0.4rem 2rem 0.8rem 2rem;
    box-sizing: border-box;
  }
`;

const BarIcon = styled(Bar)`
  margin-top: 0.8rem;
`;
