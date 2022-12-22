import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { getScreenHeights, getScreenTopsArray,getScrollBarWidth } from "../layout";

const LayoutContext = createContext({});

function LayoutProvider({ children }) {
  const [clientHeight, setClientHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [currentScrollArea, setCurrentScrollArea] = useState({
    name: "competition",
    offset: 0,
  });
  const [scrollBarWidth,setScrollBarWidth]=useState(0);


  const [scrollTopsArray, setScrollTopsArray] = useState([]);

  const handleSizeChange = () => {
    setClientHeight(window.innerHeight);
  };

  useLayoutEffect(() => {
    setClientHeight(window.innerHeight);
    window.addEventListener("resize", handleSizeChange);
    setScrollBarWidth(getScrollBarWidth('scrollArea'));
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

  return (
    <LayoutContext.Provider
      value={{
        clientHeight,
        setClientHeight,
        scrollTop,
        setScrollTop,
        currentScrollArea,
        scrollBarWidth
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export { LayoutProvider };

export default LayoutContext;
