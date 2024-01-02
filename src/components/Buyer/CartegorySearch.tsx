import { ReactComponent as Char1 } from 'assets/characters/char1.svg';
import { ReactComponent as Char2 } from 'assets/characters/char2.svg';
import { ReactComponent as Char3 } from 'assets/characters/char3.svg';
import { ReactComponent as Char4 } from 'assets/characters/char4.svg';
import { ReactComponent as Char5 } from 'assets/characters/char5.svg';
import { ReactComponent as Char6 } from 'assets/characters/char6.svg';
import { ReactComponent as Char7 } from 'assets/characters/char7.svg';
import { ReactComponent as Char8 } from 'assets/characters/char8.svg';
import styled from 'styled-components';
import { Button1 } from 'styles/font';
export const CartegorySearch = () => {
  return (
    <Wrapper>
      <Line>
        <CartegoryItem>
          <Char1 />
          <Text>연애갈등</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Char2 />
          <Text>이별/재회</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Char3 />
          <Text>여자심리</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Char4 />
          <Text>남자심리</Text>
        </CartegoryItem>
      </Line>
      <Line>
        <CartegoryItem>
          <Char5 />
          <Text>썸/연애시작</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Char6 />
          <Text>짝사랑</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Char7 />
          <Text>권태기</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Char8 />
          <Text>기타</Text>
        </CartegoryItem>
      </Line>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin: 1.6rem 2rem 1.6rem 2.1rem;
`;
const Line = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.6rem;
`;
const CartegoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const Text = styled.div`
  font-family: Pretendard;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 110%;
`;
