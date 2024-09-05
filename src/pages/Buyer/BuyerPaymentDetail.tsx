import { PaymentDetailInfo } from 'components/Buyer/BuyerPaymentDetail/PaymentDetailInfo';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { Button } from 'components/Common/Button';
import styled from 'styled-components';
import { Green, Grey1, Grey3, Grey6, White } from 'styles/color';
import { Body1, Body5, Body6, Heading } from 'styles/font';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCounselorConsults } from 'api/get';
import { postConsults } from 'api/post';
import { APP_WIDTH } from 'styles/AppStyle';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { requestPayment } from 'utils/requestPayment';
import { ConsultType } from 'utils/type';
import Input from 'components/Common/Input';
import { Flex } from 'components/Common/Flex';
import { Space } from 'components/Common/Space';

//
//
//

interface ConsultInfo {
  consultCategories: string[]; // 상담 카테고리 배열
  consultStyle: string; // 상담 스타일
  consultType: string; // 상담 타입
  cost: number; // 비용
  counselorId: number; // 상담사 ID
  level: number; // 상담사 레벨
  nickname: string; // 닉네임
  ratingAverage: number; // 평균 평점
  totalReview: number; // 총 리뷰 수
  totalConsult: number; // 총 상담 수
}

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

export const BuyerPaymentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const letterFocus: boolean = state?.letterFocus;

  // const [buttonSelect, setButtonSelect] = useState<number>(0);

  const [consultData, setConsultData] = useState<ConsultInfo>({
    consultCategories: [],
    consultStyle: '',
    consultType: '',
    cost: 0,
    counselorId: -1,
    level: 0,
    nickname: '',
    ratingAverage: 0,
    totalReview: 0,
    totalConsult: 0,
  });
  /**
   *
   */
  const handlePaymentClick = async () => {
    let consultType: ConsultType;
    if (letterFocus) {
      consultType = 'Letter';
    } else {
      consultType = 'Chat';
    }
    const body = {
      //나중에 recoil로 관리// persist
      counselorId: id,
      consultTypeName: consultType,
    };

    try {
      const res: any = await postConsults(body);
      if (res.status === 201) {
        requestPayment(consultData.cost, consultType);
        navigate('/paymentFinish');
      } else if (res.response.status === 400 || res.response.status === 404) {
        const errMessage = res.response.data.message.substring(
          0,
          res.response.data.message.indexOf('.') + 1,
        );
        alert(errMessage);
      }
    } catch (e) {
      alert(e);
    }
  };

  //
  //
  //
  useEffect(() => {
    if (letterFocus === undefined || letterFocus === null) {
      alert('잘못된 접근입니다');
      //나중에상담사 프로필로 navigate
      navigate(-1);
    }

    const fetchData = async () => {
      let consultType = '';

      if (letterFocus === true) {
        consultType = 'letter';
      } else {
        consultType = 'chat';
      }
      const params = {
        consultType: consultType,
      };
      // 나중에 counselor Id 로 변경
      const res: any = await getCounselorConsults(id, { params });
      if (res.status === 200) {
        setConsultData(res.data);
      } else if (res.response.status === 400) {
        alert('마인더가 해당 유형의 상담을 제공하지 않습니다.');
        navigate(-1);
      } else if (res.response.status === 404) {
        alert('존재하지 않는 유형의 상담입니다.');
        navigate(-1);
      }
    };

    fetchData();
  }, [id, letterFocus, navigate]);

  //
  //
  //

  return (
    <>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate(-1);
          }}
        />
        <Heading color={Grey1}>상담 신청하기</Heading>
      </HeaderWrapper>
      <Flex
        height="calc(var(--vh, 1vh) * 100 - 7.1rem)"
        direction="column"
        justify="flex-start"
      >
        {/* 상품 정보 Section */}
        <PaymentDetailInfo
          nickname={consultData.nickname}
          level={consultData.level}
          rating={consultData.ratingAverage}
          reviewNumber={consultData.totalReview}
          totalConsult={consultData.totalConsult}
          consultStyle={consultStyleToCharNum(consultData.consultStyle)}
        />
        {/* 상품 유형 Section */}
        <Box>
          <Flex
            width="100%"
            direction="column"
            gap={'0.8rem'}
            align="flex-start"
            padding="1.6rem 2.4rem"
          >
            <SectionTitle>
              <Body5 color={Grey3} padding="0.2rem 0">
                상담 유형
              </Body5>
            </SectionTitle>
            <SectionTitle>
              {letterFocus ? (
                <Body1 color={Grey1}>편지</Body1>
              ) : (
                <Body1 color={Grey1}>채팅</Body1>
              )}
            </SectionTitle>
          </Flex>
        </Box>
        {/* 상담 금액 Section */}
        <Box>
          <Flex
            width="100%"
            direction="column"
            gap={'0.8rem'}
            align="flex-start"
            padding="1.6rem 2.4rem"
          >
            <SectionTitle>
              <Body5 color={Grey3} padding="0.2rem 0">
                상담 금액
              </Body5>
            </SectionTitle>
            <Flex width="100%" justify="space-between">
              <Body6 color={Grey1} padding="1.2rem 0 0.8rem 0">
                상품 금액
              </Body6>
              <Body1 color={Grey1} padding="1.2rem 0 0.8rem 0">
                {consultData.cost.toLocaleString()}원
              </Body1>
            </Flex>
            <Flex width="100%" justify="space-between">
              <Body6 color={Grey1} padding="0 0 1.3rem 0">
                할인 금액
              </Body6>
              <Body1 color={Grey1} padding="1.2rem 0 0.8rem 0">
                0원
              </Body1>
            </Flex>
            <Line />
            <Flex width="100%" justify="space-between">
              <Body6 color={Green} padding="0.8rem 0 1.2rem 0">
                결제 금액
              </Body6>
              <Body1 color={Green} padding="1.2rem 0 0.8rem 0">
                {consultData.cost.toLocaleString()}원
              </Body1>
            </Flex>
          </Flex>
        </Box>
        {/* 전화번호 입력 Section */}
        <Box>
          <Flex
            width="100%"
            direction="column"
            gap={'1.2rem'}
            align="flex-start"
            padding="1.6rem 2.4rem"
          >
            <Body5 color={Grey3}>전화번호 입력</Body5>
            <ListItem>결제를 위해 전화번호를 입력해주세요.</ListItem>
            <Input
              width="100%"
              borderRadius="0.4rem"
              placeholder="-없이 입력"
              fontSize="1.3rem"
              padding="1.2rem"
              isBoxSizing={true}
              placeHolderWeight="500"
            />
          </Flex>
        </Box>
        {/* 이용 안내 Section */}
        <Box>
          <Flex
            width="100%"
            direction="column"
            gap={'1.2rem'}
            align="flex-start"
            padding="1.6rem 2.4rem"
          >
            <SectionTitle>
              <Body5 color={Grey3} padding="0.2rem 0">
                이용 안내
              </Body5>
            </SectionTitle>
            <Flex gap={'1.6rem'} direction="column" align="flex-start">
              {PAYMENT_SERVICE_INFO.map((info) => (
                <ListItem>{info}</ListItem>
              ))}
            </Flex>
            <Space height="10rem" />
          </Flex>
        </Box>
      </Flex>
      <ButtonWrapper>
        <Button
          text="결제 페이지로 이동"
          width="33.5rem"
          height="5.2rem"
          onClick={handlePaymentClick}
        />
      </ButtonWrapper>
    </>
  );
};

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

const SectionTitle = styled.label`
  align-self: flex-start;
`;

const ListItem = styled.li`
  list-style: inside;
  font-size: 1.4rem;
  font-weight: 400;
  font-style: normal;
  padding-left: 0.9rem;
  line-height: 155%;
  text-align: left;
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
