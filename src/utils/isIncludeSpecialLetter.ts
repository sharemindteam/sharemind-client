 //특수문자 포함 여부 
export const isIncludeSpecialLetter = (str: string) => {
  var specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (specialCharacterRegex.test(str)) {
    return true;
  } else {
    return false;
  }
};
