import { Button } from 'components/Common/Button';
import styled from 'styled-components';
import { Black, Green, Grey1, Grey3, Grey6, White } from 'styles/color';
import { Body1, Body5, Body6, Heading } from 'styles/font';

import { useNavigate } from 'react-router-dom';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { postOpenConsult } from 'api/post';
import { APP_WIDTH } from 'styles/AppStyle';
import { Flex } from 'components/Common/Flex';
import Input from 'components/Common/Input';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { SharemindErrorResponse } from 'utils/type';

//
//
//

const PAYMENT_SERVICE_INFO = [
  '결제 페이지 이동을 누르면 결제 전용 링크로 연결됩니다.',
  '상담 시작 전 구매자 혹은 판매자 요청에 의해 상담이 취소될 수 있으며 이 경우 결제금액은 환불신청을 해 주시면 환불 처리해 드립니다.',
  '판매자의 응답 시간 경과로 상담이 취소될 경우 환불신청을 해주시면 환불 처리해 드립니다.',
  '상담이 시작되면 취소 및 환불이 제한됩니다. 이미 시작된 상담의 환불처리의 경우 신고하기를 통해 분쟁접수를 해주시기 바랍니다.',
  '상담을 마치고 24시간 이내 판매자가 상담완료를 누르지 않으면 거래가 자동 완료됩니다.',
  '상담 완료 후 7일간 거래 확정을 하지 않으면 자동 거래 확정됩니다.',
];

//
//
//

export const BuyerOpenPaymentDetail = () => {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState<string>('');

  /**
   *
   */
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    inputValue = inputValue.replace(/\D/g, '');

    if (inputValue.length <= 3) {
      setPhoneNumber(inputValue);
    } else if (inputValue.length <= 7) {
      setPhoneNumber(inputValue.slice(0, 3) + '-' + inputValue.slice(3));
    } else if (inputValue.length <= 11) {
      setPhoneNumber(
        inputValue.slice(0, 3) +
          '-' +
          inputValue.slice(3, 7) +
          '-' +
          inputValue.slice(7, 11),
      );
    }
  };

  /**
   *
   */
  const handlePaymentClick = async () => {
    const body = {
      cost: 1000,
      isPublic: false,
      phoneNumber: phoneNumber,
    };
    try {
      const res: any = await postOpenConsult(body);
      if (res.status === 201) {
        window.location.href = res.data;
      }
    } catch (e) {
      const error = e as AxiosError;

      const _error = error.response?.data as SharemindErrorResponse;

      if (error.response?.status === 400) {
        alert(_error.message);
      } else if (error.response?.status === 404) {
        const errorMessage = _error.message;
        const index = errorMessage.indexOf(':');
        if (index !== -1) {
          const alertPart = errorMessage.slice(0, index);
          alert(alertPart);
        } else {
          alert(errorMessage);
        }
      } else {
        alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  //
  //
  //

  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/openConsultRequest');
          }}
        />
        <Heading color={Grey1}>상담 신청하기</Heading>
      </HeaderWrapper>
      <div className="body-wrapper">
        <Box>
          <div className="line-wrapper">
            <Body5 color={Grey3} padding="0.2rem 0 1.2rem">
              상담 유형
            </Body5>

            <Body1 color={Grey1}>공개상담 - 비공개</Body1>
          </div>
        </Box>
        <Box>
          <div className="line-wrapper">
            <Body5 color={Grey3} padding="0.2rem 0">
              상담 금액
            </Body5>
          </div>
          <div className="price-line-wrapper">
            <Body6 color={Grey1} padding="1.2rem 0 0.8rem 0">
              상품 금액
            </Body6>
            <Body1 color={Grey1} padding="1.2rem 0 0.8rem 0">
              1,000원
            </Body1>
          </div>
          <div className="price-line-wrapper">
            <Body6 color={Grey1} padding="0 0 1.3rem 0">
              할인 금액
            </Body6>
            <Body1 color={Grey1} padding="1.2rem 0 0.8rem 0">
              0원
            </Body1>
          </div>
          <Line />
          <div className="price-line-wrapper">
            <Body6 color={Green} padding="0.8rem 0 1.2rem 0">
              결제 금액
            </Body6>
            <Body1 color={Green} padding="1.2rem 0 0.8rem 0">
              1,000원
            </Body1>
          </div>
        </Box>
        <Box>
          <Flex
            width="33.5rem"
            direction="column"
            gap={'1.2rem'}
            align="flex-start"
          >
            <Body5 color={Grey3}>전화번호 입력</Body5>
            <ListItem content="결제를 위해 전화번호를 입력해주세요." />
            <Input
              width="100%"
              borderRadius="0.4rem"
              placeholder="-없이 입력"
              fontSize="1.3rem"
              padding="1.2rem"
              isBoxSizing={true}
              placeHolderWeight="500"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </Flex>
        </Box>
        <Box>
          <div className="line-wrapper">
            <Body5 color={Grey3} padding="0.2rem 0">
              이용 안내
            </Body5>
          </div>
          <div className="service-info-wrapper">
            {PAYMENT_SERVICE_INFO.map((info) => (
              <ListItem key={info} content={info} />
            ))}
          </div>
        </Box>
      </div>
      <ButtonWrapper>
        <Button
          text="결제하기"
          width="100%"
          height="5.2rem"
          onClick={handlePaymentClick}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

const ListItem = ({ content }: { content: string }) => {
  return (
    <ListItemContent>
      <ListBullet />
      <span>{content}</span>
    </ListItemContent>
  );
};

//
//
//

const Wrapper = styled.div`
  .body-wrapper {
    height: calc(var(--vh, 1vh) * 100 - 7.1rem);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .line-wrapper {
    width: 33.5rem;
  }
  .price-line-wrapper {
    width: 33.5rem;
    display: flex;
    justify-content: space-between;
  }
  .button-wrapper {
    margin: 0.8rem 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .button-row {
    display: flex;
    gap: 1.2rem;
  }
  .service-info-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-top: 0.8rem;
    margin-bottom: 1.6rem;
  }
`;
const Box = styled.div`
  width: 100%;
  padding: 1.6rem 2.4rem;
  background-color: ${White};
  margin-bottom: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Line = styled.div`
  width: 33.5rem;
  height: 0.1rem;
  background-color: ${Grey6};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }
  background-color: ${White};
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding: 0.8rem 2rem;
  box-sizing: border-box;
`;

const ListItemContent = styled.div`
  list-style: inside;
  font-size: 1.4rem;
  font-weight: 400;
  font-style: normal;
  padding-left: 0.8rem;
  line-height: 155%;
  text-align: left;

  width: 33.5rem;

  display: flex;
  gap: 0.8rem;
`;

const ListBullet = styled.div`
  flex-shrink: 0;

  width: 0.4rem;
  height: 0.4rem;
  margin-top: 1rem;
  border-radius: 100%;
  background-color: ${Black};
  box-sizing: border-box;
`;
