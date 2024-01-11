import { Button } from 'components/Common/Button';
import styled from 'styled-components';
import { Green } from 'styles/color';

interface BottomButtonProps {
  text: string;
  onClick: () => void;
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

const BottomButtonWrapper = styled.button`
  height: 5.2rem;
  width: 100%;
  margin-bottom: 1.6rem;
  border-radius: 1.2rem;
  @media (max-width: 767px) {
    position: fixed;
    bottom: 1rem;
  }
  @media (min-width: 768px) {
    position: sticky;
    bottom: 1rem;
  }
`;
