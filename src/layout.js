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

//Header+EmptySlot+Competition=100vh
const layout = {
  startScreen: {
    realContentH: 480,
    mapPosition: {
      x: 2,
      y: 52,
    },
  },
  botherYou: {
    realContentH: 690,
    mapPosition: {
      x: 44,
      y: 1,
    },
  },
  thisYearTopic: {
    realContentH: 520,
    mapPosition: {
      x: 114,
      y: 12,
    },
  },
  comingTopic: {
    realContentH: 850,
    mapPosition: {
      x: 194,
      y: 12,
    },
  },
  scheduleDate: {
    realContentH: 570,
    mapPosition: {
      x: 183,
      y: 62,
    },
  },
  dissatisfactory: {
    realContentH: 520,
    mapPosition: {
      x: 129,
      y: 87,
    },
  },
  rules: {
    realContentH: 650,
    mapPosition: {
      x: 129,
      y: 87,
    },
  },
  sponsors: {
    realContentH: 630,
    mapPosition: {
      x: 84,
      y: 122,
    },
  },
  finish: {
    realContentH: 480,
    mapPosition: {
      x: 29,
      y: 107,
    },
  },
  signUp: {
    realContentH: 480,
  },
};

export const getScrollBarWidth = (scrollAreaId) => {
  const scrollAreaElement = document.getElementById(scrollAreaId);
  if (scrollAreaElement) {
    return scrollAreaElement.offsetWidth - scrollAreaElement.clientWidth;
  }
  return 17;
};

export const getScreenAreaWidth = (scrollAreaId) => {
  const scrollAreaElement = document.getElementById(scrollAreaId);
  if (scrollAreaElement) {
    return scrollAreaElement.offsetWidth - scrollAreaElement.clientWidth;
  }
  return 400;
};

export const getScreenNameArray = () => {
  return Object.keys(layout).map((screenName) => screenName);
};

export const calcScreenTop = (screenNodeArray, screenHeight, screenWidth) => {
  let order = 1;
  return screenNodeArray.map((screenNode) => {
    const { top: screenNodeTop, height: screenNodeHeight } =
      screenNode.getBoundingClientRect();
    const screenScrollStart = screenNodeTop - screenHeight;
    const screenScrollEnd = screenScrollStart + screenNodeHeight;
    return {
      name: screenNode.id,
      scrollStart: Math.round(screenScrollStart),
      order: order++,
      scrollEnd: Math.round(screenScrollEnd),
    };
  });
};

export default layout;
