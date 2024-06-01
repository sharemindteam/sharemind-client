import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Grey6 } from 'styles/color';
import { Characters } from 'utils/Characters';
import { searchKeywordState } from 'utils/atom';
export const CartegorySearch = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const setSearchKeyword = useSetRecoilState(searchKeywordState);
  return (
    <Wrapper>
      <Line>
        <CartegoryItem>
          <Characters
            number={1}
            onClick={() => {
              setSearchKeyword('연애갈등');
              if (pathname === '/search') {
                navigate('/categorySearch?from=search');
              } else {
                navigate('/categorySearch');
              }
            }}
          />
          <Text>연애갈등</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Characters
            number={2}
            onClick={() => {
              setSearchKeyword('이별/재회');
              if (pathname === '/search') {
                navigate('/categorySearch?from=search');
              } else {
                navigate('/categorySearch');
              }
            }}
          />
          <Text>이별/재회</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Characters
            number={3}
            onClick={() => {
              setSearchKeyword('여자심리');
              if (pathname === '/search') {
                navigate('/categorySearch?from=search');
              } else {
                navigate('/categorySearch');
              }
            }}
          />
          <Text>여자심리</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Characters
            number={4}
            onClick={() => {
              setSearchKeyword('남자심리');
              if (pathname === '/search') {
                navigate('/categorySearch?from=search');
              } else {
                navigate('/categorySearch');
              }
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
              setSearchKeyword('썸/연애시작');
              if (pathname === '/search') {
                navigate('/categorySearch?from=search');
              } else {
                navigate('/categorySearch');
              }
            }}
          />
          <Text>썸/연애시작</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Characters
            number={6}
            onClick={() => {
              setSearchKeyword('짝사랑');
              if (pathname === '/search') {
                navigate('/categorySearch?from=search');
              } else {
                navigate('/categorySearch');
              }
            }}
          />
          <Text>짝사랑</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Characters
            number={7}
            onClick={() => {
              setSearchKeyword('권태기');
              if (pathname === '/search') {
                navigate('/categorySearch?from=search');
              } else {
                navigate('/categorySearch');
              }
            }}
          />
          <Text>권태기</Text>
        </CartegoryItem>
        <CartegoryItem>
          <Characters
            number={8}
            onClick={() => {
              setSearchKeyword('기타');
              if (pathname === '/search') {
                navigate('/categorySearch?from=search');
              } else {
                navigate('/categorySearch');
              }
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
  background-color: ${Grey6};
`;
const Line = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.4rem;
`;
const CartegoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  
  cursor: pointer;
`;
const Text = styled.div`
  font-family: Pretendard;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 110%;
`;
