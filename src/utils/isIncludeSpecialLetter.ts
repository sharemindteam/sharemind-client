//특수문자 포함 여부
export const isIncludeSpecialLetter = (str: string) => {
  var specialCharacterRegex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
  if (specialCharacterRegex.test(str)) {
    return true;
  } else {
    return false;
  }
};

export const isIncludeSpecialLetterOneLiner = (str: string) => {
  var specialCharacterRegex = /[\{\}\[\]\/,;|\)*~`^\-_+<>@\#$%&\\\=\(\'\"]/g;
  if (specialCharacterRegex.test(str)) {
    return true;
  } else {
    return false;
  }
};
