import { ReactComponent as Check } from 'assets/icons/icon-signup-check.svg';
import { ReactComponent as BlueCheck } from 'assets/icons/icon-signup-bluecheck.svg';
import { ReactComponent as RedX } from 'assets/icons/icon-signup-redX.svg';
interface SignupValidIconProps {
  type: string;
}
export const SignupValidIcon = ({ type }: SignupValidIconProps) => {
  if (type === 'common') {
    return <Check />;
  } else if (type === 'valid') {
    return <BlueCheck />;
  } else if (type === 'invalid') {
    return <RedX />;
  } else {
    return null;
  }
};
