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
}: PwInputProps) => {
  const [hideToggle, setHideToggle] = useState<boolean>(true);
  let type: string = 'password';
  if (hideToggle === true) {
    type = 'password';
  } else {
    type = 'text';
  }
  return (
    <InputWrapper
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      padding={padding}
      margin={margin}
      isError={isError}
    >
      <StyledInput
        backgroundColor={backgroundColor}
        type={type}
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
      />
      {hideToggle ? (
        <HideIcon
          style={{
            paddingRight: '1.6rem',
            cursor: 'pointer',
          }}
          onClick={() => {
            setHideToggle(false);
          }}
        />
      ) : (
        <NonHideIcon
          style={{
            paddingRight: '1.6rem',
            cursor: 'pointer',
          }}
          onClick={() => {
            setHideToggle(true);
          }}
        />
      )}
    </InputWrapper>
  );
};
const InputWrapper = styled.div<{
  width: string;
  height: string;
  backgroundColor: string;
  padding: string;
  margin: string;
  isError: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  border: ${(props) => (props.isError ? '1px solid #ff002e' : Grey6)};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;
const StyledInput = styled.input<{
  backgroundColor: string;
  fontColor: string;
  fontSize: string;
  fontWeight: string;
  padding: string;
  margin: string;
  isError: boolean;
}>`
  width: 86.86%;
  border-radius: 1rem;
  padding-left: 1rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-family: 'Pretendard';
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: 150%;
  color: ${({ fontColor }) => fontColor};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

export default PwInput;
