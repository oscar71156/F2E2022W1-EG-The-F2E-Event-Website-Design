import { useCallback } from "react";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import layout from "../layout";
import {
  calcScreenTop,
  getScreenNameArray,
  getScrollBarWidth,
} from "../layout";

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

  const [scrollContent, setScrollContent] = useState(null);

  const [screenWidth, setScreenWidth] = useState(null);

  const [scrollTop, setScrollTop] = useState(0);
  const [currentScrollArea, setCurrentScrollArea] = useState({
    name: "startScreen",
    offset: 0,
  });
  const [scrollBarWidth, setScrollBarWidth] = useState(0);

  const [scrollTopsArray, setScrollTopsArray] = useState([]);

  const handleSizeChange = () => {
    setClientHeight(window.innerHeight);
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    if (scrollContent) {
      const screenNameArray = getScreenNameArray();
      const screenNodes = [...scrollContent.childNodes].filter((node) =>
        screenNameArray.includes(node.id)
      );
      setScrollTopsArray(calcScreenTop(screenNodes, clientHeight, screenWidth));
    }
  }, [scrollContent, clientHeight, screenWidth]);

  useLayoutEffect(() => {
    setClientHeight(window.innerHeight);
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleSizeChange);
    setScrollBarWidth(getScrollBarWidth("scrollArea"));
    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  }, []);

  useEffect(() => {
    const currentScrollAreaElement = scrollTopsArray.find(
      ({ scrollEnd, scrollStart }) =>
        scrollTop > scrollStart && scrollTop <= scrollEnd
    );
    if (currentScrollAreaElement) {
      setCurrentScrollArea({
        name: currentScrollAreaElement.name,
        offset: scrollTop - currentScrollAreaElement.scrollStart,
        order: currentScrollAreaElement.order,
      });
    }
  }, [scrollTopsArray, scrollTop]);

  const getScreenInforByName = useCallback(
    (name) => scrollTopsArray.find((screen) => screen.name === name),
    [scrollTopsArray]
  );

  const getPreScreenByName = useCallback(
    (name) => {
      let currentScreen = scrollTopsArray.find(
        ({ name: keyName }) => keyName === name
      );
      if (currentScreen) {
        const { order: currentScreenOrder } = currentScreen;

        ///order less than 1 have no preScreen
        if (currentScreenOrder <= 1) {
          //Competition or Header
          //no realContentH=>Competition has fixed original height 600px
          return {};
        }
        const preScreens = scrollTopsArray.filter(
          ({ order }) => order < currentScreenOrder
        );
        const maxPreScreenOrder = Math.max(
          ...preScreens.map(({ order }) => order)
        );
        const { name: preScreenName } = preScreens.find(
          ({ order }) => order === maxPreScreenOrder
        );

        return { ...layout[preScreenName] };
      } else {
        return {};
      }
    },
    [scrollTopsArray]
  );

  return (
    <LayoutContext.Provider
      value={{
        clientHeight,
        setClientHeight,
        setScrollTop,
        currentScrollArea,
        scrollBarWidth,
        screenWidth,
        setScrollContent,
        getScreenInforByName,
        getPreScreenByName,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export { LayoutProvider };

export default LayoutContext;
