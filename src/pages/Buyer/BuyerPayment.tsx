import { getPaymentsCustomers } from 'api/get';
import { PaymentCard } from 'components/Buyer/BuyerPayment/PaymentCard';
import { PaymentModal } from 'components/Buyer/BuyerPayment/PaymentModal';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useDebounce } from 'hooks/useDebounce';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Green, Grey1, Grey5, White } from 'styles/color';
import { Button2, Heading } from 'styles/font';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { isPaymentModalOpenState, scrollLockState } from 'utils/atom';
import { PaymentInfo } from 'utils/type';
// TODO: 찜한 마인더 없을 시 페이지 추후 백 연동 시 구현
export const BuyerPayment = () => {
  const navigate = useNavigate();
  const [pageType, setPageType] = useState<number>(0);
  // Modal 여부(recoil)
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isPaymentModalOpenState,
  );
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
  //data
  const [paymentData, setPaymentData] = useState<PaymentInfo[]>([]);
  //clicked paymentId
  const [clickedPaymentId, setClickedPaymentId] = useState<number>(-1);
  //최초 로딩 여부
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLastElem, setIsLastElem] = useState<boolean>(false);
  const preventRef = useRef(true); // 중복 방지 옵션

  const fetchData = async (lastId: number) => {
    let statusString = '';
    if (pageType === 0) {
      statusString = 'PAYMENT_COMPLETE';
    } else if (pageType === 1) {
      statusString = 'REFUND_WAITING';
    } else if (pageType === 2) {
      statusString = 'REFUND_COMPLETE';
    }
    const params = {
      status: statusString,
      paymentId: lastId,
    };
    try {
      const res: any = await getPaymentsCustomers({ params });
      if (res.status === 200) {
        if (res.data.length !== 0) {
          if (lastId === 0) {
            setPaymentData(res.data);
          } else {
            const updatedPayments = [...paymentData, ...res.data];
            setPaymentData(updatedPayments);
          }
        } else {
          setIsLastElem(true);
        }
      } else if (res.response.status === 404) {
        alert('존재하지 않는 상태입니다.');
        navigate('/mypage');
      }
    } catch (e) {
      alert(e);
    } finally {
      if (lastId === 0) {
        setIsInitialLoading(false);
      }
    }
  };
  //useIntersection에서 unobserve되는지 확인
  const onIntersect: IntersectionObserverCallback = async (entry, observer) => {
    if (
      entry[0].isIntersecting &&
      !isLastElem &&
      !isInitialLoading &&
      preventRef.current
    ) {
      preventRef.current = false;
      await fetchData(paymentData[paymentData.length - 1].paymentId);
      preventRef.current = true;
    }
  };
  //현재 대상 및 option을 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
    onIntersect,
  });

  useLayoutEffect(() => {
    setIsLastElem(false);
    setIsInitialLoading(true);
    setPaymentData([]);
    fetchData(0);
  }, [pageType]);
  if (isInitialLoading) {
    return (
      <>
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate('/mypage');
            }}
          />
          <Heading color={Grey1}>결제 내역</Heading>
        </HeaderWrapper>
        <ToggleWrapper>
          <ToggleButton
            focus={pageType === 0}
            onClick={() => {
              setPageType(0);
            }}
          >
            <Button2 color={White}>결제완료</Button2>
          </ToggleButton>
          <ToggleButton
            focus={pageType === 1}
            onClick={() => {
              setPageType(1);
            }}
          >
            <Button2 color={White}>환불예정</Button2>
          </ToggleButton>
          <ToggleButton
            focus={pageType === 2}
            onClick={() => {
              setPageType(2);
            }}
          >
            <Button2 color={White}>환불완료</Button2>
          </ToggleButton>
        </ToggleWrapper>
      </>
    );
  } else {
    return (
      <>
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate('/mypage');
            }}
          />
          <Heading color={Grey1}>결제 내역</Heading>
        </HeaderWrapper>
        <ToggleWrapper>
          <ToggleButton
            focus={pageType === 0}
            onClick={() => {
              setPageType(0);
            }}
          >
            <Button2 color={White}>결제완료</Button2>
          </ToggleButton>
          <ToggleButton
            focus={pageType === 1}
            onClick={() => {
              setPageType(1);
            }}
          >
            <Button2 color={White}>환불예정</Button2>
          </ToggleButton>
          <ToggleButton
            focus={pageType === 2}
            onClick={() => {
              setPageType(2);
            }}
          >
            <Button2 color={White}>환불완료</Button2>
          </ToggleButton>
        </ToggleWrapper>
        <CardWrapper>
          {paymentData.map((value) => {
            return (
              <PaymentCard
                key={value.paymentId}
                paymentId={value.paymentId}
                nickname={value.nickname}
                consultType={value.consultType}
                consultState={value.status}
                price={value.cost}
                consultDate={value.consultedAt}
                payDate={value.paidAt}
                payment={value.method}
                isPayComplete={pageType === 0}
                setClickedPaymentId={setClickedPaymentId}
              />
            );
          })}
        </CardWrapper>
        {!isLastElem ? (
          <div
            ref={setTarget}
            style={{
              height: '3.2rem',
              width: '10rem',
            }}
          />
        ) : (
          <div
            style={{
              height: '3.2rem',
              width: '10rem',
            }}
          />
        )}
        {isModalOpen ? (
          <>
            <BackDrop
              onClick={() => {
                //여기서 api 호출
                setIsModalOpen(false);
                setScrollLock(false);
              }}
            />
            <PaymentModal
              clickedPaymentId={clickedPaymentId}
              paymentData={paymentData}
              setPaymentData={setPaymentData}
            />
          </>
        ) : null}
      </>
    );
  }
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1.2rem;
`;
const ToggleWrapper = styled.div`
  display: flex;
  margin: 0.8rem 2rem;
  gap: 0.8rem;
`;
const ToggleButton = styled.div<{ focus: boolean }>`
  width: 8.1rem;
  height: 3.4rem;
  border-radius: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.focus ? Green : Grey5)};
  cursor: pointer;
`;
const BackDrop = styled.div`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  position: fixed;
  top: 0;
  z-index: 2001;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
`;
