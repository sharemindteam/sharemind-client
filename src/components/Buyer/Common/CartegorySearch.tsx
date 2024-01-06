import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey6 } from 'styles/color';
import { Characters } from 'utils/Characters';

export const CartegorySearch = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Line>
        <CartegoryItem>
          <Characters
            number={1}
            onClick={() => {
              navigate('/buyer/search/1');
            }}
          />
          <Text>연애갈등</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Characters
            number={2}
            onClick={() => {
              navigate('/buyer/search/2');
            }}
          />
          <Text>이별/재회</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Characters
            number={3}
            onClick={() => {
              navigate('/buyer/search/3');
            }}
          />
          <Text>여자심리</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Characters
            number={4}
            onClick={() => {
              navigate('/buyer/search/4');
            }}
          />
          <Text>남자심리</Text>
        </CartegoryItem>
      </Line>
      <Line>
        <CartegoryItem>
          <Characters
            number={5}
            onClick={() => {
              navigate('/buyer/search/5');
            }}
          />
          <Text>썸/연애시작</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Characters
            number={6}
            onClick={() => {
              navigate('/buyer/search/6');
            }}
          />
          <Text>짝사랑</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Characters
            number={7}
            onClick={() => {
              navigate('/buyer/search/7');
            }}
          />
          <Text>권태기</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Characters
            number={8}
            onClick={() => {
              navigate('/buyer/search/8');
            }}
          />
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
  padding: 1.6rem 2rem 1.6rem 2.1rem;
  border-bottom: 1px solid ${Grey6};
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
  cursor: pointer;
`;
const Text = styled.div`
  font-family: Pretendard;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 110%;
`;
