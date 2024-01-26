//type
//tagA2 상담 상태 type
export type ConsultState =
  | '답변 대기'
  | '질문 대기'
  | '답변 도착'
  | '질문 도착'
  | '상담 대기'
  | '상담 중'
  | '상담 종료'
  | '상담 취소';
//tagA2 카테고리 type
export type CartegoryState =
  | '연애갈등'
  | '이별/재회'
  | '여자심리'
  | '남자심리'
  | '썸/연애시작'
  | ' 짝사랑'
  | '권태기'
  | '기타'
  | '공감'
  | '조언'
  | '팩폭';
//tagA2 카테고리 array type

type LetterState = '질문' | '답장' | '추가질문' | '추가답장';

type CartegoryStateArray = CartegoryState[];

export type Review = {
  nickname: string;
  rating: number;
  comment: string;
  updateAt: string;
  reviewId: number;
};

type ConsultInfoItem = {
  consultStyle: string;
  id: number;
  latestMessageContent: string | null;
  latestMessageIsCustomer: boolean | null;
  latestMessageUpdatedAt: string | null;
  opponentNickname: '사용자928380';
  status: '질문 대기';
  unreadMessageCount: null;
};

export interface GetMessagesType {
  content: string | null;
  messageId: number | null;
  messageType: string | null;
  updatedAt: string | null;
}

type SellerLetterLevelTypes = {};

type LetterInfo = {};

export type ConsultInfoList = ConsultInfoItem[];

///buyer search result 페이지

export type ConsultCosts = {
  편지: number;
  채팅: number;
};
export type ConsultTimes = {
  MON: Array<string>; //(ex: "14~15")
  TUE: Array<string>;
  WED: Array<string>;
  THU: Array<string>;
  FRI: Array<string>;
  SAT: Array<string>;
  SUN: Array<string>;
};

export type SearchResultData = {
  consultCategories: CartegoryState[];
  consultCosts: ConsultCosts;
  consultStyle: string;
  consultTimes: ConsultTimes;
  consultTypes: string[];
  counselorId: number;
  introduction: string;
  isWishList: boolean;
  level: number;
  nickname: string;
  ratingAverage: number;
  totalReview: number;
};

export interface BuyerReview {
  reviewId: number;
  nickname: string;
  consultStyle: string;
  level: number;
  ratingAverage: number;
  totalReview: number;
  consultType: string;
  consultedAt: string;
  consultCost: number;
  rating: number;
  comment: string;
}
export interface MinderProfile {
  consultCategories: CartegoryState[];
  consultCosts: ConsultCosts;
  consultStyle: string;
  consultTimes: ConsultTimes;
  consultTypes: string[];
  counselorId: number;
  introduction: string;
  // isWishList: boolean;
  experience: string;
  level: number;
  nickname: string;
  ratingAverage: number;
  totalReview: number;
}

export type WishlistDataType = {
  consultCategories: CartegoryState[];
  consultCosts: ConsultCosts;
  consultStyle: string;
  consultTimes: ConsultTimes;
  consultTypes: string[];
  updateAt: string;
  introduction: string;
  counselorId: number;
  wishlistId: number;
  level: number;
  nickname: string;
  ratingAverage: number;
  totalReview: number;
};
