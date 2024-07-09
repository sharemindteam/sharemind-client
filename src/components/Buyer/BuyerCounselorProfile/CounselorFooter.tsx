import styled from 'styled-components';
import { ReactComponent as NoneBookMark } from 'assets/icons/icon-save1.svg';
import { ReactComponent as BookMark } from 'assets/icons/icon-save2.svg';
import { Button } from 'components/Common/Button';
import { useState } from 'react';
import { White } from 'styles/color';
import { useNavigate } from 'react-router-dom';
import { patchWishListsDeprecated } from 'api/patch';
import { deleteWishListsDeprecated } from 'api/delete';
import { APP_WIDTH } from 'styles/AppStyle';
import { Flex } from 'components/Common/Flex';

//
//
//

interface CounselorFooterProps {
  counselorId: number;
  isWishList: boolean;
  consultTypes: string[];
}

//
//
//

export const CounselorFooter = ({
  counselorId,
  isWishList,
  consultTypes,
}: CounselorFooterProps) => {
  const navigate = useNavigate();

  //찜하기 여부
  const [isSaved, setIsSaved] = useState<boolean>(isWishList);
  //보내는 동안 중복 클릭 방지
  const [isSending, setIsSending] = useState<boolean>(false);

  /**
   * 찜하기 업데이트
   */
  const handleBookmark = async () => {
    if (isSending) {
      return;
    }
    try {
      setIsSending(true);
      const res: any = await patchWishListsDeprecated(counselorId);
      if (res.response?.status === 400) {
        alert('이미 찜하기 처리된 상담사입니다.');
      } else if (res.response?.status === 404) {
        alert('존재하지 않는 상담사입니다.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSending(false);
      setIsSaved(true);
    }
  };

  /**
   *
   */
  const handleUnBookmark = async () => {
    if (isSending) {
      return;
    }
    try {
      setIsSending(true);
      const res: any = await deleteWishListsDeprecated(counselorId);
      if (res.response?.status === 400) {
        alert('이미 찜하기 취소된 상담사입니다.');
      } else if (res.response?.status === 404) {
        alert('존재하지 않는 상담사입니다.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSending(false);
      setIsSaved(false);
    }
  };

  //
  //
  //

  return (
    <Wrapper justify="center" align="center" gap="2rem">
      {isSaved ? (
        <BookMarkIcon onClick={handleUnBookmark} />
      ) : (
        <NoneBookMarkIcon onClick={handleBookmark} />
      )}
      <Button
        text="상담 신청하기"
        width="26rem"
        height="5.2rem"
        onClick={() =>
          navigate(`/consultRequest/${counselorId}`, {
            state: { consultTypes },
          })
        }
      />
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled(Flex)`
  width: 100%;
  box-sizing: border-box;
  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }
  background-color: ${White};
  padding: 0.8rem 2rem 1.2rem 2rem;
  position: fixed;
  bottom: 0;
  z-index: 999;
  box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.1);
`;
const NoneBookMarkIcon = styled(NoneBookMark)`
  width: 2.8rem;
  height: 2.8rem;
  cursor: pointer;
`;
const BookMarkIcon = styled(BookMark)`
  width: 2.8rem;
  height: 2.8rem;
  cursor: pointer;
`;
