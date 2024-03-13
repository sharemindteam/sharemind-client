import styled from 'styled-components';

import { ConsultCard } from 'components/Buyer/Common/ConsultCard';
import { useLayoutEffect, useState } from 'react';
import { consultApiObject } from 'pages/Buyer/BuyerConsult';
import { getLettersCustomers } from 'api/get';
import { LoadingSpinner } from 'utils/LoadingSpinner';
interface BuyerLetterSectionProps {
  sortType: number;
  isChecked: boolean;
}

export const BuyerLetterSection = ({
  sortType,
  isChecked,
}: BuyerLetterSectionProps) => {
  const [cardData, setCardData] = useState<consultApiObject[]>([]); //card에 넘길 데이터

  const [isLoading, setIsLoading] = useState<boolean>(true);
  useLayoutEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let sortTypeText: string;
        if (sortType === 0) {
          sortTypeText = 'latest';
        } else {
          sortTypeText = 'unread';
        }
        const params = {
          filter: isChecked,
          sortType: sortTypeText,
        };
        const res: any = await getLettersCustomers({ params });
        if (res.status === 200) {
          setCardData(res.data);
        } else if (res.response.status === 404) {
          alert('존재하지 않는 정렬 방식입니다.');
        }
      } catch (e) {
        alert(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [sortType, isChecked, setIsLoading]);
  if (isLoading) {
    return (
      <>
        <div
          style={{
            height: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner />
        </div>
      </>
    );
  } else {
    return (
      <BuyerLetterSectionWrapper>
        {cardData.map((value) => {
          return (
            <ConsultCard
              consultStyle={value.consultStyle}
              id={value.id}
              latestMessageContent={value.latestMessageContent}
              latestMessageIsCustomer={value.latestMessageIsCustomer}
              latestMessageUpdatedAt={value.latestMessageUpdatedAt}
              opponentNickname={value.opponentNickname}
              status={value.status}
              unreadMessageCount={value.unreadMessageCount}
              reviewCompleted={value.reviewCompleted}
              consultId={value.consultId}
              isLetter={true}
            />
          );
        })}
      </BuyerLetterSectionWrapper>
    );
  }
};
const BuyerLetterSectionWrapper = styled.section`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  padding: 1.2rem 0;
`;
