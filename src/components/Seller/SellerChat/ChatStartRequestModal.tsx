import styled from 'styled-components';
import { ReactComponent as Bar } from 'assets/icons/icon-modal-bar.svg';
import { Body3 } from 'styles/font';
import { Grey3, White } from 'styles/color';
import { Button } from 'components/Common/Button';
import { APP_WIDTH } from 'styles/AppStyle';

//
//
//

interface ChatStartRequestModalProps {
  inputHeight: number;
  chatStatus: string;
  remainTime: string;
  onClick: () => void;
}

//
//
//

export const ChatStartRequestModal = ({
  inputHeight,
  chatStatus,
  remainTime,
  onClick,
}: ChatStartRequestModalProps) => {
  switch (chatStatus) {
    case '상담 대기':
      return (
        <RequestModalWrapper height={inputHeight}>
          <div className="bar-wrapper">
            <BarIcon />
          </div>
          <div className="content-wrapper">
            <Body3 color={Grey3} margin="0 0 1.2rem 0">
              시작 전에도 메시지를 주고 받을 수 있어요. 시작 요청은 10분 간
              유효하며, 셰어가 요청에 응한 후 30분간 상담이 진행되어요. 30분이
              지나면 상담종료 버튼을 눌러 종료하세요.
            </Body3>
            <Button
              text="상담시작 요청하기"
              width="100%"
              height="5.2rem"
              onClick={onClick}
            />
          </div>
        </RequestModalWrapper>
      );
    case '상담 시작 요청':
      return (
        <RequestModalWrapper height={inputHeight}>
          <div className="bar-wrapper">
            <BarIcon />
          </div>
          <div className="content-wrapper">
            <Body3 color={Grey3} margin="0 0 1.2rem 0">
              시작 전에도 메시지를 주고 받을 수 있어요. 시작 요청은 10분 간
              유효하며, 셰어가 요청에 응한 후 30분간 상담이 진행되어요. 30분이
              지나면 상담종료 버튼을 눌러 종료하세요.
            </Body3>
            <Button
              isActive={false}
              text={`셰어가 시작 요청을 확인중이에요 ${remainTime}`}
              width="100%"
              height="5.2rem"
              onClick={onClick}
            />
          </div>
        </RequestModalWrapper>
      );
    case '시간 종료':
      return (
        <RequestModalWrapper height={inputHeight}>
          <div className="bar-wrapper">
            <BarIcon />
          </div>
          <div className="content-wrapper">
            <Body3 color={Grey3} margin="0 0 1.2rem 0">
              상담시간이 마무리되었습니다. 상담종료 버튼을 눌러 상담 종료 요청을
              전할 수 있습니다. 버튼을 누르기 전까지 메시지를 계속 입력할 수
              있습니다.
            </Body3>
            <Button
              isActive={false}
              text="셰어가 종료 요청을 확인중이에요"
              width="100%"
              height="5.2rem"
              onClick={onClick}
            />
          </div>
        </RequestModalWrapper>
      );
  }
};

const RequestModalWrapper = styled.div<{ height: number }>`
  position: fixed;
  background-color: ${White};
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0 -0.2rem 1rem 0 rgba(0, 0, 0, 0.1);
  bottom: ${(props) => `${props.height + 4.1}rem`};

  width: 100%;

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
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
