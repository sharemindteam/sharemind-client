import styled from 'styled-components';
interface SpaceProps {
  width?: string;
  height?: string;
}
export const Space = ({ width = 'auto', height = 'auto' }: SpaceProps) => {
  return <StyledSpace width={width} height={height}></StyledSpace>;
};

const StyledSpace = styled.div<SpaceProps>`
    width: ${props => props.width};
    height: ${props=>props.height};
`;
