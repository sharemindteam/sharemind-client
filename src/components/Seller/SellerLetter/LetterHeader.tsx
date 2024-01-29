import { useNavigate } from 'react-router-dom';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { ReactComponent as OptionIcon } from 'assets/icons/icon-option.svg';
import styled from 'styled-components';
import { White } from 'styles/color';
import { Heading } from 'styles/font';
import { isConsultModalOpenState } from 'utils/atom';
import { useSetRecoilState } from 'recoil';

export const LetterHeader = ({ name = '김고민' }) => {
  const navigate = useNavigate();

  return (
    <LetterHeaderWrapper>
      <LeftArrow
        onClick={() => {
          navigate('/minder/consult');
        }}
      />
      <Heading>{name}</Heading>
      <Option onClick={() => {}} />
    </LetterHeaderWrapper>
  );
};
const LetterHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 5.2rem;
  box-sizing: border-box;
  padding: 1.2rem 2rem;
  background-color: ${White};
  justify-content: space-between;
  position: sticky;
  border-bottom: 1px solid rgba(242, 241, 248, 0.95);
  top: 0;
`;

const LeftArrow = styled(LeftArrowIcon)`
  cursor: pointer;
`;
const Option = styled(OptionIcon)`
  cursor: pointer;
`;
