"use strict";
const common_vendor = require("../common/vendor.js");
const api_index = require("../api/index.js");
const utils_utils = require("../utils/utils.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  props: {
    aid: String
  },
  name: "messageModal",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    cancel() {
      this.$emit("close", false);
    },
    save() {
      let userInfo = common_vendor.index$1.getStorageSync(utils_utils.config.userInfo);
      let openId = userInfo.openid;
      let param = {
        openId,
        aid: this.aid,
        content: this.message
      };
      api_index.levaveMessage(param).then((res) => {
        this.message = "";
        common_vendor.index$1.showToast({
          title: "留言成功"
        });
        this.$emit("close", true);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: $data.message,
    c: common_vendor.o(($event) => $data.message = $event.detail.value),
    d: common_vendor.o((...args) => $options.cancel && $options.cancel(...args)),
    e: common_vendor.o((...args) => $options.save && $options.save(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3c1cd6e0"]]);
wx.createComponent(Component);
