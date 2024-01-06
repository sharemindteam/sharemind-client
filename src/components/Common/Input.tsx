import styled from 'styled-components';
import { Black, Grey6 } from 'styles/color';

interface InputProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  type?: string;
  padding?: string;
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
  value,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  type = 'text',
  padding = '',
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
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      type={type}
      padding={padding}
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
  fontWeight: string;
  padding: string;
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
  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: ${({ fontSize }) => fontSize};
    font-weight: ${({ fontWeight }) => fontWeight};
  }
`;

export default Input;
