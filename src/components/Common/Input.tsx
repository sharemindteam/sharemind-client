import styled from 'styled-components';
import { Black, Grey3, Grey6 } from 'styles/color';

interface InputProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  placeHolderColor?: string;
  placeHolderWeight?: string;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  type?: string;
  padding?: string;
  margin?: string;
  name?: string;
  isError?: boolean;
  maxLength?: number;
  readOnly?: boolean;
  isCursorPointer?: boolean;
  isBoxSizing?: boolean;
  textIndent?: string;
  onClick?: () => void;
  alignCenter?: boolean;
  isCut?: boolean;
  borderRadius?: string;
}
const Input = ({
  width = 'auto',
  height = 'auto',
  backgroundColor = Grey6,
  fontSize = '1.6rem',
  fontWeight = '600',
  fontColor = Black,
  placeHolderColor = Grey3,
  placeHolderWeight = '400',
  value,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  type = 'text',
  padding = '',
  margin = '',
  name,
  alignCenter = false,
  isError = false,
  maxLength,
  readOnly = false,
  isCursorPointer = false,
  isBoxSizing = false,
  textIndent = '0',
  onClick,
  isCut = false,
  borderRadius = '1rem',
}: InputProps) => {
  return (
    <StyledInput
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontColor={fontColor}
      placeHolderColor={placeHolderColor}
      placeHolderWeight={placeHolderWeight}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      type={type}
      padding={padding}
      margin={margin}
      name={name}
      isError={isError}
      maxLength={maxLength}
      readOnly={readOnly}
      isCursorPointer={isCursorPointer}
      isBoxSizing={isBoxSizing}
      textIndent={textIndent}
      onClick={onClick}
      alignCenter={alignCenter}
      isCut={isCut}
      borderRadius={borderRadius}
    />
  );
};

const StyledInput = styled.input<{
  width: string;
  height: string;
  backgroundColor: string;
  fontColor: string;
  fontSize: string;
  placeHolderColor: string;
  placeHolderWeight: string;
  fontWeight: string;
  padding: string;
  margin: string;
  isError: boolean;
  isCursorPointer: boolean;
  isBoxSizing: boolean;
  textIndent: string;
  alignCenter: boolean;
  isCut: boolean;
  borderRadius: string;
}>`
  border-radius: ${({ borderRadius }) => borderRadius};
  border: ${(props) => (props.isError ? '1px solid #ff002e' : '')};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: ${({ isCursorPointer }) => (isCursorPointer ? 'pointer' : 'text')};
  font-family: 'Pretendard';
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: 150%;
  color: ${({ fontColor }) => fontColor};
  text-overflow: ${({ isCut }) => (isCut ? 'ellipsis' : '')};
  text-indent: ${({ textIndent }) => textIndent};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  text-align: ${({ alignCenter }) => (alignCenter ? 'center' : 'left')};
  box-sizing: ${({ isBoxSizing }) =>
    isBoxSizing ? 'border-box' : 'content-box'};
  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: ${({ fontSize }) => fontSize};
    font-weight: ${({ placeHolderWeight }) => placeHolderWeight};
    color: ${({ placeHolderColor }) => placeHolderColor};
  }
`;

export default Input;
