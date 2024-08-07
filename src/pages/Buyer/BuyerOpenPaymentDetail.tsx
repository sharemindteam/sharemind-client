import { Button } from 'components/Common/Button';
import styled from 'styled-components';
import { Green, Grey1, Grey3, Grey6, White } from 'styles/color';
import { Body1, Body3, Heading } from 'styles/font';
import { ReactComponent as Heart } from 'assets/icons/icon-payment-detail-heart.svg';
import { useNavigate } from 'react-router-dom';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { postOpenConsult } from 'api/post';
import { APP_WIDTH } from 'styles/AppStyle';

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

// TODO: 유입테스트를 위해 결제 방법 섹션 주석 처리
// const PAYMENT_METHOD = [
//   [
//     { buttonSelect: 1, text: '신용/체크카드' },
//     { buttonSelect: 2, text: '계좌이체' },
//   ],
//   [
//     { buttonSelect: 3, text: '카카오페이' },
//     { buttonSelect: 4, text: '토스페이' },
//   ],
//   [
//     { buttonSelect: 5, text: '네이버페이' },
//     { buttonSelect: 6, text: '휴대폰 결제' },
//   ],
// ];

//
//
//

export const BuyerOpenPaymentDetail = () => {
  const navigate = useNavigate();

  // const [buttonSelect, setButtonSelect] = useState<number>(0);

  /**
   *
   */
  const handlePaymentClick = async () => {
    const body = {
      cost: 1000,
      isPublic: false,
    };
    try {
      const res: any = await postOpenConsult(body);
      if (res.status === 201) {
        window.open(process.env.REACT_APP_ONE_TO_MANY_PAYMENT_URL);
        navigate('/paymentFinish');
      } else if (res?.response.status === 404) {
        alert('존재하지 않는 회원입니다.');
      }
    } catch (err) {
      alert(err);
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
            <Body1 color={Grey3} padding="0.2rem 0 1.2rem">
              상담 유형
            </Body1>

            <Body1>공개상담 - 비공개</Body1>
          </div>
        </Box>
        <Box>
          <div className="line-wrapper">
            <Body1 color={Grey3} padding="0.2rem 0">
              상담료
            </Body1>
          </div>
          <div className="price-line-wrapper">
            <Body1 color={Grey1} padding="1.2rem 0 0.8rem 0">
              상품 금액
            </Body1>
            <Body1 color={Grey1} padding="1.2rem 0 0.8rem 0">
              1,000원
            </Body1>
          </div>
          <div className="price-line-wrapper">
            <Body1 color={Grey1} padding="0 0 1.3rem 0">
              할인 금액
            </Body1>
            <Body1 color={Grey1} padding="1.2rem 0 0.8rem 0">
              0원
            </Body1>
          </div>
          <Line />
          <div className="price-line-wrapper">
            <Body1 color={Green} padding="0.8rem 0 1.2rem 0">
              결제 금액
            </Body1>
            <Body1 color={Green} padding="1.2rem 0 0.8rem 0">
              1,000원
            </Body1>
          </div>
        </Box>
        {/* TODO: 유입테스트를 위해 결제 방법 섹션 주석 처리 */}
        {/* <Box>
          <div className="line-wrapper">
            <Body1 color={Grey3} padding="0.2rem 0">
              결제 방법
            </Body1>
          </div>
          <div className="button-wrapper">
            {PAYMENT_METHOD.map((methods) => (
              <div className="button-row">
                {methods.map((method) =>
                  buttonSelect === method.buttonSelect ? (
                    <Button text={method.text} height="5.2rem" width="16rem" />
                  ) : (
                    <Button
                      text={method.text}
                      height="5.2rem"
                      width="16rem"
                      color={Green}
                      backgroundColor={LightGreen}
                      onClick={() => {
                        setButtonSelect(method.buttonSelect);
                      }}
                    />
                  ),
                )}
              </div>
            ))}
          </div>
        </Box> */}
        <Box>
          <div className="line-wrapper">
            <Body1 color={Grey3} padding="0.2rem 0">
              이용 안내
            </Body1>
          </div>
          <div className="service-info-wrapper">
            {PAYMENT_SERVICE_INFO.map((info) => (
              <div key={info} className="service-info-line-wrapper">
                <Heart />
                <div className="text-wrapper">
                  <Body3 color={Grey3}>{info}</Body3>
                </div>
              </div>
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
  .service-info-line-wrapper {
    display: flex;
    gap: 0.4rem;
    width: 33.5rem;
  }
  .text-wrapper {
    width: 31.1rem;
  }
`;
const Box = styled.div`
  width: 100%;
  padding: 0.8rem 0;
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
