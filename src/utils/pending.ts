//pending 함수
export const pending = (delay = 100) =>
  new Promise((res) => setTimeout(res, delay));
