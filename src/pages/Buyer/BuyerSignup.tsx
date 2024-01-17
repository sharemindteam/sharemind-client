import { useBeforeUnload } from 'react-router-dom';
import { useState } from 'react';
import { useInput } from 'hooks/useInput';
import { SignupVerifyEmail } from 'components/Buyer/BuyerSignup/SignupVerifyEmail';
import { SignupPw } from 'components/Buyer/BuyerSignup/SignupPw';
import { SignupInfo } from 'components/Buyer/BuyerSignup/SignupInfo';

export const BuyerSignup = () => {
  useBeforeUnload((event) => {
    event.preventDefault();
  });
  //회원가입페이지 0, 1, 2 순서로 state
  const [signupState, setSignupState] = useState<number>(0);

  const idInput = useInput('');
  const pw = useInput('');
  const recoveryEmail = useInput('');
  const phoneNumber = useInput('');
  if (signupState === 0) {
    return (
      <>
        <SignupVerifyEmail idInput={idInput} setSignupState={setSignupState} />
      </>
    );
  } else if (signupState === 1) {
    return <SignupPw pw={pw} setSignupState={setSignupState} />;
  } else if (signupState === 2) {
    return (
      <SignupInfo
        idInput={idInput}
        pw={pw}
        email={recoveryEmail}
        phoneNumber={phoneNumber}
        setSignupState={setSignupState}
      />
    );
  }
};
