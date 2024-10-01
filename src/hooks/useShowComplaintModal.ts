import { useRecoilState } from 'recoil';
import { isComplaintModalOpenState } from 'utils/atom';

export const useShowComplainttModal = () => {
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useRecoilState(
    isComplaintModalOpenState,
  );

  const handleComplaintButtonClick = () => {
    setIsComplaintModalOpen(true);
  };

  const handleBackDropClick = () => {
    setIsComplaintModalOpen(false);
  };

  return { isComplaintModalOpen, handleBackDropClick, handleComplaintButtonClick};
};
