"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_utils = require("../../utils/utils.js");
const _sfc_main = {
  data() {
    return {
      popImgUrl: "",
      type: 0,
      page: 1,
      info: {
        count: 0,
        score: 0,
        list: []
      }
    };
  },
  // onPullDownRefresh() {
  // 	// 实现下拉刷新的数据更新逻辑
  // 	console.log('下拉刷新事件被触发');
  // 	// 假设这里是异步获取数据的操作
  // 	setTimeout(() => {
  // 		// 数据更新完毕后，停止下拉刷新动画
  // 		uni.stopPullDownRefresh();
  // 	}, 2000);
  // },
  onPullDownRefresh() {
    this.page = 1;
    this.getListInfo();
  },
  onReachBottom() {
    this.page += 1;
    this.getListInfo();
  },
  // https://trip.chinahood.net/api/checkin/checkinList? openId=ohiEf7fXD2LLbjhJFo0cUGsLOXA0&catid=4&page=1
  onLoad(options) {
    this.type = options.type;
    this.getListInfo();
  },
  methods: {
    changeType(type) {
      this.type = type;
      this.page = 1;
      this.getListInfo();
    },
    open(pic) {
      this.popImgUrl = pic;
      this.$refs.popup.open("top");
    },
    close() {
      this.$refs.popup.close();
    },
    getListInfo() {
      let userInfo = common_vendor.index$1.getStorageSync(utils_utils.config.userInfo);
      let openId = userInfo.openid;
      let param = {
        openId,
        type: this.type,
        page: this.page
      };
      api_index.checkInList(param).then((res) => {
        if (this.page > 1) {
          if (res.info)
            this.info.list = this.info.list.concat(res.info);
          if (res.score)
            this.info.score = res.score;
          if (res.count)
            this.info.count = res.count;
        } else {
          if (res.info) {
            this.info.list = res.info;
            this.info.score = res.score;
            this.info.count = res.count;
          } else {
            this.info = {
              count: 0,
              score: 0,
              list: []
            };
          }
        }
        common_vendor.index$1.stopPullDownRefresh();
      });
      return;
    }
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.type == 6 ? "文打卡" : "武打卡"),
    b: common_vendor.t($data.info.count),
    c: common_vendor.t($data.info.score),
    d: $data.type != 6
  }, $data.type != 6 ? {
    e: common_vendor.o(($event) => $options.changeType(0)),
    f: common_vendor.n($data.type == 0 ? "button-select" : ""),
    g: common_vendor.o(($event) => $options.changeType(4)),
    h: common_vendor.n($data.type == 4 ? "button-select" : "")
  } : {}, {
    i: !$data.info.list.length
  }, !$data.info.list.length ? {} : {
    j: common_vendor.f($data.info.list, (item, index, i0) => {
      return {
        a: item.pic,
        b: common_vendor.o(($event) => $options.open(item.pic)),
        c: common_vendor.t(item.createtime),
        d: common_vendor.t(item.content)
      };
    })
  }, {
    k: $data.popImgUrl,
    l: common_vendor.o((...args) => $options.close && $options.close(...args)),
    m: common_vendor.sr("popup", "ef6850c5-0"),
    n: common_vendor.p({
      type: "center",
      animation: false
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ef6850c5"]]);
wx.createPage(MiniProgramPage);
