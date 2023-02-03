import iconMenuInfo from "../../assets/icon/smallic/ic_menu_info.png";
import iconMenuInfoH from "../../assets/icon/smallic/ic_menu_info_h.png";
import iconMenuList from "../../assets/icon/smallic/ic_menu_list.png";
import iconMenuListH from "../../assets/icon/smallic/ic_menu_list_h.png";
import iconMenuJob from "../../assets/icon/smallic/ic_menu_job.png";
import iconMenuJobH from "../../assets/icon/smallic/ic_menu_job_h.png";
import iconMenuStrategy from "../../assets/icon/smallic/ic_menu_strategy.png";
import iconMenuStrategyH from "../../assets/icon/smallic/ic_menu_strategy_h.png";

const menuItems = [
  {
    title: "關卡資訊",
    url: "https://2022.thef2e.com/news",
    image: iconMenuInfo,
    imageH: iconMenuInfoH,
  },
  {
    title: "作品列表",
    url: "https://2022.thef2e.com/works",
    image: iconMenuList,
    imageH: iconMenuListH,
  },
  {
    title: "攻略資源",
    url: "https://hackmd.io/ofJD4K7iSI65V19zxC7d0w",
    image: iconMenuStrategy,
    imageH: iconMenuStrategyH,
  },
  {
    title: "求職專區",
    url: "https://2022.thef2e.com/jobs",
    image: iconMenuJob,
    imageH: iconMenuJobH,
  },
];

export const getMenuItems = () => {
  return menuItems;
};
