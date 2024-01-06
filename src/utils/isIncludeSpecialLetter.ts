export const isIncludeSpecialLetter = (str: string) => {
  var specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (specialCharacterRegex.test(str)) {
    return true;
  } else {
    return false;
  }
};
