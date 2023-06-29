export const getAnimationDataM = (offset) => {
  const dataObj = {
    showTitle: false,
    showEnvious: false,
    showWish: false,
    showComplex: false,
  };

  if (offset >= 100 && offset < 400) {
    dataObj.showTitle = true;
  } else if (offset >= 400 && offset < 700) {
    dataObj.showTitle = true;
    dataObj.showEnvious = true;
  } else if (offset >= 700 && offset < 1000) {
    dataObj.showTitle = true;
    dataObj.showEnvious = true;
    dataObj.showWish = true;
  } else if (offset >= 1000) {
    dataObj.showTitle = true;
    dataObj.showEnvious = true;
    dataObj.showWish = true;
    dataObj.showComplex = true;
  }
  return dataObj;
};

export const getAnimationData = (offset,clientHeight) => {
  const dataObj = {
    showTitle: false,
    showEnvious: false,
    showWish: false,
    showComplex: false,
    LBgD9TStyle: { XOffset: 0, YOffset: 0, scale: 1 },
    BgVisible: false,
    RBgD9TStyle: { XOffset: 0, YOffset: 0, scale: 1 },
  };
  if (offset >= clientHeight && offset < clientHeight + 300) {
    dataObj.showTitle = true;
    dataObj.BgVisible = true;
  } else if (offset >= clientHeight + 300 && offset < clientHeight + 600) {
    dataObj.showTitle = true;
    dataObj.showEnvious = true;

    dataObj.BgVisible = true;
    dataObj.LBgD9TStyle = { XOffset: 100, YOffset: 5, scale: 0.5 };
    dataObj.RBgD9TStyle = { XOffset: -100, YOffset: 5, scale: 0.5 };
  } else if (offset >= clientHeight + 600 && offset < clientHeight + 900) {
    dataObj.showTitle = true;
    dataObj.showEnvious = true;
    dataObj.showWish = true;

    dataObj.BgVisible = true;

    dataObj.LBgD9TStyle = { XOffset: 200, YOffset: -10, scale: 0.5 };
    dataObj.RBgD9TStyle = { XOffset: -200, YOffset: -10, scale: 0.5 };
  } else if (offset >= clientHeight + 900 && offset < clientHeight + 1200) {
    dataObj.showTitle = true;
    dataObj.showEnvious = true;
    dataObj.showWish = true;
    dataObj.showComplex = true;
  } else if (
    offset >= clientHeight + 1200 &&
    offset < 2 * clientHeight + 1200
  ) {
    dataObj.showTitle = true;
    dataObj.showEnvious = true;
    dataObj.showWish = true;
    dataObj.showComplex = true;
  }

  return dataObj;
};
