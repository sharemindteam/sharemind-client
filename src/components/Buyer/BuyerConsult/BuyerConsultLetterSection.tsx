import styled from 'styled-components';

import { ConsultCard } from 'components/Buyer/Common/ConsultCard';
import { useLayoutEffect, useState } from 'react';
import { consultApiObject } from 'pages/Buyer/BuyerConsult';
import { getLettersCustomers } from 'api/get';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import { Heading } from 'styles/font';

interface BuyerConsultLetterSectionProps {
  sortType: number;
  isChecked: boolean;
}

export const BuyerConsultLetterSection = ({
  sortType,
  isChecked,
}: BuyerConsultLetterSectionProps) => {
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
      <>
        {cardData.length !== 0 ? (
          <BuyerConsultLetterSectionWrapper>
            {cardData.map((value) => {
              return (
                <ConsultCard
                  key={value.id}
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
          </BuyerConsultLetterSectionWrapper>
        ) : (
          <EmptyWrapper>
            <EmptyIcon />
            <Heading>아직 진행한 상담이 없어요</Heading>
          </EmptyWrapper>
        )}{' '}
      </>
    );
  }
};
const BuyerConsultLetterSectionWrapper = styled.section`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  padding: 1.2rem 0;
`;

const EmptyIcon = styled(Empty)`
  padding: 4.7rem 4.41rem 4.603rem 4.5rem;
`;
const EmptyWrapper = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
