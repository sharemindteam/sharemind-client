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
}>`
  border-radius: 10px;
  border: ${(props) => (props.isError ? '1px solid #ff002e' : '')};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: text;
  font-family: 'Pretendard';
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: 150%;
  color: ${({ fontColor }) => fontColor};
  text-indent: 15px;
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
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
