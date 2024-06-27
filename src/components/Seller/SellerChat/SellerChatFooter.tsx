import { ReactComponent as Search } from 'assets/icons/chat-send-button.svg';
import styled from 'styled-components';
import { APP_WIDTH } from 'styles/AppStyle';
import { Green, Grey1, Grey3, Grey6, White } from 'styles/color';

//
//
//

interface SellerChatFooterProps {
  input: string;
  isTyping: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  hiddenInputRef: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
}

//
//
//

const SellerChatFooter = ({
  input,
  isTyping,
  inputRef,
  hiddenInputRef,
  onChange,
  handleSubmit,
}: SellerChatFooterProps) => {
  return (
    <FooterWrapper>
      <div className="message-form">
        <ChatTextareaWrapper>
          <ChatTextarea
            rows={1}
            ref={inputRef}
            placeholder="메세지"
            value={input}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return; //key 조합 감지
              // 모바일 환경이 아닐 때에는 enter로 전송, shift + enter로 줄바꿈
              if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                if (e.key === 'Enter' && e.shiftKey) return;
                else if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }
            }}
          />
          <input ref={hiddenInputRef} className="hidden-input" />
        </ChatTextareaWrapper>
        <button style={{ margin: '0', padding: '0' }} onClick={handleSubmit}>
          <SearchIcon isTyping={isTyping} />
        </button>
      </div>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  position: fixed;
  z-index: 999;

  width: 100%;

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }

  background-color: ${White};
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .message-form {
    padding: 0.8rem 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
  }
`;

const SearchIcon = styled(Search)<{ isTyping: boolean }>`
  fill: ${(props) => (props.isTyping ? Green : Grey3)};
  padding: 1rem 0.4rem 1rem 0.8rem;
  cursor: pointer;
`;

const ChatTextareaWrapper = styled.div`
  padding: 1.2rem 0.8rem 1.2rem 1.2rem;
  background-color: ${Grey6};
  width: 78.66%;
  border-radius: 1.2rem;
  box-sizing: border-box;
  position: relative;
  .hidden-input {
    position: absolute;
    width: 0;
    height: 0;
    background-color: transparent;
    pointer-events: none;
  }
`;

const ChatTextarea = styled.textarea`
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: ${Grey1};
  &::placeholder {
    color: ${Grey3};
  }
  padding: 0;
  margin: 0;
  max-height: 7.2rem;
  width: 100%;
  background-color: ${Grey6};
  box-sizing: border-box;
`;
export default SellerChatFooter;
