const layout = {
  competition: {
    height: {
      vh: 0,
      number: 600,
      max: 600,
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
  },
  botherYou: {
    height: { number: 1200, vh: 1 },
    order: 2,
    realContentH: 690,
  },
  thisYearTopic: {
    height: { number: 900, vh: 1 },
    order: 3,
    realContentH: 520,
  },
  comingTopic: {
    height: { number: 1040, vh: 1 },
    order: 4,
    realContentH: 850,
  },
  scheduleDate: {
    height: { number: 2500, vh: 2 },
    order: 5,
    realContentH: 570,
  },
  dissatisfactory: {
    height: { number: 2400, vh: 1 },
    order: 6,
    realContentH: 520,
  },
  rules: {
    height: { number: 0, vh: 3 },
    order: 7,
    realContentH: 650,
  },
  sponsors: {
    height: { number: 1000, vh: 1 },
    order: 8,
    realContentH: 630,
  },
  finish: {
    height: { number: 9000, vh: 0 },
    order: 9,
    realContentH: 480,
  },
  signUp: {
    height: { number: 1000, vh: 1 },
    order: 10,
    realContentH: 480,
  },
};

export const getPreScreenHeightByName = (name, clientHeight = 0) => {
  let currentScreen = layout[name];
  if (currentScreen) {
    const currentOrder = currentScreen.order;
    return Object.values(layout)
      .filter(({ order }) => order < currentOrder)
      .reduce((acc, { number, vh }) => acc + number + clientHeight * vh);
  }
  return 0;
};

export const getScreenHeightByName = (name, clientHeight = 0) => {
  let currentScreen = layout[name];
  if (currentScreen) {
    let { number, vh } = currentScreen.height;
    return number + clientHeight * vh;
  }
  return 0;
};

export const getScreenHeights = (clientHeight = 0) => {
  return Object.entries(layout).reduce(
    (acc, [name, { height }]) => ({
      ...acc,
      [name]: height.number + height.vh * clientHeight,
    }),
    {}
  );
};

export const getScreenTopsArray = (clientHeight = 0) => {
  let accHeight = -clientHeight;
  return Object.entries(layout)
    .sort(({ order: orderA }, { order: orderB }) => orderA - orderB)
    .reduce((acc, [name, { height, order }]) => {
      let screenHeight = height.number + height.vh * clientHeight;
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
    const { order: currentScreenOrder, name: currentScreenName } =
      currentScreen;

    ///order less than 1 have no preScreen
    if (currentScreenOrder < 1) {
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

export const getScrollBarWidth=(scrollAreaId)=>{
  const scrollAreaElement=document.getElementById(scrollAreaId);
  if(scrollAreaElement){
    return scrollAreaElement.offsetWidth-scrollAreaElement.clientWidth;
  }
  return 17;
}

export default layout;
