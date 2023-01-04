import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { getScreenTopsArray, getScrollBarWidth } from "../layout";

const LayoutContext = createContext({});

function LayoutProvider({ children }) {
  /**
   * window.innerHeight
   * including scrollbar height, padding
   */
  const [clientHeight, setClientHeight] = useState(null);
  /**
   * window.innerWidth
   * including scrollbar width, padding
   */
  const [screenWidth, setScreenWidth] = useState(null);

  const [scrollTop, setScrollTop] = useState(0);
  const [currentScrollArea, setCurrentScrollArea] = useState({
    name: "initialScreen",
    offset: 0,
  });
  const [scrollBarWidth, setScrollBarWidth] = useState(0);

  const [scrollTopsArray, setScrollTopsArray] = useState([]);

  const handleSizeChange = () => {
    setClientHeight(window.innerHeight);
    setScreenWidth(window.innerWidth);
  };
  useLayoutEffect(() => {
    setClientHeight(window.innerHeight);
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleSizeChange);
    setScrollBarWidth(getScrollBarWidth("scrollArea"));
    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  }, []);
  useLayoutEffect(() => {
    setScrollTopsArray(getScreenTopsArray(clientHeight));
  }, [clientHeight]);

  useEffect(() => {
    const currentScrollAreaElement = scrollTopsArray.find(
      ({ height, scrollStart }) =>
        scrollTop > scrollStart && scrollTop <= scrollStart + height
    );
    if (currentScrollAreaElement) {
      setCurrentScrollArea({
        name: currentScrollAreaElement.name,
        offset: scrollTop - currentScrollAreaElement.scrollStart,
        order: currentScrollAreaElement.order,
      });
    }
  }, [scrollTopsArray, scrollTop]);

  console.log("scrollTopsArray", scrollTopsArray);
  return (
    <LayoutContext.Provider
      value={{
        clientHeight,
        setClientHeight,
        setScrollTop,
        currentScrollArea,
        scrollBarWidth,
        screenWidth,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export { LayoutProvider };

export default LayoutContext;
