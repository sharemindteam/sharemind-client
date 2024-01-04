import styled from 'styled-components';
import { Green, Grey4, LightGreen, LightRed, Red, White } from 'styles/color';
import { Caption2 } from 'styles/font';
interface TagA2ConsultProps {
  tagType: ConsultState;
  isBuyer: boolean;
}
const borderColor = {
  '답변 대기': Green,
  '질문 대기': Red,
  '답변 도착': Green,
  '질문 도착': Red,
  '상담 대기': Green,
  '상담 중': Green,
  '상담 종료': Grey4,
};
const bgColor = {
  '답변 대기': LightGreen,
  '질문 대기': LightRed,
  '답변 도착': Green,
  '질문 도착': Red,
  '상담 대기': LightGreen,
  '상담 중': Green,
  '상담 종료': Grey4,
};
const fontColor = {
  '답변 대기': Green,
  '질문 대기': Red,
  '답변 도착': White,
  '질문 도착': White,
  '상담 대기': Green,
  '상담 중': White,
  '상담 종료': White,
};
export const TagA2Consult = ({ tagType, isBuyer }: TagA2ConsultProps) => {
  let consultTagBd = borderColor[tagType];
  let consultTagBg = bgColor[tagType];
  let consultTagFont = fontColor[tagType];
  if (!isBuyer) {
    if (tagType === '상담 대기') {
      consultTagBd = Red;
      consultTagBg = LightRed;
      consultTagFont = Red;
    } else if (tagType === '상담 중') {
      consultTagBd = Red;
      consultTagBg = Red;
    }
  }
  return (
    <Wrapper border={consultTagBd} background={consultTagBg} type={tagType}>
      <Caption2 color={consultTagFont}>{tagType}</Caption2>
    </Wrapper>
  );
};
const Wrapper = styled.div<{
  border: string;
  background: string;
  type: ConsultState;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.type !== '상담 중' ? '5.7rem' : '4.7rem')};
  height: 2.5rem;
  border-radius: 0.8rem;
  border: 1px solid ${(props) => props.border};
  background-color: ${(props) => props.background};
`;
