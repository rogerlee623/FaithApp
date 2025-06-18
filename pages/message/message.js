"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_utils = require("../../utils/utils.js");
const _sfc_main = {
  data() {
    return {
      type: 1,
      info: {
        count: 3,
        score: 30,
        list: []
      }
    };
  },
  onLoad(options) {
    this.getListInfo();
  },
  methods: {
    getListInfo() {
      let userInfo = common_vendor.index$1.getStorageSync(utils_utils.config.userInfo);
      api_index.personMessageList({ openId: userInfo.openid }).then((res) => {
        this.info.list = res.info;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.info.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.addtime),
        b: common_vendor.t(item.article),
        c: common_vendor.t(item.content)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4c1b26cf"]]);
wx.createPage(MiniProgramPage);
