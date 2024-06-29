/* eslint-disable array-callback-return */
import styled from 'styled-components';
import {
  Black,
  Green,
  Grey1,
  Grey3,
  Grey4,
  LightGreenChat,
  White,
} from 'styles/color';
import {
  Body2,
  Body3,
  Button1,
  Button2,
  Caption1,
  Caption2,
} from 'styles/font';
import { formattedMessage } from 'utils/formattedMessage';
import { Button } from 'components/Common/Button';
import {
  convertAMPMToString,
  convertAMPMToStringYear,
  convertMessageTime,
} from 'utils/convertDate';
import { ChatCounselorInfoBox } from 'components/Buyer/BuyerChat/ChatCounselorInfoBox';
import { useNavigate } from 'react-router-dom';
import { ChatCounselorInfo, ChatMessage } from 'utils/type';

//
//
//

interface BuyerChatSectionProps {
  messages: ChatMessage[];
  time: string;
  isLastElem: boolean;
  isQuitButtonActive: boolean;
  counselorInfo: ChatCounselorInfo | null;
  lastRef: React.RefObject<HTMLDivElement>;
  topRef: React.RefObject<HTMLDivElement>;
  topMsgIndexRef: React.MutableRefObject<number>;
  sectionPaddingRef: React.MutableRefObject<number>;
  setTarget: React.Dispatch<
    React.SetStateAction<HTMLElement | null | undefined>
  >;
  sendChatStartResponse: () => void;
  handleQuitChatClick: () => void;
}

//
//
//

