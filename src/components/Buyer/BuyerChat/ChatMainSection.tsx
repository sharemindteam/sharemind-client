import styled from 'styled-components';
import { LightGreenChat, White } from 'styles/color';
import { ChatMessage } from 'utils/type';

interface ChatMainSectionProps {
  messages: ChatMessage[];
}

export const ChatMainSection = ({ messages }: ChatMainSectionProps) => {
  return (
    <Wrapper>
      {messages.map((value) => {
        if (value.isCustomer) {
          return (
            <div className="my-box-container">
              <CustomerChatBox>{value.content}</CustomerChatBox>
            </div>
          );
        } else {
          return (
            <div className="opponent-box-container">
              <CounselorChatBox>{value.content}</CounselorChatBox>
            </div>
          );
        }
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  .my-box-container {
    display: flex;
    justify-content: flex-end;
  }
  .opponent-box-container {
    display: flex;
    justify-content: flex-start;
  }
`;

const CustomerChatBox = styled.div`
  background-color: ${LightGreenChat};
`;
const CounselorChatBox = styled.div`
  background-color: ${White};
`;
