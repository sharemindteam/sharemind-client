import { Button } from 'components/Common/Button';
import reactTextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { ReactComponent as SendIcon } from 'assets/icons/icon-send.svg';
import { Green, Grey3, Grey6, LightGreen, White } from 'styles/color';
import { useSetRecoilState } from 'recoil';
import { isSendPopupOpenState } from 'utils/atom';
import { useNavigate, useParams } from 'react-router-dom';
import useConsultNavigation from 'hooks/useConsultNavigation';
import useIsAlreadyReply from 'hooks/useIsAlreadyReply';
import { APP_WIDTH } from 'styles/AppStyle';
import { OPEN_CONSULT_FOOTER_ID } from 'pages/Seller/SellerOpenConsult';
import { useEffect, useState } from 'react';

//
//
//

interface BottomSectionProps {
  isReplying: boolean;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

interface BottomSectionWrapperProps {
  bottom: number;
}

//
//
//

function BottomSection({
  isReplying,
  setIsReplying,
  text,
  setText,
}: BottomSectionProps) {
  const navigate = useNavigate();

  const setIsSendPopupOpen = useSetRecoilState(isSendPopupOpenState);

  const { consultid } = useParams() as { consultid: string };

  const { handleNavigateRandomConsult } = useConsultNavigation(consultid);

  // 마인더가 해당 상담에 답장했는지 여부
  const isAlreadyReply = useIsAlreadyReply(consultid, navigate);

  /** In order to solve the issue of the IOS keyboard forcibly pushing up the document to create additional space, the bottom value of the bottom section component is managed as a state when the keyboard is opened.
   ref: https://stackoverflow.com/questions/43833049/how-to-make-fixed-content-go-above-ios-keyboard */
  const [bottom, setBottom] = useState(0);

  useEffect(() => {
    const updateBottom = () => {
      if (visualViewport) {
        const newBottom =
          visualViewport.height < window.innerHeight
            ? window.innerHeight - visualViewport.height
            : 0;

        setBottom(newBottom);
      }
    };

    const handleResize = () => {
      if (
        /iPhone|iPad|iPod/.test(window.navigator.userAgent) &&
        visualViewport
      ) {
        updateBottom();
      }
    };

    if (visualViewport) {
      visualViewport.addEventListener('resize', handleResize);
    }
    return () => {
      if (visualViewport) {
        visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  //
  //
  //

  return (
    <BottomSectionWrapper id={OPEN_CONSULT_FOOTER_ID} bottom={bottom}>
      {isReplying ? (
        <div className="message-input">
          <MessageTextArea
            value={text}
            placeholder="답장을 작성해주세요."
            onChange={(e) => {
              setText(e.target.value);
            }}
            rows={1}
            maxRows={4}
          />
          <SendIconSVG
            fill={text.length > 0 ? Green : Grey3}
            onClick={() => {
              if (text.length > 0) {
                setIsSendPopupOpen(true);
              }
            }}
          />
        </div>
      ) : (
        <div className="buttons">
          <Button
            text={'다른 질문보기'}
            width="100%"
            backgroundColor={LightGreen}
            color={Green}
            height="5.2rem"
            onClick={handleNavigateRandomConsult}
          />
          <Button
            text={'답장쓰기'}
            width="100%"
            isActive={!isAlreadyReply}
            backgroundColor={Green}
            height="5.2rem"
            onClick={() => {
              if (!isAlreadyReply) {
                setIsReplying(true);
              }
            }}
          />
        </div>
      )}
    </BottomSectionWrapper>
  );
}

const BottomSectionWrapper = styled.section<BottomSectionWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  gap: 0.6rem;
  padding-top: 0.8rem;
  padding-bottom: 1.6rem;
  background-color: ${White};

  position: fixed;
  bottom: ${({ bottom }) => bottom}px;
  width: 100%;
  .buttons {
    display: flex;
    justify-content: center;
    gap: 0.7rem;
    width: calc(100% - 4rem);
  }
  .message-input {
    display: flex;
    width: calc(100% - 4rem);
    align-items: center;
    gap: 0.8rem;
  }

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }
`;

const MessageTextArea = styled(reactTextareaAutosize)`
  width: 100%;
  padding: 1.2rem 1.5rem;
  outline: none;
  border: none;
  resize: none;
  border-radius: 1.2rem;
  background-color: ${Grey6};
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.76rem */
  &:focus {
    border: none;
    outline: none;
  }
`;

const SendIconSVG = styled(SendIcon)`
  cursor: pointer;
  align-self: flex-end;
  padding-bottom: 0.7rem;
`;

export default BottomSection;
