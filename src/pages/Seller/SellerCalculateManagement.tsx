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

//
//
//

const manageStatusMap = {
  '정산 중': 'SETTLEMENT_ONGOING',
  '정산 예정': 'SETTLEMENT_WAITING',
  완료: 'SETTLEMENT_COMPLETE',
};

const sortTypeMap = ['WEEK', 'MONTH', 'ALL'];

//
//
//

interface ManageItem {
  paymentId: number;
  nickname: string;
  isChat: boolean;
  profit: number;
  cost: number;
  fee: number;
  approvedAt: null;
  account: null;
  total: number;
}

type ManageList = ManageItem[];

//
//
//

export const SellerCaculateManagement = () => {
  const navigate = useNavigate();

  // 상단 탭의 상태
  const [manageStatus, setManageStatus] = useState<string>('완료');

  // 드롭다운 메뉴, 최근 일주일 : 0 , 최근 1개월 : 1, 전체 : 2
  const [sortType, setSortType] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  );
  const [isLastElem, setIsLastElem] = useState<boolean>(false);
  const [managementList, setManagementList] = useState<ManageList>([]);
  const [toatlMoney, setTotalMoney] = useState<number>(0);
  const [isCompleteApplyManage, setIsCompleteApplyManage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);

  const preventRef = useRef(true);

  const onIntersect: IntersectionObserverCallback = async (entry) => {
    if (entry[0].isIntersecting && !isLastElem && preventRef.current) {
      preventRef.current = false;
      await fetchManagements(
        managementList[managementList.length - 1].paymentId,
      );
      preventRef.current = true;
    }
  };

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
    onIntersect,
  });

  /**
   *
   */
  const fetchManagements = async (lastId: number) => {
    const params = {
      status: manageStatusMap[manageStatus as keyof typeof manageStatusMap],
      sort: sortTypeMap[sortType],
      paymentId: lastId,
    };
    const res: any = await getPaymentsMinder({ params });
    try {
      if (res?.status === 200) {
        if (res.data.length !== 0) {
          if (lastId === 0) {
            setManagementList(res.data);
            let totalEarnMoney = 0;
            res?.data?.forEach((item: ManageItem) => {
              totalEarnMoney += Number(item?.profit);
            });
            setTotalMoney(totalEarnMoney);
          } else {
            const updatedManages = [...managementList, ...res.data];
            setManagementList(updatedManages);
            let totalEarnMoney = 0;
            res?.data?.forEach((item: ManageItem) => {
              totalEarnMoney += Number(item?.profit);
            });
            setTotalMoney(totalEarnMoney);
          }
        } else {
          setManagementList(res.data);
          setIsLastElem(true);
          let totalEarnMoney = 0;
          res?.data?.forEach((item: ManageItem) => {
            totalEarnMoney += Number(item?.profit);
          });
          setTotalMoney(totalEarnMoney);
        }
      } else {
        alert('판매 정보가 아직 등록되지 않았어요!');
        navigate('/minder');
      }
    } catch (err) {
      alert(err);
    } finally {
      if (lastId === 0) {
        setIsLoading(false);
      }
    }
  };

  //
  //
  //
  useEffect(() => {
    fetchManagements(0);
  }, [manageStatus, sortType, isCompleteApplyManage, navigate]);

  //
  //
  //

  return (
    <>
      <ManagementHeader />
      <ManagementStatusSelector
        manageStatus={manageStatus}
        setManageStatus={setManageStatus}
        sortType={sortType}
      />
      {isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
          <LoadingSpinner />
        </div>
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
            <Subtitle color={Red}>{toatlMoney?.toLocaleString()} 원</Subtitle>
          </TotalEarnMoney>
          {/* 내역이 없을시 */}
          {managementList?.length === 0 ? (
            <NoCalculationGraphic status={manageStatus} />
          ) : (
            <>
              <SellerCalculateCardList>
                {/* //정산 예정일일 경우 calculateActivate false true로~*/}
                {managementList?.map((item) => (
                  <SellerCalulateCard
                    key={item?.paymentId}
                    id={item?.paymentId}
                    customerName={item?.nickname}
                    calculateActivate={
                      manageStatus === '정산 예정' ? true : false
                    }
                    consultType={item?.isChat ? '채팅' : '편지'}
                    netProfit={item?.profit}
                    commission={item?.fee}
                    paymentAccount={item?.account ?? '계좌 명시안됨'}
                    paymentDate={item?.approvedAt ?? '지급 일자 명시안됨'}
                    salePrice={item?.cost}
                    isShowPopup={isCompleteApplyManage}
                    setIsShowPopup={setIsCompleteApplyManage}
                  />
                ))}
              </SellerCalculateCardList>
              {!isLastElem ? (
                <div ref={setTarget} style={{ height: '3.5rem' }} />
              ) : (
                <div style={{ height: '3.5rem' }} />
              )}
            </>
          )}
        </>
      )}

      {isModalOpen ? (
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
      ) : null}
    </>
  );
};

const TotalEarnMoney = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 1.2rem 2rem 1.2rem;
`;

const SellerCalculateCardList = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.4rem 0rem;
  align-items: center;
  flex-direction: column;
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
