import { ReactComponent as Char1 } from 'assets/characters/char1.svg';
import { ReactComponent as Char2 } from 'assets/characters/char2.svg';
import { ReactComponent as Char3 } from 'assets/characters/char3.svg';
import { ReactComponent as Char4 } from 'assets/characters/char4.svg';
import { ReactComponent as Char5 } from 'assets/characters/char5.svg';
import { ReactComponent as Char6 } from 'assets/characters/char6.svg';
import { ReactComponent as Char7 } from 'assets/characters/char7.svg';
import { ReactComponent as Char8 } from 'assets/characters/char8.svg';
import { ReactComponent as Char9 } from 'assets/characters/char9.svg';
import { ReactComponent as Char10 } from 'assets/characters/char10.svg';
import { ReactComponent as Char11 } from 'assets/characters/char11.svg';
import styled from 'styled-components';
interface CharacterProps {
  number: number;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export const Characters = ({
  number,
  width = '100%',
  height = '100%',
  padding = '0',
  margin = '0',
  onClick,
}: CharacterProps) => {
  if (number === 1) {
    return (
      <Char1Icon
        width={width}
        height={height}
        padding={padding}
        margin={margin}
        onClick={onClick}
      />
    );
  } else if (number === 2) {
    return (
      <Char2Icon
        width={width}
        height={height}
        padding={padding}
        margin={margin}
        onClick={onClick}
      />
    );
  } else if (number === 3) {
    return (
      <Char3Icon
        width={width}
        height={height}
        padding={padding}
        margin={margin}
        onClick={onClick}
      />
    );
  } else if (number === 4) {
    return (
      <Char4Icon
        width={width}
        height={height}
        padding={padding}
        margin={margin}
        onClick={onClick}
      />
    );
  } else if (number === 5) {
    return (
      <Char5Icon
        width={width}
        height={height}
        padding={padding}
        margin={margin}
        onClick={onClick}
      />
    );
  } else if (number === 6) {
    return (
      <Char6Icon
        width={width}
        height={height}
        padding={padding}
        margin={margin}
        onClick={onClick}
      />
    );
  } else if (number === 7) {
    return (
      <Char7Icon
        width={width}
        height={height}
        padding={padding}
        margin={margin}
        onClick={onClick}
      />
    );
  } else if (number === 8) {
    return (
      <Char8Icon
        width={width}
        height={height}
        padding={padding}
        margin={margin}
        onClick={onClick}
      />
    );
  } else if (number === 9) {
    return (
      <Char9Icon
        width={width}
        height={height}
        padding={padding}
        margin={margin}
      />
    );
  } else if (number === 10) {
    return (
      <Char10Icon
        width={width}
        height={height}
        padding={padding}
        margin={margin}
      />
    );
  } else if (number === 11) {
    return (
      <Char11Icon
        width={width}
        height={height}
        padding={padding}
        margin={margin}
      />
    );
  } else {
    return null;
  }
};
const Char1Icon = styled(Char1)<{
  width: string;
  height: string;
  padding: string;
  margin: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;
const Char2Icon = styled(Char2)<{
  width: string;
  height: string;
  padding: string;
  margin: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;
const Char3Icon = styled(Char3)<{
  width: string;
  height: string;
  padding: string;
  margin: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;
const Char4Icon = styled(Char4)<{
  width: string;
  height: string;
  padding: string;
  margin: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;
const Char5Icon = styled(Char5)<{
  width: string;
  height: string;
  padding: string;
  margin: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;
const Char6Icon = styled(Char6)<{
  width: string;
  height: string;
  padding: string;
  margin: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;
const Char7Icon = styled(Char7)<{
  width: string;
  height: string;
  padding: string;
  margin: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;
const Char8Icon = styled(Char8)<{
  width: string;
  height: string;
  padding: string;
  margin: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;
const Char9Icon = styled(Char9)<{
  width: string;
  height: string;
  padding: string;
  margin: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;
const Char10Icon = styled(Char10)<{
  width: string;
  height: string;
  padding: string;
  margin: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;
const Char11Icon = styled(Char11)<{
  width: string;
  height: string;
  padding: string;
  margin: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;
