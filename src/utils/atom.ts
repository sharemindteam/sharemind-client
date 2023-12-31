import { atom } from 'recoil';
//상담사 리스트 최근순 인기순 별점순 modal open toggle
export const isSortModalOpenState = atom({
  key: 'isSortModalOpenState',
  default: false,
});
//퍈매 정보 수정 페이지 : 상담 카테고리 선택 모달
export const isCategoryModalOpenState = atom({
  key: 'categoryModalOpenState',
  default: false,
});

//퍈매 정보 수정 페이지 : 상담 스타일 선택 모달
export const isStyleModalOpenState = atom({
  key: 'isStyleModalOpenState',
  default: false,
});

//퍈매 정보 수정 페이지 : 상담 스타일 선택 모달
export const isTypeOpenModalState = atom({
  key: 'isTypeOpenModalState',
  default: false,
});

//상담페이지  최근순 읽지 않은순 modal open toggle
export const isConsultModalOpenState = atom({
  key: 'isConsultModalOpenState',
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

export const replyState = atom({
  key: 'replyState',
  default: '',
});
