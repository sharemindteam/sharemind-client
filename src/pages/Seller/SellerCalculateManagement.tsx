import { ManagementHeader } from 'components/Seller/SellerCalculateManagement/ManagementHeader';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { ManagementStatusSelector } from 'components/Seller/SellerCalculateManagement/ManagementStatusSelector';
import { Heading, Subtitle } from 'styles/font';
import { Red } from 'styles/color';
import { SellerCalulateCard } from 'components/Seller/SellerCalculateManagement/SellerCalculateCard';
import { NoCalculationGraphic } from 'components/Seller/SellerCalculateManagement/NoCalculationGraphic';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isConsultModalOpenState, scrollLockState } from 'utils/atom';
import { SellerManagementModal } from 'components/Seller/SellerCalculateManagement/SellerManagementModal';
import { getPaymentsMinder } from 'api/get';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { BackDrop } from 'components/Common/BackDrop';

const STATUS_MAP = {
  '정산 중': 'SETTLEMENT_ONGOING',
  '정산 예정': 'SETTLEMENT_WAITING',
  완료: 'SETTLEMENT_COMPLETE',
};

const SORT_OPTIONS = ['WEEK', 'MONTH', 'ALL'];

interface ManageItem {
  paymentId: number;
  nickname: string;
  isChat: boolean;
  profit: number;
  cost: number;
  fee: number;
  consultedAt: string;
  settledAt: string;
  account: string;
}

type ManageList = ManageItem[];

export default function SellerCalculateManagement() {
  const navigate = useNavigate();

  const [manageStatus, setManageStatus] = useState<string>('완료');
  const [sortType, setSortType] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isConsultModalOpenState);
  const [isLastElem, setIsLastElem] = useState(false);
  const [managementList, setManagementList] = useState<ManageList>([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [isCompleteApplyManage, setIsCompleteApplyManage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastId, setLastId] = useState(0);

  const setScrollLock = useSetRecoilState(scrollLockState);
  const preventRef = useRef(true);

  // 스크롤 인터섹션 콜백
  const onIntersect: IntersectionObserverCallback = async (entry) => {
    if (entry[0].isIntersecting && !isLastElem && preventRef.current) {
      preventRef.current = false;
      await fetchManagements(lastId);
      preventRef.current = true;
    }
  };

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
    onIntersect,
  });

  const fetchManagements = async (lastId: number) => {
    const params = {
      status: STATUS_MAP[manageStatus as keyof typeof STATUS_MAP],
      sort: SORT_OPTIONS[sortType],
      paymentId: lastId,
    };

    try {
      const res: any = await getPaymentsMinder({ params });

      if (res.status === 200) {
        const responses = res.data.paymentGetCounselorResponses;
        const isInitialLoad = lastId === 0;
        setTotalMoney(res.data.total);
        if (responses.length) {
          setManagementList(
            isInitialLoad ? responses : [...managementList, ...responses],
          );
          setLastId(responses[responses.length - 1].paymentId);
          setIsLastElem(false);
        } else {
          setManagementList(
            isInitialLoad ? [] : [...managementList, ...responses],
          );
          setLastId(0);
          setIsLastElem(true);
        }
      } else {
        alert('판매 정보가 아직 등록되지 않았어요!');
        navigate('/minder');
      }
    } catch (err) {
      alert(err);
    } finally {
      if (lastId === 0) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchManagements(0);
  }, [sortType, manageStatus]);

  return (
    <>
      <ManagementHeader />
      <ManagementStatusSelector
        manageStatus={manageStatus}
        setManageStatus={setManageStatus}
        sortType={sortType}
      />

      {isLoading ? (
        <CenteredContainer>
          <LoadingSpinner />
        </CenteredContainer>
      ) : (
        <>
          <TotalEarnMoney>
            <Heading>
              {manageStatus === '완료'
                ? '완료 금액 합계'
                : manageStatus === '정산 중'
                ? '정산 중 금액 합계'
                : '정산예정 금액 합계'}
            </Heading>
            <Subtitle color={Red}>{totalMoney?.toLocaleString()} 원</Subtitle>
          </TotalEarnMoney>

          {managementList.length === 0 ? (
            <NoCalculationGraphic status={manageStatus} />
          ) : (
            <SellerCalculateCardList>
              {managementList.map((item) => (
                <SellerCalulateCard
                  key={item.paymentId}
                  manageStatus={manageStatus}
                  id={item.paymentId}
                  customerName={item.nickname}
                  calculateActivate={manageStatus === '정산 예정'}
                  consultType={item.isChat ? '채팅' : '편지'}
                  netProfit={item.profit}
                  commission={item.fee}
                  paymentAccount={item.account ?? '계좌 명시안됨'}
                  consultDate={item.consultedAt ?? '상담 일자 명시안됨'}
                  paymentDate={item.settledAt ?? '지급 일자 명시안됨'}
                  salePrice={item.cost}
                  isShowPopup={isCompleteApplyManage}
                  setIsShowPopup={setIsCompleteApplyManage}
                />
              ))}
              {!isLastElem && <IntersectionTarget ref={setTarget} />}
            </SellerCalculateCardList>
          )}
        </>
      )}

      {isModalOpen && (
        <>
          <BackDrop
            onClick={() => {
              setIsModalOpen(false);
              setScrollLock(false);
            }}
          />
          <SellerManagementModal
            sortType={sortType}
            setIsModalOpen={setIsModalOpen}
            setSortType={setSortType}
          />
        </>
      )}
    </>
  );
}

// 스타일 컴포넌트 정의
const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  height: 70vh;
`;

const TotalEarnMoney = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 1.2rem 2rem;
`;

const SellerCalculateCardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 1.4rem 0;
`;

const IntersectionTarget = styled.div`
  height: 3.5rem;
`;
