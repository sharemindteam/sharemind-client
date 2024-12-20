import { Button } from 'components/Common/Button';
import { Space } from 'components/Common/Space';
import { ManageList } from 'pages/Seller/SellerCalculateManagement';
import React from 'react';
import styled from 'styled-components';
import { Grey4 } from 'styles/color';
import { Body1, Body3 } from 'styles/font';

//
//
//

interface CompleteApplyPopupProps {
  name: string;
  date: string;
  consultType: string;
  setIsCompleteApplyManage: React.Dispatch<React.SetStateAction<boolean>>;
  setManagementList: React.Dispatch<React.SetStateAction<ManageList>>;

  id: number;
}

//
//
//

function CompleteApplyPopup({
  name,
  date,
  consultType,
  setIsCompleteApplyManage,
  setManagementList,
  id,
}: CompleteApplyPopupProps) {
  return (
    <CompleteApplyPopupBox>
      <Body1>정산 신청이 완료되었어요!</Body1>
      <Body3 color={Grey4}>
        {name}과의 {consultType} 상담 {date}
      </Body3>
      <Space height="2rem" />
      <Button
        text="닫기"
        height="5.2rem"
        width="calc(100% - 3.2rem)"
        onClick={() => {
          setIsCompleteApplyManage(false);
          setManagementList((prev: ManageList) =>
            prev.filter((item) => item.paymentId !== id),
          );
        }}
      />
    </CompleteApplyPopupBox>
  );
}
const CompleteApplyPopupBox = styled.div`
  height: 15rem;
  z-index: 9999;
  @media (max-width: 768px) {
    width: calc(100% - 3.2rem);
  }
  @media (min-width: 768px) {
    width: 34.5rem;
  }
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: white;
  top: 36vh;
`;

export default CompleteApplyPopup;
