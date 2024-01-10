//특수문자 포함 여부
export const isIncludeSpecialLetter = (str: string) => {
  var specialCharacterRegex =
    /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

  if (specialCharacterRegex.test(str)) {
    return true;
  } else {
    return false;
  }
};
// True면 삘긴섹
// 특수문자이면서
export const isIncludeSpecialLetterOneLiner = (str: string) =>
  !/^[\dㄱ-힣a-zA-Z ]*$/.test(str) && !/[#!&?\-_,.$%^*/'"':+=~|·]/.test(str);

// 특수문자이면서 &&
