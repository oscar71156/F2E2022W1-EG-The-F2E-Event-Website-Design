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

export const debounce = (fun, duration = 1000) => {
  let timeoutId = null;
  return (...argu) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fun.apply(this, argu);
    }, duration);
  };
};

export const changeReadyStatus2 = (status) => {
  console.log("changeReadyStatus", status);
};
