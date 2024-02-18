import { QuitBody } from 'components/Buyer/BuyerQuit/QuitBody';
import { QuitFooter } from 'components/Buyer/BuyerQuit/QuitFooter';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';
import { Characters } from 'utils/Characters';
import { checkedNumberState } from 'utils/atom';

export const BuyerQuit = () => {
  const navigate = useNavigate();
  const [reasonSelected, setReasonSelected] = useState<boolean>(false);
  const [checkedNumber, setCheckedNumber] =
    useRecoilState<number>(checkedNumberState);
  useEffect(() => {
    return () => {
      setCheckedNumber(-1);
    };
  }, []);
  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/setting');
          }}
        />
        <Heading color={Grey1}>회원 탈퇴</Heading>
      </HeaderWrapper>
      <div className="body-wrapper">
        <QuitBody reasonSelected={reasonSelected} />
        <QuitFooter
          reasonSelected={reasonSelected}
          setReasonSelected={setReasonSelected}
        />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  height: 100%;
  .body-wrapper {
    height: calc(100% - 5.3rem);
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;