const BuyerChatSection = ({
  messages,
  time,
  isLastElem,
  isQuitButtonActive,
  counselorInfo,
  lastRef,
  topRef,
  topMsgIndexRef,
  sectionPaddingRef,
  setTarget,
  sendChatStartResponse,
  handleQuitChatClick,
}: BuyerChatSectionProps) => {
  const navigate = useNavigate();

  //
  //
  //

  return (
    <SectionWrapper inputHeight={sectionPaddingRef.current}>
      <div className="counselor-info-container">
        {isLastElem && counselorInfo !== null && (
          <ChatCounselorInfoBox info={counselorInfo} />
        )}
      </div>
      {!isLastElem ? (
        <div
          ref={setTarget}
          style={{
            width: '100%',
            backgroundColor: 'green',
          }}
        ></div>
      ) : (
        <div
          style={{
            width: '100%',
            backgroundColor: 'pink',
          }}
        ></div>
      )}

      {messages.map((value, index) => {
        let isLastIndex = index === messages.length - 1;
        //iscustomer가 true인거 customer message, 시작
        //finish는 isCustomer true이지만 보이는건 상대 채팅임
        if (value.isCustomer && value.chatMessageStatus !== 'FINISH') {
          let isTimestampCustomer = true;
          const length = messages.length;
          if (length !== 0 && index !== length - 1) {
            //다음메세지와 시간이 같으면 false
            if (
              messages[index + 1].chatMessageStatus === 'MESSAGE' &&
              messages[index + 1].isCustomer &&
              messages[index + 1].sendTime === value.sendTime
            )
              isTimestampCustomer = false;
          }

          return (
            <div
              key={value.messageId}
              className="my-box-container"
              ref={
                isLastIndex
                  ? lastRef
                  : index === topMsgIndexRef.current
                  ? topRef
                  : null
              }
            >
              {value.chatMessageStatus === 'MESSAGE' && (
                <>
                  {isTimestampCustomer ? (
                    <Caption2 color={Grey3} margin="0 0.8rem 0 0">
                      {convertMessageTime(value.sendTime)}
                    </Caption2>
                  ) : null}
                  <CustomerChatBox>
                    <Body2 color={Grey1}>
                      {formattedMessage(value.content)}
                    </Body2>
                  </CustomerChatBox>
                </>
              )}
              {value.chatMessageStatus === 'START' && (
                <AlertCustomerChatBox>
                  <Caption1 color={Grey3}>
                    {value.content.split('\n')[0]}
                  </Caption1>
                  <Caption2 color={Grey4}>
                    {convertAMPMToStringYear(value.content.split('\n')[1])}
                  </Caption2>
                </AlertCustomerChatBox>
              )}
            </div>
          );
        } else if (
          // isCustomer false 거나, FINISH(true인데 상대편에서 온걸로 처리)
          value.isCustomer === false ||
          value.chatMessageStatus === 'FINISH'
        ) {
          let isTimestampCounselor = true;
          const length = messages.length;
          if (length !== 0 && index !== length - 1) {
            //다음메세지와 시간이 같으면 false
            if (
              messages[index + 1].chatMessageStatus === 'MESSAGE' &&
              !messages[index + 1].isCustomer &&
              messages[index + 1].sendTime === value.sendTime
            )
              isTimestampCounselor = false;
          }
          return (
            <div
              key={value.messageId}
              className="opponent-box-container"
              ref={
                isLastIndex
                  ? lastRef
                  : index === topMsgIndexRef.current
                  ? topRef
                  : null
              }
            >
              {value.chatMessageStatus === 'MESSAGE' && (
                <>
                  <CounselorChatBox>
                    <Body2 color={Grey1}>
                      {formattedMessage(value.content)}
                    </Body2>
                  </CounselorChatBox>
                  {isTimestampCounselor ? (
                    <Caption2 color={Grey3} margin="0 0 0 0.8rem">
                      {convertMessageTime(value.sendTime)}
                    </Caption2>
                  ) : null}
                </>
              )}
              {value.chatMessageStatus === 'SEND_REQUEST' && (
                <CounselorStartRequestBox>
                  <div style={{ paddingBottom: '1.6rem' }}>
                    <Body3 color={Grey1}>
                      {formattedMessage(value.content)}
                    </Body3>
                    <Body3 color={Grey3}>
                      * 상담 시작하기를 누르시면 상담이 시작되어요. 상담 시간은
                      30분입니다.
                    </Body3>
                  </div>
                  <StartButton onClick={sendChatStartResponse}>
                    <Button1 color={White}>상담 시작하기</Button1>
                    <Button2 color={White}>{time}</Button2>
                  </StartButton>
                </CounselorStartRequestBox>
              )}

              {value.chatMessageStatus === 'FINISH' && (
                <EndChatBox>
                  <div style={{ paddingBottom: '1.6rem' }}>
                    <Body3 color={Black}>
                      {value.counselorNickname + value.content}
                    </Body3>
                  </div>
                  <Button
                    text="상담 후기 남기기"
                    width="100%"
                    height="5.2rem"
                    onClick={() => {
                      navigate('/reviewManage');
                    }}
                  />
                </EndChatBox>
              )}
            </div>
          );
        } else if (value.isCustomer === null) {
          return (
            <div
              key={value.messageId}
              className="opponent-box-container"
              ref={
                isLastIndex
                  ? lastRef
                  : index === topMsgIndexRef.current
                  ? topRef
                  : null
              }
            >
              {value.chatMessageStatus === 'FIVE_MINUTE_LEFT' && (
                <AlertCounselorChatBox>
                  <Caption1 color={Grey3}>
                    {value.content.split('\n')[0]}
                  </Caption1>
                  <Caption2 color={Grey4}>
                    {convertAMPMToString(value.content.split('\n')[1])} 종료
                  </Caption2>
                </AlertCounselorChatBox>
              )}
              {value.chatMessageStatus === 'TIME_OVER' && (
                <EndChatBox>
                  <div style={{ paddingBottom: '1.6rem' }}>
                    <Body3 color={Grey1}>{value.content.split('\n')[0]}</Body3>
                    <Body3 color={Grey1}>{value.content.split('\n')[1]}</Body3>
                    <Body3 color={Grey3}>{value.content.split('\n')[2]}</Body3>
                  </div>
                  <Button
                    text="상담 종료하기"
                    width="100%"
                    height="5.2rem"
                    isActive={isQuitButtonActive}
                    onClick={handleQuitChatClick}
                  />
                </EndChatBox>
              )}
            </div>
          );
        }
      })}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section<{ inputHeight: number }>`
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => `${props.inputHeight + 4.3}rem`};
  max-height: calc(
    100% - 5.2rem - ${(props) => `${props.inputHeight + 4.3}rem`}
  );
  overflow-y: auto;
  .counselor-info-container {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 0 2rem;
    justify-content: center;
  }
  .my-box-container {
    display: flex;
    justify-content: flex-end;
    align-items: end;
    padding: 0.4rem 2rem 0.4rem 0;
  }
  .opponent-box-container {
    display: flex;
    justify-content: flex-start;
    align-items: end;
    padding: 0.4rem 0 0.4rem 2rem;
  }
`;

const CustomerChatBox = styled.div`
  background-color: ${LightGreenChat};
  border-radius: 1rem 0 1rem 1rem;
  padding: 1.2rem;
  box-sizing: border-box;
  max-width: 27.5rem;
  word-wrap: break-word;
`;

const CounselorChatBox = styled.div`
  background-color: ${White};
  border-radius: 0 1rem 1rem 1rem;
  padding: 1.2rem;
  box-sizing: border-box;
  max-width: 27.5rem;
  word-wrap: break-word;
`;

const CounselorStartRequestBox = styled.div`
  background-color: ${White};
  border-radius: 0 1rem 1rem 1rem;
  padding: 1.6rem;
  box-sizing: border-box;
  max-width: 23.9rem;
`;

const AlertCustomerChatBox = styled.div`
  width: 100%;
  padding: 0.4rem 0rem 0.4rem 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//opponent box에서 padding 2rem 줘서 align을 위해 padding 추가
const AlertCounselorChatBox = styled.div`
  width: 100%;
  padding: 0.4rem 2rem 0.4rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EndChatBox = styled.div`
  background-color: ${White};
  border-radius: 0 1rem 1rem 1rem;
  padding: 1.6rem;
  box-sizing: border-box;
  max-width: 23.9rem;
`;

const StartButton = styled.button`
  background-color: ${Green};
  width: 100%;
  height: 5.2rem;
  border-radius: 0.8rem;
  cursor: pointer;
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
`;

export default BuyerChatSection;
