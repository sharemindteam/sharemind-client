import { Button } from 'components/Common/Button';
import styled from 'styled-components';
import { Grey1, Grey6 } from 'styles/color';

//
//
//

interface SignupVerifyInputProps {
  value: string;
  isActive: boolean;
  verifyText: string;
  onClick: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

//
//
//

const SignupVerifyInput = ({
  value,
  isActive,
  verifyText,
  onClick,
  onChange,
}: SignupVerifyInputProps) => {
  return (
    <Wrapper>
      <VerifyInput value={value} onChange={onChange} />
      <Button
        text={verifyText}
        borderRadius="0.8rem"
        height="3.4rem"
        padding="0 1.5rem"
        buttonTextType={2}
        onClick={onClick}
        isActive={isActive}
      />
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  display: flex;
  border-radius: 1rem;
  justify-content: space-between;
  align-items: center;
  width: 31.8rem;
  height: 3.4rem;
  padding: 0.7rem 0.7rem 0.7rem 1rem;
  background-color: ${Grey6};
`;

const VerifyInput = styled.input`
  background-color: ${Grey6};
  border-radius: 1rem;
  color: ${Grey1};
  font-family: 'Pretendard';
  font-size: 1.6rem;
  font-weight: 600;
  flex-grow: 1;
  &:focus {
    outline: none;
  }
`;

export default SignupVerifyInput;
