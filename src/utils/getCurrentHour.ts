export const getCurrentHour = () => {
  // 오후 3:35분일 경우, 15를 반환
  var now = new Date();
  return String(now.getHours());
};
