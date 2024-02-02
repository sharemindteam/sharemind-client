import { ManagementHeader } from 'components/Seller/SellerCalculateManagement/ManagementHeader';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ManagementStatusSelector } from 'components/Seller/SellerCalculateManagement/ManagementStatusSelector';
import { Heading, Subtitle } from 'styles/font';
import { Green, Red } from 'styles/color';
import { SellerCalulateCard } from 'components/Seller/SellerCalculateManagement/SellerCalculateCard';
import { NoCalculationGraphic } from 'components/Seller/SellerCalculateManagement/NoCalculationGraphic';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isConsultModalOpenState, scrollLockState } from 'utils/atom';
import { SellerManagementModal } from 'components/Seller/SellerCalculateManagement/SellerManagementModal';
import { getPaymentsMinder } from 'api/get';
import { useNavigate } from 'react-router-dom';

const manageStatusMap = {
  '정산 중': 'SETTLEMENT_WAITING',
  '정산 예정': 'SETTLEMENT_ONGOING',
  완료: 'SETTLEMENT_COMPLETE',
};

const sortTypeMap = ['WEEK', 'MONTH', 'ALL'];
interface ManageItem {
  paymentId: string;
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
export const SellerCaculateManagement = () => {
  // 상단 탭의 상태
  const [manageStatus, setManageStatus] = useState<string>('완료');
  // 내역 없음 여부
  const [isNoCalculatoin, setIsNoCalculation] = useState<boolean>(false);
  // 드롭다운 메뉴, 최근 일주일 : 0 , 최근 1개월 : 1, 전체 : 2
  const [sortType, setSortType] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  );
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);

  const [managementList, setManagementList] = useState<ManageList>([]);
  const [toatlMoney, setTotalMoney] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchManagements = async () => {
      const params = {
        status: manageStatusMap[manageStatus],
        sort: sortTypeMap[sortType],
        paymentId: 0,
      };
      const res: any = await getPaymentsMinder({ params });
      if (res?.status === 200) {
        setManagementList(res?.data);
        let totalEarnMoney = 0;
        res?.data?.forEach((item: ManageItem) => {
          totalEarnMoney += Number(item?.profit);
        });
        setTotalMoney(totalEarnMoney);
      } else {
        alert('판매 정보가 아직 등록되지 않았어요!');
        navigate('/minder');
      }
    };
    fetchManagements();
  }, [manageStatus, sortType]);
  return (
    <>
      <ManagementHeader />
      <ManagementStatusSelector
        manageStatus={manageStatus}
        setManageStatus={setManageStatus}
        sortType={sortType}
      />
      <TotalEarnMoney>
        <Heading>
          {manageStatus === '완료'
            ? '완료 금액 합계'
            : manageStatus === '정산 중'
            ? '정산 중 금액 합계'
            : '정산예정 금액 합계'}
        </Heading>
        <Subtitle color={Red}>{toatlMoney.toLocaleString()} 원</Subtitle>
      </TotalEarnMoney>
      {/* 내역이 없을시 */}
      {managementList?.length === 0 ? (
        <NoCalculationGraphic status={manageStatus} />
      ) : (
        <SellerCalculateCardList>
          {/* //정산 예정일일 경우 calculateActivate false true로~*/}
          {managementList?.map((item) => (
            <SellerCalulateCard
              customerName={item?.nickname}
              calculateActivate={manageStatus === '정산 예정' ? true : false}
              consultType={item?.isChat ? '채팅' : '편지'}
              netProfit={item?.profit}
              commission={item?.fee}
              paymentAccount={item?.account ?? '계좌 명시안됨'}
              paymentDate={item?.approvedAt ?? '지급 일자 명시안됨'}
              salePrice={item?.cost}
            />
          ))}
        </SellerCalculateCardList>
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
  margin: 2.8rem 2rem 1.2rem;
`;

const SellerCalculateCardList = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.4rem 2rem;
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
