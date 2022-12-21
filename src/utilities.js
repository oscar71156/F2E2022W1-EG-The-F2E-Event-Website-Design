export const throttle = (fun, duration = 3000) => {
  let timeoutId = null;
  let inThrottle = false;
  return (...argu) => {
    if (!inThrottle) {
      fun.apply(this, argu);
      inThrottle = true;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        inThrottle = false;
      }, duration);
    }
  };
};

export const changeReadyStatus2 = (status) => {
  console.log("changeReadyStatus", status);
};
