//pending 함수
export const pending = (delay = 50) =>
  new Promise((res) => setTimeout(res, delay));
