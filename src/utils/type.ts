//type
//tagA2 상담 상태 type
type ConsultState =
  | '답변 대기'
  | '질문 대기'
  | '답변 도착'
  | '질문 도착'
  | '상담 대기'
  | '상담 중'
  | '상담 종료'
  | '상담 취소';
//tagA2 카테고리 type
type CartegoryState =
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

type Review = {
  name: string;
  rating: number;
  comment: string;
  time: string;
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

type ConsultInfoList = ConsultInfoItem[];
