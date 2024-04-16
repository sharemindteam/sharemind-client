import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type useChatRequestTimeResult = {
  time: string;
  setTime: Dispatch<SetStateAction<String>>;
};

const useChatRequestTime = () => {
  const [time, setTime] = useState<string>('');

  //
  // if time setted 10:00 reset timer
  //
  useEffect(() => {
    const timer = setInterval(() => {
      const [minutes, seconds] = time.split(':').map(parseFloat);
      let totalSeconds = minutes * 60 + seconds;

      if (totalSeconds <= 0) {
        clearInterval(timer);
      } else {
        totalSeconds--;
        const newMinutes = Math.floor(totalSeconds / 60);
        const newSeconds = totalSeconds % 60;
        setTime(
          `${String(newMinutes).padStart(2, '0')} : ${String(
            newSeconds,
          ).padStart(2, '0')}`,
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return { time, setTime } as useChatRequestTimeResult;
};

export default useChatRequestTime;
