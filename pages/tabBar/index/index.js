"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_index = require("../../../api/index.js");
const utils_utils = require("../../../utils/utils.js");
const common_assets = require("../../../common/assets.js");
const entryModal = () => "../../../components/entryModal.js";
const _sfc_main = {
  data() {
    return {
      page: 1,
      title: "FAITH文武道",
      activityList: [],
      banners: [],
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      isLogin: true
      //是否登录
    };
  },
  components: {
    entryModal
  },
  onLoad() {
    this.checkLogin();
    this.getActivityList();
    this.getBanners();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.getActivityList();
  },
  onReachBottom() {
    this.page += 1;
    this.getActivityList();
  },
  methods: {
    checkLogin() {
      if (common_vendor.index$1.getStorageSync(utils_utils.config.userInfo)) {
        this.isLogin = true;
        common_vendor.index$1.showTabBar();
      } else {
        this.isLogin = false;
        common_vendor.index$1.hideTabBar();
      }
    },
    pushDetail(id) {
      if (id == "###")
        return;
      common_vendor.index$1.navigateTo({
        url: "/pages/detail/detail?id=" + id
      });
    },
    getActivityList() {
      api_index.getHomeList({ page: this.page }).then((res) => {
        if (this.page > 1) {
          if (res.info)
            this.activityList = this.activityList.concat(res.info);
        } else {
          if (res.info)
            this.activityList = res.info;
          else
            this.activityList = [];
        }
        common_vendor.index$1.stopPullDownRefresh();
      });
    },
    //获取banner信息
    getBanners() {
      api_index.getBannerList({}).then((res) => {
        this.banners = res.info;
      });
    }
  }
};
if (!Array) {
  const _component_entry_modal = common_vendor.resolveComponent("entry-modal");
  _component_entry_modal();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.f($data.banners, (item, index, i0) => {
      return {
        a: item.src,
        b: common_vendor.o(($event) => $options.pushDetail(item.url), "banner" + index),
        c: "banner" + index
      };
    }),
    c: $data.indicatorDots,
    d: $data.autoplay,
    e: $data.interval,
    f: $data.duration,
    g: common_vendor.f($data.activityList, (item, index, i0) => {
      return {
        a: item.src,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.time),
        d: index + 1,
        e: common_vendor.o(($event) => $options.pushDetail(item.id), index + 1)
      };
    }),
    h: !$data.isLogin,
    i: common_vendor.o($options.checkLogin)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-036b8cf8"]]);
wx.createPage(MiniProgramPage);
