import styled, { CSSProperties } from 'styled-components';

//
//
//

interface FlexProps extends FlexBaseProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

interface FlexBaseProps {
  height?: string;
  width?: string;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  gap?: number | string;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}

//
//
//

export const Flex = ({
  children,
  width = 'auto',
  height = 'auto',
  direction = 'row',
  justify = 'center',
  align = 'center',
  gap = 0,
  wrap = 'nowrap',
  className,
  style,
  onClick,
}: FlexProps) => {
  return (
    <FlexBase
      height={height}
      direction={direction}
      justify={justify}
      align={align}
      gap={gap}
      width={width}
      wrap={wrap}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </FlexBase>
  );
};

const FlexBase = styled.div<FlexBaseProps>`
  display: flex;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  gap: ${({ gap }) => `${gap}`};
  flex-wrap: ${({ wrap }) => wrap};
`;
