import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Green, Grey1, Grey2, Grey3, Grey6 } from 'styles/color';
import { Body1, Body3, Body4, Caption1, Caption2, Heading } from 'styles/font';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import {
  isBuyPopupOpenState,
  isConsultModalOpenState,
  scrollLockState,
} from 'utils/atom';
import { ReactComponent as LockIcon } from 'assets/icons/icon-lock.svg';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
import { ReactComponent as HeartEmptyIcon } from 'assets/icons/icon-heart3.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/icon-save2.svg';
import { ReactComponent as SaveEmptyIcon } from 'assets/icons/icon-save3.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/icon-comment.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-check2.svg';
import { ReactComponent as WriteIcon } from 'assets/icons/icon-write.svg';
import { Space } from 'components/Common/Space';
import { BackDrop } from 'components/Common/BackDrop';
import IsBuyPopup from './IsBuyPopup';
import { Button } from 'components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import { BottomButton } from 'components/Seller/Common/BottomButton';
import { openConsultApiObject } from 'pages/Buyer/BuyerConsult';
import { getCustomerOpenConsultList } from 'api/get';
interface BuyerOpenConsultSectionProps {
  isChecked: boolean;
}
function BuyerOpenConsultSection({ isChecked }: BuyerOpenConsultSectionProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  );
  const setScrollLock = useSetRecoilState(scrollLockState);
  const [isBuyPopupOpen, setIsBuyPopupOpen] =
    useRecoilState(isBuyPopupOpenState);
  const handleWritePostButton = () => {
    setIsBuyPopupOpen(true);
  };
  const [cardData, setCardData] = useState<openConsultApiObject[]>([]);
  useEffect(() => {
    const fetchOpenConsult = async () => {
      setIsLoading(true);
      try {
        const params = {
          filter: isChecked,
          postId: 0,
        };
        const res: any = await getCustomerOpenConsultList({ params });
        if (res.status === 200) {
          setCardData(res.data);
        } else if (res.response.status === 404) {
          alert('존재하지 않는 회원입니다.');
        }
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOpenConsult();
  }, [isChecked]);
  return (
    <>
      {isLoading ? (
        <div
          style={{
            height: 'calc(100vh - 46rem)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <BuyerOpenConsultCardList>
          {/* 상담카드 부분 */}
          {cardData.length === 0 ? (
            <EmptyWrapper>
              <EmptyIcon />
              <Heading>아직 진행한 상담이 없어요</Heading>
            </EmptyWrapper>
          ) : (
            cardData?.map((item) => {
              if (item.title === null) {
                return (
                  <BuyerPendingOpenConsultCard>
                    <Body1>상담 글을 작성해주세요!</Body1>
                    <Body3>
                      결제 후 작성 전 <br />
                      공개상담 글을 작성해보세요~
                    </Body3>
                    <Button
                      text="상담 글 작성하기"
                      width="100%"
                      height="4rem"
                      onClick={() => {
                        navigate(`/writeOpenConsult/${item.postId}`);
                      }}
                    ></Button>
                  </BuyerPendingOpenConsultCard>
                );
              } else {
                return (
                  <BuyerOpenConsultCard
                    onClick={() => {
                      navigate(`/open-consult/${item.postId}`);
                    }}
                  >
                    <div className="row1">
                      <Body1>{item?.title}</Body1>
                      {!item?.isPublic && (
                        <PrivateSign>
                          <LockIcon />
                          <Caption1 color={Grey3}>비공개</Caption1>
                        </PrivateSign>
                      )}
                    </div>
                    <Space height="1.2rem" />
                    <div className="row2">{item?.content}</div>
                    <div className="row3">
                      <IconItem>
                        <HeartResizeIcon />
                        <Caption1 color={Grey2}>{item?.totalLike}</Caption1>
                      </IconItem>
                      <IconItem>
                        <SaveIcon />
                        <Caption1 color={Grey2}>{item?.totalScrap}</Caption1>
                      </IconItem>
                      <IconItem>
                        <CommentIcon />
                        <Caption1 color={Grey2}>{item?.totalComment}</Caption1>
                      </IconItem>
                    </div>
                    <TimeLeft>{item?.updatedAt}</TimeLeft>
                  </BuyerOpenConsultCard>
                );
              }
            })
          )}
          {/* 상담카드 부분 */}
        </BuyerOpenConsultCardList>
      )}{' '}
      {isBuyPopupOpen && (
        <>
          <BackDrop />
          <IsBuyPopup />
        </>
      )}
      <CreateConsultButtonWrapper>
        <Button
          text="공개상담 신청하기"
          width="100%"
          height="5.2rem"
          onClick={() => {
            navigate('/openConsultRequest');
          }}
        />
      </CreateConsultButtonWrapper>
    </>
  );
}

const BuyerOpenConsultCardList = styled.div`
  display: flex;
  margin: 1.2rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
`;

const BuyerPendingOpenConsultCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1.6rem;
  gap: 0.8rem;
  position: relative;
  background-color: ${Grey6};
  border-radius: 1.2rem;
`;

const BuyerOpenConsultCard = styled.div`
  width: 100%;
  cursor: pointer;
  height: 14rem;
  position: relative;
  background-color: ${Grey6};
  padding: 1.6rem;
  box-sizing: border-box;
  border-radius: 1.2rem;
  .row1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    max-height: 5rem;
    overflow: hidden;
  }
  .row2 {
    display: -webkit-box;
    max-height: 4.7rem;
    -webkit-box-orient: vertical;
    overflow: hidden;
    align-self: flex-end;
    margin-bottom: 0.4rem;
    -webkit-line-clamp: 2;
    color: ${Grey1};
    height: 4.6rem;
    text-overflow: ellipsis;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 155%;
  }
  .row3 {
    display: flex;
    gap: 1.2rem;
  }
`;
const IconItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HeartResizeIcon = styled(HeartIcon)`
  width: 2rem;
  height: 2rem;
`;

const PrivateSign = styled.div`
  display: flex;
  position: absolute;
  top: 1.95rem;
  right: 1.6rem;
`;

const TimeLeft = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${Grey2};
  position: absolute;
  bottom: 1.8rem;
  right: 1.6rem;
`;

const CreateConsultButton = styled.button`
  width: 5.8rem;
  height: 5.8rem;
  border-radius: 100%;
  background-color: ${Green};
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
  align-self: flex-end;
`;
const CreateConsultButtonWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  bottom: 1.5rem;
  flex-direction: column;
  @media (min-width: 768px) {
    width: 375px;
  }
`;

const EmptyIcon = styled(Empty)`
  padding: 4.7rem 4.41rem 4.603rem 4.5rem;
`;
const EmptyWrapper = styled.div`
  margin: 10vh auto 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default BuyerOpenConsultSection;
