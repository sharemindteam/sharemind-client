import { Button } from 'components/Common/Button';
import styled from 'styled-components';
import { Green } from 'styles/color';

interface BottomButtonProps {
  text: string;
  onClick?: () => void;
}
export const BottomButton = ({ text, onClick }: BottomButtonProps) => {
  return (
    <BottomButtonWrapper>
      <Button
        onClick={onClick}
        text={text}
        width="80%"
        backgroundColor={Green}
        height="5.2rem"
      ></Button>
    </BottomButtonWrapper>
  );
};

export const BottomButtonWrapper = styled.button`
  height: 5.2rem;
  margin-bottom: 1.6rem;
  border-radius: 1.2rem;
  @media (max-width: 767px) {
    width: 100%;
    position: fixed;
    bottom: 1rem;
  }
  @media (min-width: 768px) {
    position: fixed;
    bottom: 1rem;
    width: 375px;
    bottom: 1rem;
  }
`;
