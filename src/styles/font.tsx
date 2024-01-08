import styled from 'styled-components';
//<Heading color={Red}> 이런식으로 사용
//semi-bold : 600 regular : 400
interface FontProps {
  color?: string;
  padding?: string;
  margin?: string;
  underline?: boolean;
}
export const Heading = styled.div<FontProps>`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 2rem;
  font-weight: 600;
  line-height: 100%;
  padding: ${(props) => props.padding || ''};
  margin: ${(props) => props.margin || ''};
  text-decoration-line: ${(props) => props.underline && 'underline'};
`;
export const Subtitle = styled.div<FontProps>`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 135%;
  padding: ${(props) => props.padding || ''};
  margin: ${(props) => props.margin || ''};
  text-decoration-line: ${(props) => props.underline && 'underline'};
`;
export const Body1 = styled.div<FontProps>`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 150%;
  padding: ${(props) => props.padding || ''};
  margin: ${(props) => props.margin || ''};
  text-decoration-line: ${(props) => props.underline && 'underline'};
`;
export const Body2 = styled.div<FontProps>`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 150%;
  padding: ${(props) => props.padding || ''};
  margin: ${(props) => props.margin || ''};
  text-decoration-line: ${(props) => props.underline && 'underline'};
`;
export const Body3 = styled.div<FontProps>`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 155%;
  padding: ${(props) => props.padding || ''};
  margin: ${(props) => props.margin || ''};
  text-decoration-line: ${(props) => props.underline && 'underline'};
`;
export const Button1 = styled.div<FontProps>`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 125%;
  padding: ${(props) => props.padding || ''};
  margin: ${(props) => props.margin || ''};
  text-decoration-line: ${(props) => props.underline && 'underline'};
`;
export const Button2 = styled.div<FontProps>`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 125%;
  padding: ${(props) => props.padding || ''};
  margin: ${(props) => props.margin || ''};
  text-decoration-line: ${(props) => props.underline && 'underline'};
`;
export const Caption1 = styled.div<FontProps>`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 140%;
  padding: ${(props) => props.padding || ''};
  margin: ${(props) => props.margin || ''};
  text-decoration-line: ${(props) => props.underline && 'underline'};
`;
export const Caption2 = styled.div<FontProps>`
  font-family: Pretendard;
  color: ${(props) => props.color || '#000000'};
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 140%;
  padding: ${(props) => props.padding || ''};
  margin: ${(props) => props.margin || ''};
  text-decoration-line: ${(props) => props.underline && 'underline'};
`;
