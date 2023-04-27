import { useCallback, useMemo } from "react";
import { createContext, useEffect, useState } from "react";
import layout from "../layout";
import { getScreenNameArray, getScrollBarWidth } from "../layout";

import { debounce, throttle } from "../utilities";

const LayoutContext = createContext({});

function LayoutProvider({ children }) {
  const [screenDim, setScreenDim] = useState({ width: 0, height: 0 });
  const [scrollArea, setScrollArea] = useState(null);

  const [scrollTop, setScrollTop] = useState(0);
  const [currentScrollArea, setCurrentScrollArea] = useState({
    name: "startScreen",
    offset: 0,
  });
  const [scrollBarWidth, setScrollBarWidth] = useState(0);

  const [screenNodesInfor, setScreenNodesInfor] = useState([]);

  //設定螢幕寬度、高度及每個Screen的起點及高度。
  //Every screen Information: name, start, height, order(from 1)
  const setScreenDimAndgetScreenInforArray = useCallback(() => {
    if (scrollArea) {
      const screenNameArray = getScreenNameArray();
      const screenNodes = [...scrollArea.childNodes].filter((node) =>
        screenNameArray.includes(node.id)
      );
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;
      let order = 1;
      const screenNodesInfor = screenNodes.reduce((acc, curr) => {
        const { top: screenNodeTop, height: screenNodeHeight } =
          curr.getBoundingClientRect();
        return [
          ...acc,
          {
            name: curr.id,
            start: Math.round(screenNodeTop + scrollArea.scrollTop), //當在特定scrollTop refresh時，之前的screen會變負的，必須加回去
            height: Math.round(screenNodeHeight),
            order: order++,
          },
        ];
      }, []);

      setScreenNodesInfor(screenNodesInfor);
      setScreenDim({ height: screenHeight, width: screenWidth });
    }
  }, [scrollArea]);

  //初始時，設定螢幕寬度、高度及每個Screen的起點及高度。
  useEffect(() => {
    if (scrollArea) {
      setScreenDimAndgetScreenInforArray();
    }
  }, [scrollArea, setScreenDimAndgetScreenInforArray]);

  //當螢幕resize時，重新設定螢幕寬度、高度及每個Screen的起點及高度。
  const deHandleSizeChange = useCallback(
    debounce(() => {
      setScreenDimAndgetScreenInforArray();
    }, 1000),
    [setScreenDimAndgetScreenInforArray]
  );
  useEffect(() => {
    if (deHandleSizeChange) {
      window.addEventListener("resize", deHandleSizeChange);
      setScrollBarWidth(getScrollBarWidth("scrollArea"));
    }
    return () => {
      window.removeEventListener("resize", deHandleSizeChange);
    };
  }, [deHandleSizeChange]);

  //當螢幕滾動時，設定目前ScrollTop
  const ttGetScrollPosition = useMemo(
    () =>
      throttle((event) => {
        if (document.lastElementChild?.scrollTop) {
          const currentScrollTop = document.lastElementChild.scrollTop;
          setScrollTop(currentScrollTop);
        }
      }, 0),
    []
  );
  useEffect(() => {
    document.addEventListener("scroll", ttGetScrollPosition);
    return () => {
      document.removeEventListener("scroll", ttGetScrollPosition);
    };
  }, [ttGetScrollPosition]);

  useEffect(() => {
    const currentScrollAreaElement = screenNodesInfor.find(
      ({ start, height }) => scrollTop > start && scrollTop <= start + height
    );

    if (currentScrollAreaElement) {
      setCurrentScrollArea({
        name: currentScrollAreaElement.name,
        offset: scrollTop - currentScrollAreaElement.start,
        order: currentScrollAreaElement.order,
        height: currentScrollAreaElement.height,
      });
    }
  }, [screenNodesInfor, scrollTop]);

  const getScreenInforByName = useCallback(
    (name) => screenNodesInfor.find((screen) => screen.name === name),
    [screenNodesInfor]
  );

  const getPreScreenByName = useCallback(
    (name) => {
      let currentScreen = screenNodesInfor.find(
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
        const preScreens = screenNodesInfor.filter(
          ({ order }) => order < currentScreenOrder
        );
        const maxPreScreenOrder = Math.max(
          ...preScreens.map(({ order }) => order)
        );
        const { name: preScreenName } = preScreens.find(
          ({ order }) => order === maxPreScreenOrder
        );
        if (!preScreenName) {
          return 0;
        }
        return { ...layout[preScreenName] };
      } else {
        return {};
      }
    },
    [screenNodesInfor]
  );

  return (
    <LayoutContext.Provider
      value={{
        clientHeight: screenDim.height,
        currentScrollArea,
        scrollBarWidth,
        screenWidth: screenDim.width,
        getScreenInforByName,
        getPreScreenByName,
        setScrollArea,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export { LayoutProvider };

export default LayoutContext;
