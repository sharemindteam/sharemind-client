import { ReactComponent as Heart5 } from 'assets/icons/icon-heart-rate5.svg';
import { ReactComponent as Heart4 } from 'assets/icons/icon-heart-rate4.svg';
import { ReactComponent as Heart3 } from 'assets/icons/icon-heart-rate3.svg';
import { ReactComponent as Heart2 } from 'assets/icons/icon-heart-rate2.svg';
import { ReactComponent as Heart1 } from 'assets/icons/icon-heart-rate1.svg';
interface HeartRateProps {
  rating: number;
}
export const HeartRate = ({ rating }: HeartRateProps) => {
  if (rating === 5) {
    return <Heart5 />;
  } else if (rating === 4) {
    return <Heart4 />;
  } else if (rating === 3) {
    return <Heart3 />;
  } else if (rating === 2) {
    return <Heart2 />;
  } else if (rating === 1) {
    return <Heart1 />;
  }
};
