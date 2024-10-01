import { useRecoilState } from 'recoil';
import { isComplaintModalOpenState } from 'utils/atom';

export const useShowComplaintModal = () => {
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useRecoilState(
    isComplaintModalOpenState,
  );

  const handleMoreButtonClick = () => {
    setIsComplaintModalOpen(true);
  };

  const handleBackDropClick = () => {
    setIsComplaintModalOpen(false);
  };

  return { isComplaintModalOpen, handleBackDropClick, handleMoreButtonClick };
};
