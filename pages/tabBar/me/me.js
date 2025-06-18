"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_index = require("../../../api/index.js");
const utils_utils = require("../../../utils/utils.js");
const common_assets = require("../../../common/assets.js");
const updateModal = () => "../../../components/updateModal.js";
const clockModal = () => "../../../components/clockModal.js";
const defaultAvatarUrl = "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
const _sfc_main = {
  data() {
    return {
      clockType: 0,
      type: "center",
      msgType: "success",
      messageText: "这是一条成功提示",
      value: "",
      avatarUrl: defaultAvatarUrl,
      nickName: "",
      showUpdateModal: false,
      showClockModal: false,
      userInfo: {
        id: 3,
        avatar: defaultAvatarUrl,
        last_login: "2024-06-23",
        level: 1,
        mobile: "",
        openid: "",
        password: "",
        reg_time: "2024-06-23",
        score: 5,
        sex: 0,
        token: "",
        username: "微信用户",
        status: 1
      },
      list: [
        {
          title: "武打卡",
          checkTitle: "浏览记录"
        },
        {
          title: "文打卡",
          checkTitle: "浏览记录"
        },
        {
          title: "我的留言",
          checkTitle: ""
        }
      ]
    };
  },
  onLoad() {
    console.log("ni.getStorageSync(config.userInfo)===", common_vendor.index$1.getStorageSync(utils_utils.config.userInfo));
    if (common_vendor.index$1.getStorageSync(utils_utils.config.userInfo)) {
      this.userInfo = common_vendor.index$1.getStorageSync(utils_utils.config.userInfo);
    } else {
      this.isLogin = false;
    }
  },
  onShow() {
    let userInfo = common_vendor.index$1.getStorageSync(utils_utils.config.userInfo);
    if (userInfo.openid) {
      api_index.getUserInfo({ openId: userInfo.openid }).then((res) => {
        this.userInfo = res.info;
        common_vendor.index$1.setStorageSync(utils_utils.config.userInfo, this.userInfo);
      });
    }
  },
  components: {
    clockModal,
    updateModal
  },
  methods: {
    //打开更新用户信息页
    openUpdateModal() {
      this.showUpdateModal = true;
      common_vendor.index$1.hideTabBar();
    },
    //保存用户信息
    saveUserInfo(data) {
      common_vendor.index$1.showTabBar();
      this.userInfo = data;
      common_vendor.index$1.setStorageSync(utils_utils.config.userInfo, this.userInfo);
      this.showUpdateModal = false;
    },
    //关闭pop弹框
    close() {
      this.$refs.popup.close();
      common_vendor.index$1.showTabBar();
    },
    pushDetail(index) {
      if (index == 1) {
        common_vendor.index$1.navigateTo({
          url: "/pages/record/record?type=0"
        });
      } else if (index == 2) {
        common_vendor.index$1.navigateTo({
          url: "/pages/record/record?type=6"
        });
      } else if (index == 3) {
        common_vendor.index$1.navigateTo({
          url: "/pages/message/message"
        });
      }
    },
    clock(index) {
      if (index == 11) {
        common_vendor.index$1.hideTabBar();
        this.$refs.popup.open("top");
        return;
      }
      this.clockType = index;
      this.showClockModal = true;
      common_vendor.index$1.hideTabBar();
    },
    saveClockIn() {
      common_vendor.index$1.showTabBar();
      this.showClockModal = false;
      let userInfo = common_vendor.index$1.getStorageSync(utils_utils.config.userInfo);
      api_index.getUserInfo({ openId: userInfo.openid }).then((res) => {
        this.userInfo = res.info;
        common_vendor.index$1.setStorageSync(utils_utils.config.userInfo, this.userInfo);
      });
    }
  }
};
if (!Array) {
  const _component_update_modal = common_vendor.resolveComponent("update-modal");
  const _component_clock_modal = common_vendor.resolveComponent("clock-modal");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_update_modal + _component_clock_modal + _easycom_uni_popup2)();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0,
    b: $data.userInfo.avatar,
    c: common_vendor.o((...args) => $options.openUpdateModal && $options.openUpdateModal(...args)),
    d: common_vendor.t($data.userInfo.username),
    e: common_vendor.t($data.userInfo.score),
    f: common_vendor.t($data.userInfo.level),
    g: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.title),
        b: common_vendor.o(($event) => $options.pushDetail(index + 1)),
        c: index == 0
      }, index == 0 ? {
        d: common_vendor.o(($event) => $options.clock(0)),
        e: common_vendor.o(($event) => $options.clock(4))
      } : {}, {
        f: index == 1
      }, index == 1 ? {
        g: common_vendor.o(($event) => $options.clock(11)),
        h: common_vendor.o(($event) => $options.clock(6))
      } : {}, {
        i: index == 2
      }, index == 2 ? {
        j: common_vendor.o(($event) => $options.clock(9))
      } : {});
    }),
    h: common_assets._imports_1$1,
    i: common_vendor.o($options.saveUserInfo),
    j: $data.showUpdateModal,
    k: common_vendor.p({
      userInfo: $data.userInfo
    }),
    l: $data.showClockModal
  }, $data.showClockModal ? {
    m: common_vendor.o($options.saveClockIn),
    n: common_vendor.p({
      type: $data.clockType
    })
  } : {}, {
    o: common_vendor.o((...args) => $options.close && $options.close(...args)),
    p: common_vendor.o((...args) => $options.close && $options.close(...args)),
    q: common_vendor.sr("popup", "635a3669-2"),
    r: common_vendor.p({
      type: "center",
      animation: false
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-635a3669"]]);
wx.createPage(MiniProgramPage);
