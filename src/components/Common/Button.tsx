import styled from 'styled-components';
import { Green, Grey5, White } from 'styles/color';
import { Button1, Button2 } from 'styles/font';
interface ButtonProps {
  width?: string;
  height?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  text?: string;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
  buttonTextType?: 1 | 2 | undefined;
  border?: string;
  isActive?: boolean;
  margin?: string;
}
export const Button = ({
  width = 'fit-content',
  height = 'auto',
  type = 'button',
  text = 'Button',
  onClick,
  backgroundColor = Green,
  color = White,
  borderRadius = '1.4rem',
  buttonTextType,
  border = '',
  isActive = true,
  margin = '',
}: ButtonProps) => {
  if (isActive === true) {
    if (buttonTextType === 1 || buttonTextType === undefined) {
      return (
        <StyledButton
          type={type}
          onClick={onClick}
          $width={width}
          $height={height}
          $backgroundColor={backgroundColor}
          $borderRadius={borderRadius}
          $border={border}
          $margin={margin}
        >
          <Button1 color={color}>{text}</Button1>
        </StyledButton>
      );
    } else {
      return (
        <StyledButton
          type={type}
          onClick={onClick}
          $width={width}
          $height={height}
          $backgroundColor={backgroundColor}
          $borderRadius={borderRadius}
          $border={border}
          $margin={margin}
        >
          <Button2 color={color}>{text}</Button2>
        </StyledButton>
      );
    }
  } else {
    if (buttonTextType === 1 || buttonTextType === undefined) {
      return (
        <StyledDiv
          $width={width}
          $height={height}
          $backgroundColor={Grey5}
          $borderRadius={borderRadius}
          $border={border}
          $margin={margin}
        >
          <Button1 color={color}>{text}</Button1>
        </StyledDiv>
      );
    } else {
      return (
        <StyledDiv
          $width={width}
          $height={height}
          $backgroundColor={Grey5}
          $borderRadius={borderRadius}
          $border={border}
          $margin={margin}
        >
          <Button2 color={color}>{text}</Button2>
        </StyledDiv>
      );
    }
  }
};

const StyledButton = styled.button<{
  $width: string;
  $height: string;
  $backgroundColor: string;
  $borderRadius: string;
  $border: string;
  $margin: string;
}>`
  font-family: Pretendard;
  border-radius: ${(props) => props.$borderRadius};
  background-color: ${(props) => props.$backgroundColor};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  border: ${(props) => props.$border};
  margin: ${(props) => props.$margin};
`;

const StyledDiv = styled.button<{
  $width: string;
  $height: string;
  $backgroundColor: string;
  $borderRadius: string;
  $border: string;
  $margin: string;
}>`
  font-family: Pretendard;
  border-radius: ${(props) => props.$borderRadius};
  background-color: ${(props) => props.$backgroundColor};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  border: ${(props) => props.$border};
  margin: ${(props) => props.$margin};
`;
