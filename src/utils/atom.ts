import { atom } from 'recoil';
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
// 판매 정보 수정 페이지: 은행 모달 여부
export const isBankModalOpenState = atom({
  key: 'isBankModalOpenState',
  default: false,
});
// 판매 정보 수정 페이지: 업데이트 모달 여부
export const isUpdateModalOpenState = atom({
  key: 'isUpdateModalOpenState',
  default: false,
});

export const isSuccessUpdateState = atom({
  key: 'isSuccessUpdateState',
  default: false,
});

export const isReviewComplaintOpenState = atom({
  key: 'isReviewComplaintOpenState',
  default: false,
});

//상담페이지  최근순 읽지 않은순 modal open toggle
export const isConsultModalOpenState = atom({
  key: 'isConsultModalOpenState',
  default: false,
});

// 마인더 인증하기 - 교육자료 퀴즈 응시?
export const isTakingQuizModalOpenState = atom({
  key: 'isTakingQuizModalOpenState',
  default: false,
});

export const replyState = atom({
  key: 'replyState',
  default: '',
});

/////buyer
//리뷰 페이지 수정하기 modal open toggle
export const isModifyReviewState = atom({
  key: 'isModifyReviewState',
  default: false,
});
//리뷰 페이지 수정하기 modal open toggle
export const isPaymentModalOpenState = atom({
  key: 'isPaymentModalOpenState',
  default: false,
});
//상담사 리스트 최근순 인기순 별점순 modal open toggle
export const isSortModalOpenState = atom({
  key: 'isSortModalOpenState',
  default: false,
});
//편지 상담 카테고리 modal open toggle
export const isLetterModalOpenState = atom({
  key: 'isLetterModalOpenState',
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
