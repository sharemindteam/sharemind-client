import { atom } from 'recoil';
//상담사 리스트 최근순 인기순 별점순
export const isSortModalOpenState = atom({
  key: 'isSortModalOpenState',
  default: false,
});
//true가 될 시 scroll lock, 모달창에 사용
export const scrollLockState = atom({
  key: 'scrollLockState',
  default: false,
});
