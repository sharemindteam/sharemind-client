export const formatTimeRange = (input: string) => {
  const numbers = input.match(/\d+/g);
  if (numbers && numbers.length === 2) {
    const startTime = numbers[0].padStart(2, '0') + '시';
    const endTime = numbers[1].padStart(2, '0') + '시';
    return `${startTime} ~ ${endTime}`;
  } else {
    console.log('err!');
    return input;
  }
};
