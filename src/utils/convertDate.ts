//날짜 관련 convert 함수
//chat 5분전 Date string을 "PM 00시 00분" 형식으로 변환
export const calculateTimeAfterFiveMinutes = (inputDate: string): string => {
  // 입력된 문자열 파싱
  const match = inputDate.match(
    /(\d{4})년 (\d{2})월 (\d{2})일 (AM|PM) (\d{1,2})시 (\d{2})분/,
  );

  if (!match) {
    // 유효하지 않은 입력일 경우 에러 처리
    throw new Error('Invalid input date format');
  }
  const period = match[4];
  let hour = parseInt(match[5]);
  const minute = parseInt(match[6]);

  // 현재 시간에 5분 더하기
  let totalMinutes = hour * 60 + minute + 5;
  hour = Math.floor(totalMinutes / 60) % 24;
  const newMinute = totalMinutes % 60;

  // 시간 형식으로 변환
  let periodString = period;
  if (hour >= 12 && period === 'AM') {
    periodString = 'PM';
  } else if (hour < 12 && period === 'PM') {
    periodString = 'AM';
  }

  // 결과 문자열 반환
  return `${periodString} ${hour}시 ${newMinute}분`;
};
//chat message get 요청 시에 5분전 메세지 시간 parsing
export const convertAMPMToString = (inputTime: string): string => {
  const match = inputTime.match(/(AM|PM) (\d{1,2})시 (\d{2})분/);

  if (!match) {
    // 유효하지 않은 입력일 경우 에러 처리
    throw new Error('Invalid input time format');
  }

  const period = match[1];
  let hour = parseInt(match[2]);
  const minute = match[3];

  // 오전 오후 구분
  if (period === 'PM' && hour !== 12) {
    hour += 12;
  }

  // 시간 형식으로 변환
  let periodString = '오전';
  if (hour >= 12) {
    periodString = '오후';
    if (hour !== 12) {
      hour -= 12;
    }
  }
  if (hour === 0) {
    hour = 12;
  }

  // 결과 문자열 반환
  return `${periodString} ${hour}시 ${minute}분`;
};
