import styled from 'styled-components';
//<Heading color={Red}> 이런식으로 사용
//semi-bold : 600 regular : 400
export const Heading = styled.div`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 2rem;
  font-weight: 600;
  line-height: 100%;
`;
export const Subtitle = styled.div`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 135%;
`;
export const Body1 = styled.div`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 150%;
`;
export const Body2 = styled.div`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 150%;
`;
export const Body3 = styled.div`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 155%;
`;
export const Button1 = styled.div`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 125%;
`;
export const Button2 = styled.div`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 125%;
`;
export const Caption1 = styled.div`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 140%;
`;
export const Caption2 = styled.div`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 140%;
`;
