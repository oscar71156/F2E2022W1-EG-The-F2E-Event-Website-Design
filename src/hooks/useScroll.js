import { useState } from "react";

const useScroll = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [deviceHeight, setDeviceHeight] = useState(0);

  return {
    scrollTop,
    deviceHeight
  }
};

export default useScroll;
