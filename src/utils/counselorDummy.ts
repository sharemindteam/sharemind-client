//상담탭
export const consultDummy = [
  {
    name: '연애상담마스터',
    consultState: '질문 대기',
    time: '8분전',
    content:
      '연애상담마스터님께 고민 내용을 남겨 주세요. 연애상담마스터님이 24시간 어쩌구 블라블라 주저리 주저리주저리 주저리주저리 주저리주저리 주저리주저리 주저리주저리 ',
    unread: 0,
  },
  {
    name: '연애상담마스터',
    consultState: '답변 도착',
    time: '8분전',
    content:
      '연애상담마스터님께 고민 내용을 남겨 주세요. 연애상담마스터님이 24시간 어쩌구 블라블라 주저리 주저리주저리 주저리주저리 주저리주저리 주저리주저리 주저리주저리 ',
    unread: 1,
  },
  {
    name: '연애상담마스터',
    consultState: '상담 취소',
    time: '8분전',
    content:
      '연애상담마스터님께 고민 내용을 남겨 주세요. 연애상담마스터님이 24시간 어쩌구 블라블라 주저리 주저리주저리 주저리주저리 주저리주저리 주저리주저리 주저리주저리 ',
    unread: 0,
  },
  {
    name: '연애상담마스터',
    consultState: '상담 대기',
    time: '8분전',
    content:
      '연애상담마스터님께 고민 내용을 남겨 주세요. 연애상담마스터님이 24시간 어쩌구 블라블라 주저리 주저리주저리 주저리주저리 주저리주저리 주저리주저리 주저리주저리 ',
    unread: 3,
  },
];
//들준상
export const counselorDummyData = [
  {
    counselorId: 0,
    tagList: ['이별/재회', '썸/연애시작', '공감'],
    introduction: '재회를 밥먹듯이 하고나서 안정적인 연애를 유지하고 있어요',
    nickname: '연애상담마스터',
    experience:
      '안녕하세요. 한 남자와 재회를 밥먹듯이 하고 안정적으로 연애를 유지 중인 여성입니다.그 사람과 연애를 하면서 저는 스스로도 많은 내적 성장을 겪었고 가치관이 180도 변하게 되었습니다.  ',
    level: 1,
    isBookmarked: true,
    rating: 4.5,
    reviewNumber: 132,
    iconNumber: 10,
    consultType: 3,
    letterPrice: 5000,
    chattingPrice: 8000,
  },
  {
    counselorId: 1,
    tagList: ['이별/재회', '권태기', '조언'],
    introduction:
      '아이셋 싱글맘, 제 경험을 바탕으로 이혼 과정 상담을 해 드립니다',
    nickname: '싱글맘',
    experience:
      '안녕하세요. 한 남자와 재회를 밥먹듯이 하고 안정적으로 연애를 유지 중인 여성입니다.그 사람과 연애를 하면서 저는 스스로도 많은 내적 성장을 겪었고 가치관이 180도 변하게 되었습니다.주변 친구들에게 연애 상담을 하는 것은 많은 부작용을 가져옵니다. 내 남자친구는 친구들에게 이미지가 바닥이 되어 있고, 잦은 이별 상담에 주변 사람들이 떠나가기 시작합니다. ',
    level: 2,
    isBookmarked: false,
    rating: 5.0,
    reviewNumber: 275,
    iconNumber: 10,
    consultType: 1,
    letterPrice: 5000,
    chattingPrice: 9000,
  },
  {
    counselorId: 2,
    tagList: ['썸/연애시작', '연애갈등', '팩폭'],
    introduction:
      '사내연애에서 환승이별까지, 비밀연애를 하며 감수해야 할 상황들과 위험신호를 알려드립니다',
    nickname: '고민들어드림',
    experience:
      '안녕하세요. 한 남자와 재회를 밥먹듯이 하고 안정적으로 연애를 유지 중인 여성입니다.그 사람과 연애를 하면서 저는 스스로도 많은 내적 성장을 겪었고 가치관이 180도 변하게 되었습니다.주변 친구들에게 연애 상담을 하는 것은 많은 부작용을 가져옵니다. 내 남자친구는 친구들에게 이미지가 바닥이 되어 있고, 잦은 이별 상담에 주변 사람들이 떠나가기 시작합니다. ',
    level: 4,
    isBookmarked: false,
    rating: 3.0,
    reviewNumber: 112,
    iconNumber: 10,
    consultType: 2,
    letterPrice: 4000,
    chattingPrice: 6000,
  },
];
//time은 추후에 date로 받아서 처리하면 될듯, string으로 넘겨주면 더 좋고
export const reviewDummy = [
  {
    name: '김**',
    rating: 5,
    comment: '매번 친절한 상담 감사드립니다 ㅎㅎ 다음에 또 올게요',
    time: '12월8일',
  },
  {
    name: '이**',
    rating: 4,
    comment:
      '부정적인 표현을 하더라도 상담자의 기분을 생각해서 배려하는 대화방식인데 대화하는 도중에 짜증나지 않는 타입입니다. 대화하는 방식이 매우 적절하고 넘은 시간이 있어 차감하고 한번 더 상담할 예정입니다.',
    time: '12월5일',
  },
  {
    name: '박**',
    rating: 3,
    comment:
      '상담사님을 택한 이유는 그냥 친구한테 털어놓는다는 느낌으로 상담 받기를 원했기 때문이었어요! 흠..근데 그런 느낌과는 상당히 거리가 있더라구요ㅎㅎ그래도 좋았습니다 감사합니다!',
    time: '12월1일',
  },
];
//리뷰 페이지 리뷰 작성 더미
export const reviewDummyData = [
  {
    counselorId: 0,
    nickname: '연애상담마스터',
    level: 1,
    rating_average: 4.5,
    reviewNumber: 132,
    iconNumber: 10,
    consultType: '편지',
    price: 8000,
    date: '2023년 10월 27일',
  },
  {
    counselorId: 1,
    nickname: '싱글맘',
    level: 2,
    rating_average: 5.0,
    reviewNumber: 275,
    iconNumber: 10,
    consultType: '편지',
    price: 8000,
    date: '2023년 10월 27일',
  },
  {
    counselorId: 2,
    nickname: '고민들어드림',
    level: 4,
    rating_average: 3.0,
    reviewNumber: 112,
    iconNumber: 10,
    consultType: '편지',
    price: 8000,
    date: '2023년 10월 27일',
  },
];
//남긴 리뷰 더미
export const wroteReviewDummyData = [
  {
    counselorId: 0,
    nickname: '연애상담마스터',
    level: 1,
    rating_average: 4.5,
    reviewNumber: 132,
    iconNumber: 10,
    consultType: '편지',
    price: 8000,
    date: '2023년 10월 27일',
    rating: 5,
    comment:
      '후기가없어서 고민하다가 신청했는데 전혀 후회없었습니다. 저도 여자인데 정말 친한 언니처럼 얘기 들어주시고 조언해주시고 공감해주셔서 마음이 많이 편해졌습니다.',
  },
  {
    counselorId: 1,
    nickname: '싱글맘',
    level: 2,
    rating_average: 5.0,
    reviewNumber: 275,
    iconNumber: 10,
    consultType: '편지',
    price: 8000,
    date: '2023년 10월 27일',
    rating: 4,
    comment:
      '후기가없어서 고민하다가 신청했는데 전혀 후회없었습니다. 저도 여자인데 정말 친한 언니처럼 얘기 들어주시고 조언해주시고 공감해주셔서 마음이 많이 편해졌습니다.',
  },
  {
    counselorId: 2,
    nickname: '고민들어드림',
    level: 4,
    rating_average: 3.0,
    reviewNumber: 112,
    iconNumber: 10,
    consultType: '편지',
    price: 8000,
    date: '2023년 10월 27일',
    rating: 3,
    comment:
      '후기가없어서 고민하다가 신청했는데 전혀 후회없었습니다. 저도 여자인데 정말 친한 언니처럼 얘기 들어주시고 조언해주시고 공감해주셔서 마음이 많이 편해졌습니다.',
  },
];
//결제 내역 더미
export const paymentDummy = [
  {
    counselorId: 0,
    nickname: '연애상담마스터',
    consultType: '편지',
    consultState: '상담 대기',
    price: 8000,
    consultDate: '2023년 10월 27일',
    payDate: '2023년 10월 26일',
    payment: '카드 간편결제',
  },
  {
    counselorId: 1,
    nickname: '싱글맘',
    consultType: '편지',
    consultState: '상담 대기',
    price: 8000,
    consultDate: '2023년 10월 27일',
    payDate: '2023년 10월 26일',
    payment: '카드 간편결제',
  },
  {
    counselorId: 2,
    nickname: '고민들어드림',
    consultType: '편지',
    consultState: '상담 대기',
    price: 8000,
    consultDate: '2023년 10월 27일',
    payDate: '2023년 10월 26일',
    payment: '카드 간편결제',
  },
];
