import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { Button } from 'components/Common/Button';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey1, Grey2, Grey6, LightGreen } from 'styles/color';
import { Body2, Heading } from 'styles/font';

//
//
//

export const BuyerConsultRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { consultTypes } = location.state;

  const isLetterEnabled = consultTypes.includes('편지');
  const isChatEnabled = consultTypes.includes('채팅');

  const [letterFocus, setLetterFocus] = useState<boolean>(false);
  const [chatFocus, setChatFocus] = useState<boolean>(false);
  const [buttonAcitve, setButtonAcitve] = useState<boolean>(false);

  const { counselorId } = useParams();

  /**
   *
   */
  const handleNextClick = () => {
    navigate(`/paymentDetail/${counselorId}`, { state: { letterFocus } });
  };

  //
  //
  //
  useEffect(() => {
    if (!(letterFocus === false && chatFocus === false)) {
      setButtonAcitve(true);
    } else {
      setButtonAcitve(false);
    }
  }, [letterFocus, chatFocus]);

  //
  //
  //

  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate(-1);
          }}
        />
        <Heading color={Grey1}>상담 신청하기</Heading>
      </HeaderWrapper>
      <div className="body-wrapper">
        <div className="content">
          <div className="headline">
            <Heading
              margin="
          2.4rem 0 2.4rem 0"
              color={Grey1}
            >
              상담 유형을 선택해주세요.
            </Heading>
          </div>
          {isLetterEnabled ? (
            <Box
              focus={letterFocus}
              onClick={() => {
                setLetterFocus(true);
                setChatFocus(false);
              }}
            >
              <Heading color={'#40b29a'} margin="0 0 1.2rem 0">
                편지
              </Heading>
              <Body2 color={Grey2}>
                원하는 시간에 고민 글을 작성하고, 24시간 내 마인더로부터 답장을
                받아요. 추가 질문과 답장을 1회씩 더 주고받을 수 있어요.
              </Body2>
            </Box>
          ) : null}
          {isChatEnabled ? (
            <Box
              focus={chatFocus}
              onClick={() => {
                setLetterFocus(false);
                setChatFocus(true);
              }}
            >
              <Heading color={'#40b29a'} margin="0 0 1.2rem 0">
                채팅
              </Heading>
              <Body2 color={Grey2}>
                마인더가 상담이 가능한 시간에 30분 간 실시간으로 대화해요.
              </Body2>
            </Box>
          ) : null}
        </div>
        <Button
          isActive={buttonAcitve}
          text="다음"
          width="89.33%"
          height="5.2rem"
          onClick={handleNextClick}
        />
      </div>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  .headline {
    width: 89.33%;
  }
  .body-wrapper {
    height: calc(var(--vh, 1vh) * 100 - 7.1rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Box = styled.div<{ focus: boolean }>`
  padding: 2rem;
  width: 89.33%;
  margin-bottom: 1.2rem;
  background-color: ${(props) => (props.focus ? LightGreen : Grey6)};
  border: ${(props) =>
    props.focus ? `1px solid ${Green}` : `1px solid ${Grey6}`};
  border-radius: 1.2rem;
  box-sizing: border-box;
  cursor: pointer;
  word-break: keep-all;
`;
