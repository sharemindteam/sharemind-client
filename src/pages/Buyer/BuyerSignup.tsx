import { useBeforeUnload } from 'react-router-dom';
import { useState } from 'react';
import { useInput } from 'hooks/useInput';
import { SignupVerifyEmail } from 'components/Buyer/BuyerSignup/SignupVerifyEmail';
import { SignupPw } from 'components/Buyer/BuyerSignup/SignupPw';

export const BuyerSignup = () => {
  useBeforeUnload((event) => {
    event.preventDefault();
  });
  //회원가입페이지 0, 1, 2 순서로 state
  const [signupState, setSignupState] = useState<number>(0);

  const idInput = useInput('');
  const pw = useInput('');

  if (signupState === 0) {
    return (
      <>
        <SignupVerifyEmail idInput={idInput} setSignupState={setSignupState} />
      </>
    );
  } else if (signupState === 1) {
    return <SignupPw pw={pw} idInput={idInput} />;
  }
};
