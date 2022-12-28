/**
 * currentPositoin:
 * startScreen: 2px, 52px
 * botherYou: 44px,1px
 * thisYearTopic: 114px, 12px
 * comingTopic: 194px, 12px
 * scheduleDate: 183px, 62px
 * dissatisfactory, rules: 129px, 87px
 * sponsors: 84px, 122px
 * finish: 29px, 107px
 */

//Header+EmptySlot+Competition=100vh(initialScreen)
const layout = {
  initialScreen: {
    height: {
      vh: 1,
    },
    order: 0,
    realContentH: 480,
  },
  startScreen: {
    height: {
      number: 1800,
      vh: 0,
    },
    order: 1,
    realContentH: 480,
    mapPosition: {
      x: 2,
      y: 52,
    },
  },
  botherYou: {
    height: { number: 1200, vh: 1 },
    order: 2,
    realContentH: 690,
    mapPosition: {
      x: 44,
      y: 1,
    },
  },
  thisYearTopic: {
    height: { number: 900, vh: 1 },
    order: 3,
    realContentH: 520,
    mapPosition: {
      x: 114,
      y: 12,
    },
  },
  comingTopic: {
    height: { number: 1040, vh: 1 },
    order: 4,
    realContentH: 850,
    mapPosition: {
      x: 194,
      y: 12,
    },
  },
  scheduleDate: {
    height: { number: 2500, vh: 2 },
    order: 5,
    realContentH: 570,
    mapPosition: {
      x: 183,
      y: 62,
    },
  },
  dissatisfactory: {
    height: { number: 2400, vh: 1 },
    order: 6,
    realContentH: 520,
    mapPosition: {
      x: 129,
      y: 87,
    },
  },
  rules: {
    height: { number: 0, vh: 3 },
    order: 7,
    realContentH: 650,
    mapPosition: {
      x: 129,
      y: 87,
    },
  },
  sponsors: {
    height: { number: 1000, vh: 1 },
    order: 8,
    realContentH: 630,
    mapPosition: {
      x: 84,
      y: 122,
    },
  },
  finish: {
    height: { number: 9000, vh: 0 },
    order: 9,
    realContentH: 480,
    mapPosition: {
      x: 29,
      y: 107,
    },
  },
  signUp: {
    height: { number: 1000, vh: 1 },
    order: 10,
    realContentH: 480,
  },
};

export const getScreenTopsArray = (clientHeight = 0) => {
  let accHeight = -clientHeight;
  return Object.entries(layout)
    .sort(({ order: orderA }, { order: orderB }) => orderA - orderB)
    .reduce((acc, [name, { height, order }]) => {
      let { vh, number } = height;
      number = typeof number === "number" ? number : 0;
      vh = typeof vh === "number" ? vh : 0;
      let screenHeight = number + vh * clientHeight;
      let preAccHeight = accHeight;

      screenHeight = screenHeight > height.max ? height.max : screenHeight;
      accHeight = preAccHeight + screenHeight;
      return [
        ...acc,
        { name, scrollStart: preAccHeight, height: screenHeight, order },
      ];
    }, []);
};

export const getPreScreenByName = (name) => {
  const layoutOrderMappingArray = Object.entries(layout).map(
    ([keyName, { order }]) => ({ name: keyName, order })
  );
  let currentScreen = layoutOrderMappingArray.find(
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
    const preScreens = layoutOrderMappingArray.filter(
      ({ order }) => order < currentScreenOrder
    );
    const maxPreScreenOrder = Math.max(...preScreens.map(({ order }) => order));
    const { name: preScreenName } = preScreens.find(
      ({ order }) => order === maxPreScreenOrder
    );
    return { ...layout[preScreenName] };
  } else {
    return {};
  }
};

export const getScrollBarWidth = (scrollAreaId) => {
  const scrollAreaElement = document.getElementById(scrollAreaId);
  if (scrollAreaElement) {
    return scrollAreaElement.offsetWidth - scrollAreaElement.clientWidth;
  }
  return 17;
};

export default layout;
