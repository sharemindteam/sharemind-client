type TimeRange = {
  start: string;
  end: string;
};

export const convertTimeToString = (timeRanges: string[]) => {
  if (timeRanges === undefined) {
    return null;
  } else {
    // 각 시간대의 시작과 끝을 추출하여 TimeRange 배열로 변환
    const timeRangeObjects: TimeRange[] = timeRanges.map((range) => {
      const [start, end] = range.split('~');
      return { start, end };
    });

    // TimeRange 배열을 "hh:mm-hh:mm" 형식의 문자열로 변환
    const formattedTimeRanges: string[] = timeRangeObjects.map(
      ({ start, end }) => `${start}:00-${end}:00`,
    );

    // 변환된 문자열들을 콤마로 이어붙임
    const result: string = formattedTimeRanges.join(', ');

    return result;
  }
};
export const convertTimeRange = (input: string) => {
  const timeRanges = input.split('~').map((range: any) => {
    const hours = parseInt(range, 10);
    return hours < 10 ? '0' + hours + ':00' : hours + ':00';
  });

  return timeRanges.join('~');
};
