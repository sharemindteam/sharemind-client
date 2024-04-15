//영문, 숫자, 특수 문자 2종 이상 포함 여부
export const passwordTypeValid = (str: string) => {
  const pwRegExp1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]*$/;
  const pwRegExp2 = /^(?=.*[A-Za-z])(?=.*[\W_])[A-Za-z\d\W_]*$/;
  const pwRegExp3 = /^(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]*$/;
  if (pwRegExp1.test(str) || pwRegExp2.test(str) || pwRegExp3.test(str)) {
    return true;
  } else {
    return false;
  }
};

//10자 이상 여부
export const passwordLengthValid = (str: string) => {
  const pwRegExp = /^[A-Za-z\d\W_]{10,}$/;
  if (pwRegExp.test(str)) {
    return true;
  } else {
    return false;
  }
};
