import styled from 'styled-components';
import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import { useNavigate } from 'react-router-dom';
import { Grey1, Grey4, White } from 'styles/color';
import Input from 'components/Common/Input';
import { ChangeEvent, useState } from 'react';
//
//
//
export const SearchHeader = () => {
  const navigate = useNavigate();
  //input value
  const [input, setInput] = useState('');
  //input onchagne
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search/result?keyword=${input}`);
  };
  return (
    <Wrapper>
      <BackIcon
        onClick={() => {
          navigate('/share');
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
          isBoxSizing={true}
          padding="0.8rem 3.4rem 0.8rem 1.6rem"
        />
        <SearchIcon onClick={handleSubmit} />
      </FormWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 5.2rem;
  gap: 0.8rem;
  background-color: ${White};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0.4rem 2rem;
`;
const BackIcon = styled(Back)`
  cursor: pointer;
`;
const FormWrapper = styled.form`
  position: relative;
  width: 100%;
`;
const SearchIcon = styled(Search)`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  cursor: pointer;
`;
