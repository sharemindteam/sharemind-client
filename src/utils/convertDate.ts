//날짜 관련 convert 함수
//chat 5분전 Date string을 "PM 00시 00분" 형식으로 변환
export const calculateTimeAfterFiveMinutes = (inputDate: string): string => {
  // 입력된 문자열 파싱
  const match = inputDate.match(
    /(\d{4})년 (\d{2})월 (\d{2})일 (AM|PM) (\d{1,2})시 (\d{1,2})분/,
  );

  if (!match) {
    // 유효하지 않은 입력일 경우 에러 처리
    throw new Error('Invalid input date format');
  }

  let period = match[4];
  let hour = parseInt(match[5]);
  let minute = parseInt(match[6]);
  //12시 이상이면 일단 12빼기
  if (hour >= 12) {
    hour -= 12;
  }
  // 현재 시간에 5분 더하기, 60분 넘어가면 -60
  minute += 5;

  if (minute >= 60) {
    hour += 1;
    minute -= 60;
  }
  //AM => PM, PM=>AM 처리
  if (hour >= 12) {
    period = period === 'AM' ? 'PM' : 'AM';
    hour -= 12;
  }
  if (period === 'PM' && hour === 0) {
    hour = 12;
  }
  // 시간 형식으로 변환하여 반환
  return `${period} ${hour}시 ${minute}분`;
};
//chat message get 요청 시에 5분전 메세지 시간 parsing
//PM=> 오후, AM => 오전으로 바꿈
//websocket으로 오는 5분전 메세지와 get 요청으로 오는 5분전 메세지 형식이 달라 ws의 경우에만 calculateTimeAfterFiveMinutes로 1차로 바꿔줌
export const convertAMPMToString = (inputTime: string): string => {
  const match = inputTime.match(/(AM|PM) (\d{1,2})시 (\d{1,2})분/);
  //ex PM 1시 4분
  if (!match) {
    // 유효하지 않은 입력일 경우 에러 처리
    throw new Error('Invalid input time format');
  }

  const period = match[1];
  let hour = parseInt(match[2]);
  const minute = match[3];

  // 시간 형식으로 변환
  let periodString = '';
  if (period === 'PM') {
    periodString = '오후';
  } else if (period === 'AM') {
    periodString = '오전';
  }

  // 결과 문자열 반환
  return `${periodString} ${hour}시 ${minute}분`;
};

export const convertAMPMToStringYear = (inputTime: string): string => {
  // 정규식을 사용하여 입력된 문자열을 파싱합니다.
  const match = inputTime.match(
    /(\d{4})년 (\d{2})월 (\d{2})일 (AM|PM) (\d{1,2})시 (\d{2})분/,
  );

  if (!match) {
    // 유효하지 않은 입력일 경우 에러를 throw합니다.
    throw new Error('Invalid input time format');
  }

  const year = match[1];
  const month = match[2];
  const day = match[3];
  let period = match[4];
  let hour = parseInt(match[5]);
  const minute = match[6];

  // 오전과 오후 구분
  if (period === 'PM' && hour !== 12) {
    period = '오후';
    hour -= 12;
  } else {
    period = '오전';
  }

  // 시간 형식으로 변환하여 반환
  return `${year}년 ${month}월 ${day}일 ${period} ${hour}시 ${minute}분`;
};

// message 옆 시간 표시 covert 함수
//날짜 관련 convert 함수
//chat 5분전 Date string을 "PM 00시 00분" 형식으로 변환
export const convertMessageTime = (inputDate: string): string => {
  // 입력된 문자열 파싱
  const match = inputDate.match(
    /(\d{4})년 (\d{2})월 (\d{2})일 (AM|PM) (\d{1,2})시 (\d{1,2})분/,
  );

  if (!match) {
    // 유효하지 않은 입력일 경우 에러 처리
    throw new Error('Invalid input date format');
  }

  let period = match[4];
  let hour = parseInt(match[5]);
  let minute = parseInt(match[6]);

  period = period === 'AM' ? '오전' : '오후';
  //AM => PM, PM=>AM 처리
  if (hour >= 12) {
    hour -= 12;
  }

  // 시간 형식으로 변환하여 반환
  return `${period} ${hour}:${minute}`;
};
