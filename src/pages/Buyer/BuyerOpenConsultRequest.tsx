import { postOpenConsult } from 'api/post';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { Button } from 'components/Common/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey1, Grey2, Grey6, LightGreen } from 'styles/color';
import { Body2, Heading } from 'styles/font';

//
//
//

export const BuyerOpenConsultRequest = () => {
  const navigate = useNavigate();
  const [isOpenConsult, setIsOpenConsult] = useState<boolean>(false);
  const [isNotOpenConsult, setIsNotOpenConsult] = useState<boolean>(false);
  const [buttonAcitve, setButtonAcitve] = useState<boolean>(false);

  /**
   *
   */
  const handleNextClick = async () => {
    if (buttonAcitve) {
      if (isOpenConsult) {
        const body = {
          cost: 0,
          isPublic: true,
        };
        await postOpenConsult(body);
        navigate('/paymentFinish');
      } else {
        navigate('/openPaymentDetail');
      }
    }
  };

  useEffect(() => {
    if (!(isOpenConsult === false && isNotOpenConsult === false)) {
      setButtonAcitve(true);
    } else {
      setButtonAcitve(false);
    }
  }, [isOpenConsult, isNotOpenConsult]);

  //
  //
  //

  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/consult?type=open-consult');
          }}
        />
        <Heading color={Grey1}>일대다상담 신청하기</Heading>
      </HeaderWrapper>
      <div className="body-wrapper">
        <div className="content">
          <div className="headline">
            <Heading
              margin="
          2rem 0 2rem 0"
              color={Grey1}
            >
              상담 방식을 선택해주세요.
            </Heading>
          </div>

          <Box
            focus={isOpenConsult}
            onClick={() => {
              setIsOpenConsult(true);
              setIsNotOpenConsult(false);
            }}
          >
            <Heading color={'#40b29a'} margin="0 0 1.2rem 0">
              공개
            </Heading>
            <Body2 color={Grey2}>이건 무료에요.</Body2>
          </Box>
          <Box
            focus={isNotOpenConsult}
            onClick={() => {
              setIsOpenConsult(false);
              setIsNotOpenConsult(true);
            }}
          >
            <Heading color={'#40b29a'} margin="0 0 1.2rem 0">
              비공개
            </Heading>
            <Body2 color={Grey2}>
              이건 유료에요. 마인더들만 내 고민을 보고 답변할 수 있다. 다른
              셰어들은 못본다.
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
