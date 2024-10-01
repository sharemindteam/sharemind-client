import styled from 'styled-components';
import { ReactComponent as Bar } from 'assets/icons/icon-modal-bar.svg';
import { White } from 'styles/color';
import { Button } from 'components/Common/Button';
import { APP_WIDTH } from 'styles/AppStyle';

//
//
//

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
          onClick={() => {
            window.open(process.env.REACT_APP_TEMP_CUSTOMER_SERVICE_URL);
          }}
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
  width: 100%;

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }

  .bar-wrapper {
    height: 1.9rem;
    display: flex;
    justify-content: center;
  }
  z-index: 10000;
  .content-wrapper {
    padding: 0.4rem 2rem 0.8rem 2rem;
    box-sizing: border-box;
  }
`;

const BarIcon = styled(Bar)`
  margin-top: 0.8rem;
`;
