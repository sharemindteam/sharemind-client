import { Button } from 'components/Common/Button';
import styled from 'styled-components';
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
        width="80%"
        backgroundColor={Green}
        height="5.2rem"
      ></Button>
    </BottomButtonWrapper>
  );
};

export const BottomButtonWrapper = styled.div`
  display: block;
  height: 5.2rem;
  width: 100%;
  text-align: center;
  margin-bottom: 1.6rem;
  border-radius: 1.2rem;
  @media (max-width: 767px) {
    position: fixed;
    bottom: 1rem;
  }
  @media (min-width: 768px) {
    width: 375px;
    position: fixed;
    bottom: 1rem;
  }
`;
