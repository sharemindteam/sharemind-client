import styled from 'styled-components';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Caption2 } from 'styles/font';
import { ConsultState } from 'utils/type';
interface TagA2ConsultProps {
  tagType: ConsultState;
}
const borderColor = {
  '답변 대기': Green,
  '질문 대기': Green,
  '답변 도착': Green,
  '질문 도착': Green,
  '상담 대기': Green,
  '상담 중': Green,
  '상담 종료': Grey4,
  '상담 취소': Grey4,
};
const bgColor = {
  '답변 대기': LightGreen,
  '질문 대기': LightGreen,
  '답변 도착': Green,
  '질문 도착': Green,
  '상담 대기': LightGreen,
  '상담 중': Green,
  '상담 종료': Grey4,
  '상담 취소': Grey4,
};
const fontColor = {
  '답변 대기': Green,
  '질문 대기': Green,
  '답변 도착': White,
  '질문 도착': White,
  '상담 대기': Green,
  '상담 중': White,
  '상담 종료': White,
  '상담 취소': White,
};
export const TagA2Consult = ({ tagType }: TagA2ConsultProps) => {
  let consultTagBd = borderColor[tagType];
  let consultTagBg = bgColor[tagType];
  let consultTagFont = fontColor[tagType];

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
