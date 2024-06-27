import styled from 'styled-components';
import { Body2, Heading } from 'styles/font';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import { Space } from './Space';

//
//
//

interface EmptySectionProps {
  title?: string;
  subtitle?: string;
}

//
//
//

const EmptySection = ({ title, subtitle }: EmptySectionProps) => {
  return (
    <EmptyWrapper>
      <EmptyIcon />
      {title ? <Heading>{title}</Heading> : null}
      <Space height="1.5rem" />
      {subtitle ? <Body2>{subtitle}</Body2> : null}
    </EmptyWrapper>
  );
};

//
//
//

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyIcon = styled(Empty)`
  margin-top: 20vh;
  padding: 4.5rem;
`;

export default EmptySection;
