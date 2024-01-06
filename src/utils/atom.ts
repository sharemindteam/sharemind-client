import { atom } from 'recoil';
//상담사 리스트 최근순 인기순 별점순 modal open toggle
export const isSortModalOpenState = atom({
  key: 'isSortModalOpenState',
  default: false,
});
//true가 될 시 scroll lock, 모달창에 사용
export const scrollLockState = atom({
  key: 'scrollLockState',
  default: false,
});
//modal 올라 왔을 시 최근순 인기순 별점순 여부
//0: 최근순 1: 인기순 2: 별점순
export const sortTypeState = atom({
  key: 'sortTypeState',
  default: false,
});
//셰어 side searchKeywordState
export const searchKeywordState = atom({
  key: 'searchKeywordState',
  default: '',
});
