import styled from 'styled-components';
import { Green, Grey6, Red, White } from 'styles/color';
import { Caption2 } from 'styles/font';
import { CartegoryState } from 'utils/type';
//bgcolor type이 1이면 white 2면 해당 색상, 3이면 grey6
interface TagA2CartegoryProps {
  tagType: CartegoryState;
  bgColorType: number;
}

export const TagA2Cartegory = ({
  tagType,
  bgColorType,
}: TagA2CartegoryProps) => {
  let fontColor: string;
  let bgColor: string = White;

  if (bgColorType === 1) {
    bgColor = White;
  } else if (bgColorType === 3) {
    bgColor = Grey6;
  }
  //green인 경우
  if (!(tagType === '공감' || tagType === '조언' || tagType === '팩폭')) {
    fontColor = Green;
    //bg색상 존재하는 경우
    if (bgColorType === 2) {
      bgColor = Green;
      fontColor = White;
    }
  } else {
    // red인 경우
    fontColor = Red;
    if (bgColorType === 2) {
      bgColor = Red;
      fontColor = White;
    }
  }

  return (
    <Wrapper background={bgColor}>
      <Caption2 color={fontColor}>{tagType}</Caption2>
    </Wrapper>
  );
};
const Wrapper = styled.div<{
  background: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 0.8rem;
  border-radius: 0.8rem;
  background-color: ${(props) => props.background};
`;
