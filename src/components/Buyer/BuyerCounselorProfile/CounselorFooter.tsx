import styled from 'styled-components';
import { ReactComponent as NoneBookMark } from 'assets/icons/icon-save1.svg';
import { ReactComponent as BookMark } from 'assets/icons/icon-save2.svg';
import { Button } from 'components/Common/Button';
import { useEffect, useState } from 'react';
import { White } from 'styles/color';
interface CounselorFooterProps {
  isBookmarked: boolean;
}
export const CounselorFooter = ({ isBookmarked }: CounselorFooterProps) => {
  const [bookmarkToggle, setBookmarkToggle] = useState<boolean>();
  useEffect(() => {
    setBookmarkToggle(isBookmarked);
  }, []);
  return (
    <Wrapper>
      {bookmarkToggle ? (
        <BookMarkIcon
          onClick={() => {
            setBookmarkToggle(false);
          }}
        />
      ) : (
        <NoneBookMarkIcon
          onClick={() => {
            setBookmarkToggle(true);
          }}
        />
      )}

      <Button text="상담 신청하기" width="26rem" />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 5.2rem;
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 33.5rem;
  }
  display: flex;
  justify-content: center;
  gap: 2.4rem;
  background-color: ${White};
  padding: 0.8rem 2rem 1.2rem 2rem;
  position: fixed;
  bottom: 0;
  z-index: 999;
`;
const NoneBookMarkIcon = styled(NoneBookMark)`
  width: 4.2rem;
  height: 3.9rem;
  cursor: pointer;
  margin-top: 0.5rem;
`;
const BookMarkIcon = styled(BookMark)`
  width: 4.2rem;
  height: 3.9rem;
  cursor: pointer;
  margin-top: 0.5rem;
`;
