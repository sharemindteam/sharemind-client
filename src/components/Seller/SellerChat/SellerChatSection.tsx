import styled from 'styled-components';
import { Grey1, Grey3, Grey4, LightGreenChat, White } from 'styles/color';
import {
  convertAMPMToString,
  convertAMPMToStringYear,
  convertMessageTime,
} from 'utils/convertDate';

import { formattedMessage } from 'utils/formattedMessage';
import { Body2, Caption1, Caption2 } from 'styles/font';
import { ChatMessage } from 'utils/type';

//
//
//

interface SellerChatSectionProps {
  messages: ChatMessage[];
  chatStatus: string;
  isLastElem: React.MutableRefObject<boolean>;
  lastRef: React.RefObject<HTMLDivElement>;
  topRef: React.RefObject<HTMLDivElement>;
  topMsgIndexRef: React.MutableRefObject<number>;
  sectionPaddingRef: React.MutableRefObject<number>;
  setTarget: React.Dispatch<
    React.SetStateAction<HTMLElement | null | undefined>
  >;
}

//
//
//

const SellerChatSection = ({
  messages,
  chatStatus,
  isLastElem,
  lastRef,
  topRef,
  topMsgIndexRef,
  sectionPaddingRef,
  setTarget,
}: SellerChatSectionProps) => {
  return (
    <SectionWrapper
      inputHeight={sectionPaddingRef.current}
      isModal={chatStatus === '상담 대기' || chatStatus === '상담 시작 요청'}
    >
      {!isLastElem.current ? (
        <div
          ref={setTarget}
          style={{
            width: '100%',
            height: '0.1rem',
          }}
        ></div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '0.1rem',
          }}
        ></div>
      )}
      {messages.map((value, index) => {
        let isLastIndex = index === messages.length - 1;
        //my(minder)
        if (value.isCustomer === false) {
          let isTimestampCustomer = true;
          const length = messages.length;
          if (length !== 0 && index !== length - 1) {
            //다음메세지와 시간이 같으면 false
            if (
              messages[index + 1].chatMessageStatus === 'MESSAGE' &&
              !messages[index + 1].isCustomer &&
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
            </div>
          );
        } else if (value.isCustomer) {
          //oppo(share)
          let isTimestampCounselor = true;
          const length = messages.length;
          if (length !== 0 && index !== length - 1) {
            //다음메세지와 시간이 같으면 false
            if (
              messages[index + 1].chatMessageStatus === 'MESSAGE' &&
              messages[index + 1].isCustomer &&
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
              {value.chatMessageStatus === 'START' && (
                <AlertChatBox style={{ paddingRight: '2rem' }}>
                  <Caption1 color={Grey3}>
                    {value.content.split('\n')[0]}
                  </Caption1>
                  <Caption2 color={Grey4}>
                    {convertAMPMToStringYear(value.content.split('\n')[1])}
                  </Caption2>
                </AlertChatBox>
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
                <AlertChatBox style={{ paddingRight: '2rem' }}>
                  <Caption1 color={Grey3}>
                    {value.content.split('\n')[0]}
                  </Caption1>
                  <Caption2 color={Grey4}>
                    {convertAMPMToString(value.content.split('\n')[1])} 종료
                  </Caption2>
                </AlertChatBox>
              )}
            </div>
          );
        }
      })}
    </SectionWrapper>
  );
};

//모달 있을 경우 추가 padding
const SectionWrapper = styled.section<{
  inputHeight: number;
  isModal: boolean;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: ${(props) =>
    props.isModal
      ? `${props.inputHeight + 20.4}rem`
      : `${props.inputHeight + 4.3}rem`};
  max-height: calc(
    100% - 5.2rem -
      ${(props) =>
        props.isModal
          ? `${props.inputHeight + 20.4}rem`
          : `${props.inputHeight + 4.3}rem`}
  );
  overflow-y: auto;
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

//my box에서 padding 2rem 줘서 align을 위해 padding 추가
const AlertChatBox = styled.div`
  width: 100%;
  padding: 0.4rem 0 0.4rem 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default SellerChatSection;
