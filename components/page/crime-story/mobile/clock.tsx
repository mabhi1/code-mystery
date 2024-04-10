"use client";

import React, { useState, useEffect } from "react";

const useCurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return { time };
};

export { useCurrentTime };

export default function Clock() {
  const { time } = useCurrentTime();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] text-black text-center rounded-full bg-white dark:bg-black after:content-[''] after:h-2 after:w-2 after:rounded-full after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-black">
      <div
        className="absolute w-[4px] rounded h-8 bg-primary top-[20.2%] left-[48.4%] origin-bottom"
        style={{
          transform: `rotateZ(${time.getHours() * 30}deg)`,
        }}
      />
      <div
        className="absolute w-[3px] rounded h-10 bg-primary/50 top-[12.5%] left-[48.5%] origin-bottom"
        style={{
          transform: `rotateZ(${time.getMinutes() * 6}deg)`,
        }}
      />
      <div
        className="absolute w-[2px] rounded h-12 bg-red-800 top-[5%] left-[49%] origin-bottom"
        style={{
          transform: `rotateZ(${time.getSeconds() * 6}deg)`,
        }}
      />
      <span className="absolute top-[1%] left-1/2 -translate-x-1/2 dark:text-white">12</span>
      <span className="absolute top-[8%] right-[25%] dark:text-white">1</span>
      <span className="absolute top-[22%] right-[9%] dark:text-white">2</span>
      <span className="absolute right-[3%] top-1/2 -translate-y-1/2 dark:text-white">3</span>
      <span className="absolute bottom-[22%] right-[9%] dark:text-white">4</span>
      <span className="absolute bottom-[8%] right-[25%] dark:text-white">5</span>
      <span className="absolute bottom-[1%] left-1/2 -translate-x-1/2 dark:text-white">6</span>
      <span className="absolute bottom-[8%] left-[25%] dark:text-white">7</span>
      <span className="absolute bottom-[22%] left-[9%] dark:text-white">8</span>
      <span className="absolute left-[3%] top-1/2 -translate-y-1/2 dark:text-white">9</span>
      <span className="absolute top-[22%] left-[9%] dark:text-white">10</span>
      <span className="absolute top-[8%] left-[24%] dark:text-white">11</span>
    </div>
  );
}
