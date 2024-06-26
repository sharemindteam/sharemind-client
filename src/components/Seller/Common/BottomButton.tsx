import { Button } from 'components/Common/Button';
import styled from 'styled-components';
import { APP_WIDTH } from 'styles/AppStyle';
import { Green } from 'styles/color';

interface BottomButtonProps {
  text: string;
  onClick: () => void;
  isActive?: boolean;
}
export const BottomButton = ({
  text,
  onClick,
  isActive = true,
}: BottomButtonProps) => {
  return (
    <BottomButtonWrapper>
      <Button
        isActive={isActive}
        onClick={onClick}
        text={text}
        width="100%"
        backgroundColor={Green}
        height="5.2rem"
      ></Button>
    </BottomButtonWrapper>
  );
};

export const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  padding: 0 2rem;
  box-sizing: border-box;
  width: 100%;

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }

  text-align: center;
  margin-bottom: 1.6rem;
  border-radius: 1.2rem;
`;
