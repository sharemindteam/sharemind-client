import styled from 'styled-components';
import { Green, Grey4, Grey6 } from 'styles/color';
import { Subtitle } from 'styles/font';
import { ReactComponent as UnderLine } from 'assets/icons/underline-counselor-info.svg';
import { useState } from 'react';
interface CounselorProfileNavProps {
  isId: boolean;
  setIsId: React.Dispatch<React.SetStateAction<boolean>>;
}
export const FindInfoNav = ({ isId, setIsId }: CounselorProfileNavProps) => {
  const [idColor, setIdColor] = useState<string>(Green);
  const [pwColor, setPwColor] = useState<string>(Grey4);
  return (
    <Wrapper>
      <InfoWrapper
        onClick={() => {
          setIsId(true);
          setPwColor(Grey4);
          setIdColor(Green);
        }}
      >
        <Subtitle color={idColor}>아이디</Subtitle>
        {isId ? <UnderLine /> : null}
      </InfoWrapper>
      <ReviewWrapper
        onClick={() => {
          setIsId(false);
          setIdColor(Grey4);
          setPwColor(Green);
        }}
      >
        <Subtitle color={pwColor}>비밀번호</Subtitle>
        {!isId ? <UnderLine /> : null}
      </ReviewWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 4.4rem;
  border-bottom: 1px solid ${Grey6};
  display: flex;
`;
const InfoWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.8rem;
  cursor: pointer;
`;
const ReviewWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.8rem;
  cursor: pointer;
`;
