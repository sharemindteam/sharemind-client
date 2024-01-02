import { useEffect } from "react";

export const useViewResize = () => {
  //viewport 계산
  useEffect(() => {
    const setScreenSize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setScreenSize();

    window.addEventListener("resize", setScreenSize);
    return () => {
      window.removeEventListener("resize", setScreenSize);
    };
  }, []);
};
