import { ManagementHeader } from 'components/Seller/SellerCalculateManagement/ManagementHeader';
import styled from 'styled-components';
import { useState } from 'react';
import { ManagementStatusSelector } from 'components/Seller/SellerCalculateManagement/ManagementStatusSelector';
import { Heading, Subtitle } from 'styles/font';
import { Green, Red } from 'styles/color';
import { SellerCalulateCard } from 'components/Seller/SellerCalculateManagement/SellerCalculateCard';
import { NoCalculationGraphic } from 'components/Seller/SellerCalculateManagement/NoCalculationGraphic';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isConsultModalOpenState, scrollLockState } from 'utils/atom';
import { SellerManagementModal } from 'components/Seller/SellerCalculateManagement/SellerManagementModal';

export const SellerCaculateManagement = () => {
  // 상단 탭의 상태
  const [manageStatus, setManageStatus] = useState<string>('완료');
  // 내역 없음 여부
  const [isNoCalculatoin, setIsNoCalculation] = useState<boolean>(true);
  // 드롭다운 메뉴, 최근 일주일 : 0 , 최근 1개월 : 1, 전체 : 2
  const [sortType, setSortType] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  );
  console.log(sortType);
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
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
            : '예정 금액 합계'}
        </Heading>
        <Subtitle color={Red}>100,000 원</Subtitle>
      </TotalEarnMoney>
      {/* 내역이 없을시 */}
      {isNoCalculatoin ? (
        <NoCalculationGraphic status={manageStatus} />
      ) : (
        <SellerCalculateCardList>
          {/* //정산 예정일일 경우 calculateActivate false true로~*/}
          <SellerCalulateCard
            customerName="정인영"
            calculateActivate={true}
            consultType="편지"
            netProfit={3000}
            commission={1000}
            paymentAccount="카카오뱅크 123-2342244"
            paymentDate="2024.01.05"
            salePrice={4000}
          />

          <SellerCalulateCard
            customerName="이규호"
            calculateActivate={false}
            consultType="채팅"
            netProfit={3000}
            commission={1000}
            paymentAccount="카카오뱅크 123-2342244"
            paymentDate="2024.01.05"
            salePrice={4000}
          />
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
