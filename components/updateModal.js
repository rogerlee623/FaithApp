"use strict";
const common_vendor = require("../common/vendor.js");
const utils_utils = require("../utils/utils.js");
const api_index = require("../api/index.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  name: "updateInfo",
  props: {
    userInfo: Object
  },
  watch: {
    userInfo: {
      handler(value) {
        console.log("userInfo===", value);
        this.avatarUrl = value.avatar;
        this.username = value.username;
        this.openId = value.openId;
      },
      immediate: true,
      //设置为 true 时，第一次进入页面时即监听
      deep: true
      // 深度监听父组件传过来对象变化 
    }
  },
  data() {
    return {
      openId: "",
      avatarUrl: "",
      username: ""
    };
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    save() {
      console.log("avatar===", this.avatarUrl);
      let that = this;
      common_vendor.index$1.createSelectorQuery().in(this).select("#nickName").fields({
        properties: ["value"]
      }).exec((res) => {
        var _a;
        that.username = (_a = res == null ? void 0 : res[0]) == null ? void 0 : _a.value;
        console.log("获取昵称", that.username);
        if (!that.username) {
          common_vendor.index$1.showToast({
            title: "请填写昵称",
            icon: "error"
          });
          return;
        }
        let userInfo = common_vendor.index$1.getStorageSync(utils_utils.config.userInfo);
        console.log("userInfo====", userInfo);
        let param = {
          nickName: that.username,
          avatarUrl: that.avatarUrl,
          openId: userInfo.openid
        };
        api_index.updateUserInfo(param).then((res2) => {
          common_vendor.index$1.showToast({
            title: "更新成功",
            icon: "success"
          });
          var userResult = JSON.parse(JSON.stringify(that.userInfo));
          userResult.avatar = that.avatarUrl;
          userResult.username = that.username;
          this.$emit("saveUserInfo", userResult);
        });
      });
    },
    chooseavatar(e) {
      let that = this;
      console.log("e====", e);
      let { avatarUrl } = e.detail;
      common_vendor.index$1.uploadFile({
        url: "https://trip.chinahood.net/api/Upfiles/pic",
        // 后台上传接口
        filePath: avatarUrl,
        // 上传图片 url
        name: "file",
        header: {
          "Content-Type": "multipart/form-data"
          // 'Authorization':uni.getStorageSync('token')
        },
        success(res) {
          let data = JSON.parse(res.data);
          that.avatarUrl = decodeURI(data.url);
          console.log(that.avatarUrl);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_assets._imports_1$2,
    c: $data.avatarUrl,
    d: common_vendor.o((...args) => $options.chooseavatar && $options.chooseavatar(...args)),
    e: $data.username,
    f: common_vendor.o(($event) => $data.username = $event.detail.value),
    g: common_vendor.o((...args) => $options.save && $options.save(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6590cc17"]]);
wx.createComponent(Component);
