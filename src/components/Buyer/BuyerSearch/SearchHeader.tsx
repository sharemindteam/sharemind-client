import styled from 'styled-components';
import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import { useNavigate } from 'react-router-dom';
import { Grey1, Grey4, White } from 'styles/color';
import Input from 'components/Common/Input';
import { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { searchKeywordState } from 'utils/atom';
export const SearchHeader = () => {
  const navigate = useNavigate();
  const setKeyword = useSetRecoilState(searchKeywordState);
  //input value
  const [input, setInput] = useState('');
  //input onchagne
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyword(input);
    navigate('/buyer/search/result');
  };
  return (
    <Wrapper>
      <BackIcon
        onClick={() => {
          navigate(-1);
        }}
      />
      <FormWrapper onSubmit={handleSubmit}>
        <Input
          value={input}
          onChange={handleOnChange}
          placeholder="상담사명, 제목, 키워드"
          fontSize="1.6rem"
          fontWeight="400"
          fontColor={Grey1}
          placeHolderColor={Grey4}
          height="4.4rem"
          width="100%"
          padding="0 3.2rem 0 0"
        />
        <SearchIcon onClick={handleSubmit} />
      </FormWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 5.2rem;
  background-color: ${White};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 2rem;
`;
const BackIcon = styled(Back)`
  position: absolute;
  top: 1.4rem;
  left: 2rem;
  cursor: pointer;
`;
const FormWrapper = styled.form`
  position: relative;
  width: 79%;
`;
const SearchIcon = styled(Search)`
  position: absolute;
  right: -2.7rem;
  top: 0.8rem;
  cursor: pointer;
`;
