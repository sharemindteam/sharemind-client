import styled from 'styled-components';
import { Black, Grey6 } from 'styles/color';
import { ReactComponent as HideIcon } from 'assets/icons/icon-pw-hide.svg';
import { ReactComponent as NonHideIcon } from 'assets/icons/icon-pw-non-hide.svg';
import { useState } from 'react';
interface PwInputProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  padding?: string;
  margin?: string;
  name?: string;
  isError?: boolean;
  maxLength?: number;
  readOnly?: boolean;
  isCursorPointer?: boolean;
  isBoxSizing?: boolean;
  textIndent?: string;
}
const PwInput = ({
  width = 'auto',
  height = 'auto',
  backgroundColor = Grey6,
  fontSize = '1.6rem',
  fontWeight = '600',
  fontColor = Black,
  value,
  onChange,
  onBlur,
  onFocus,
  padding = '',
  margin = '',
  name,
  isError = false,
  maxLength,
  isCursorPointer = false,
  isBoxSizing = false,
  textIndent = '0',
}: PwInputProps) => {
  const [hideToggle, setHideToggle] = useState<boolean>(true);
  let type: string = 'password';
  if (hideToggle === true) {
    type = 'password';
  } else {
    type = 'text';
  }
  return (
    <div style={{ position: 'relative' }}>
      <StyledInput
        type={type}
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontColor={fontColor}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        padding={padding}
        margin={margin}
        name={name}
        isError={isError}
        maxLength={maxLength}
        isCursorPointer={isCursorPointer}
        isBoxSizing={isBoxSizing}
        textIndent={textIndent}
      />
      {hideToggle ? (
        <HideIcon
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: '1.6rem',
            top: '1rem',
          }}
          onClick={() => {
            setHideToggle(false);
          }}
        />
      ) : (
        <NonHideIcon
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: '1.6rem',
            top: '1rem',
          }}
          onClick={() => {
            setHideToggle(true);
          }}
        />
      )}
    </div>
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
  margin: string;
  isError: boolean;
  isCursorPointer: boolean;
  isBoxSizing: boolean;
  textIndent: string;
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
  text-indent: ${({ textIndent }) => textIndent};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  box-sizing: ${({ isBoxSizing }) =>
    isBoxSizing ? 'border-box' : 'content-box'};
  &:focus {
    outline: none;
  }
`;

export default PwInput;
