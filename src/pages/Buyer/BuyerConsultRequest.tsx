import { postConsults } from 'api/post';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { Button } from 'components/Common/Button';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey1, Grey2, Grey6, LightGreen } from 'styles/color';
import { Body2, Heading } from 'styles/font';
interface ConsultDataType {
  consultId: number;
  nickname: string;
  level: number;
  ratingAverage: number;
  totalReview: number;
  consultCategories: string[];
  consultStyle: string;
  consultType: string;
  cost: number;
}
export const BuyerConsultRequest = () => {
  const navigate = useNavigate();
  const [letterFocus, setLetterFocus] = useState<boolean>(false);
  const [chatFocus, setChatFocus] = useState<boolean>(false);
  const [buttonAcitve, setButtonAcitve] = useState<boolean>(false);
  const location = useLocation();
  const { state } = location;
  const counselorId: boolean = state?.counselorId;
  const handleNextClick = () => {
    navigate(`/buyer/paymentDetail/${counselorId}`, { state: { letterFocus } });
    // let consultType = '';
    // if (letterFocus) {
    //   consultType = 'Letter';
    // } else {
    //   consultType = 'Chat';
    // }
    // const body = {
    //   counselorId: 1,
    //   consultTypeName: consultType,
    // };
    // try {
    //   const res: any = await postConsults(body);

    //   if (res.status === 201) {
    //     const consultData: ConsultDataType = {
    //       consultId: res.data.consultId,
    //       nickname: res.data.nickname,
    //       level: res.data.level,
    //       ratingAverage: res.data.ratingAverage,
    //       totalReview: res.data.totalReview,
    //       consultCategories: res.data.consultCategories,
    //       consultStyle: res.data.consultStyle,
    //       consultType: res.data.consultType,
    //       cost: res.data.cost,
    //     };
    //     navigate('/buyer/paymentDetail', { state: { consultData } });
    //   } else if (res.response.status === 404) {
    //     alert('상담 유형이 존재하지 않습니다.');
    //   }
    // } catch (e) {
    //   alert(e);
    // }
  };
  useEffect(() => {
    if (!(letterFocus === false && chatFocus === false)) {
      setButtonAcitve(true);
    } else {
      setButtonAcitve(false);
    }
  }, [letterFocus, chatFocus]);
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
          2rem 0 2rem 0"
              color={Grey1}
            >
              상담 유형을 선택해주세요.
            </Heading>
          </div>

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
              원하는 시간에 고민 글을 작성하고, 24시간 이내에 마인더로부터
              답장을 받아요. 추가 질문과 답장을 1회씩 더 주고받을 수 있어요.
            </Body2>
          </Box>
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
  padding: 1.6rem;
  width: 89.33%;
  background-color: ${(props) => (props.focus ? LightGreen : Grey6)};
  border: ${(props) =>
    props.focus ? `1px solid ${Green}` : `1px solid ${Grey6}`};
  border-radius: 1.2rem;
  box-sizing: border-box;
  margin-bottom: 1.2rem;
  cursor: pointer;
`;
