import styled from 'styled-components';
import { Black, Grey4, Grey6 } from 'styles/color';

interface InputProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  placeHolderColor?: string;
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
}
const Input = ({
  width = 'auto',
  height = 'auto',
  backgroundColor = Grey6,
  fontSize = '1.6rem',
  fontWeight = '600',
  fontColor = Black,
  placeHolderColor = Grey4,
  value,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  type = 'text',
  padding = '',
  margin = '',
  name,
  isError = false,
  maxLength,
  readOnly = false,
  isCursorPointer = false,
  isBoxSizing = false,
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
  fontWeight: string;
  padding: string;
  margin: string;
  isError: boolean;
  isCursorPointer: boolean;
  isBoxSizing: boolean;
}>`
  border-radius: 10px;
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
  text-indent: 0.5rem;
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  box-sizing: ${({ isBoxSizing }) =>
    isBoxSizing ? 'border-box' : 'content-box'};
  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: ${({ fontSize }) => fontSize};
    font-weight: ${({ fontWeight }) => fontWeight};
    color: ${({ placeHolderColor }) => placeHolderColor};
  }
`;

export default Input;
