import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { ReactComponent as OptionIcon } from 'assets/icons/icon-option.svg';
import styled from 'styled-components';
import { White } from 'styles/color';
import { Heading } from 'styles/font';
import { useEffect, useState } from 'react';
import { getLettersNickname } from 'api/get';

export const LetterHeader = () => {
  const navigate = useNavigate();
  const { consultid } = useParams();
  const [name, setName] = useState('');
  useEffect(() => {
    const fetchNameData = async () => {
      const res: any = await getLettersNickname(consultid);
      if (res?.status === 200) {
        setName(res?.data);
      } else if (res?.status === 403) {
        alert('편지 참여자가 아닙니다.');
        navigate('/minder');
      } else if (res?.status === 404) {
        alert('존재하지 않는 편지입니다.');
        navigate('/minder');
      }
    };
    fetchNameData();
  }, []);
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
