"use strict";
const common_vendor = require("../common/vendor.js");
const api_index = require("../api/index.js");
const utils_utils = require("../utils/utils.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  name: "entry",
  data() {
    return {
      workNumber: "",
      errorInfo: ""
    };
  },
  methods: {
    /**
     * 规则验证
     * 工号规则：八位数，首位数字1、2、4、5
    */
    validRules() {
      var valid = true;
      if (!this.workNumber) {
        this.errorInfo = "请输入工号";
        valid = false;
      } else if (this.workNumber.length != 8) {
        this.errorInfo = "抱歉，输入工号不正确";
        valid = false;
      } else {
        let numberFirst = this.workNumber.substr(0, 1);
        if (numberFirst != 1 && numberFirst != 2 && numberFirst != 4 && numberFirst == 5) {
          this.errorInfo = "抱歉，输入工号不正确";
          valid = false;
        }
      }
      if (valid == true)
        this.errorInfo = "";
      return valid;
    },
    cancel() {
      common_vendor.index$1.exitMiniProgram({
        success: function() {
          console.log("退出小程序成功");
        },
        fail: function(err) {
          console.log("退出小程序失败", err);
        }
      });
    },
    //获取用户信息
    getUserInfo(e) {
      if (!this.validRules())
        return;
      console.log("登录==", this.workNumber);
      common_vendor.index$1.showLoading({
        mask: true,
        title: "登录中..."
      });
      let that = this;
      var p = this.getSetting();
      p.then(function(isAuth) {
        console.log("是否已经授权", isAuth);
        if (isAuth) {
          let eData = JSON.parse(e.detail.rawData);
          console.log("eData===", eData);
          console.log("e.target===", e.target);
          common_vendor.index$1.login({
            success(res) {
              let param = {
                sign: that.workNumber,
                code: res.code,
                rawData: e.detail.rawData,
                encryptedData: e.target.encryptedData,
                iv: e.target.iv,
                signature: e.target.signature
              };
              api_index.userLogin(param).then((res2) => {
                console.log("用户信息res====", res2);
                common_vendor.index$1.setStorageSync(utils_utils.config.userInfo, res2.info);
                that.$emit("close", true);
              });
              console.log("param====", param);
            },
            fail(error) {
              common_vendor.index$1.showToast({
                title: "获取用户信息失败",
                icon: "none"
              });
            }
          });
        } else {
          common_vendor.index$1.showToast({
            title: "授权失败，请确认授权已开启",
            mask: true,
            icon: "none"
          });
        }
      });
    },
    //获取用户的当前设置
    getSetting() {
      return new Promise(function(resolve, reject) {
        common_vendor.index$1.getSetting({
          success: function(res) {
            if (res.authSetting["scope.userInfo"]) {
              console.log("存在");
              console.log("res.authSetting===", res.authSetting);
              resolve(true);
            } else {
              console.log("不存在");
              resolve(false);
            }
          }
        });
      }).catch((e) => {
        console.log(e);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0,
    b: $data.workNumber,
    c: common_vendor.o(($event) => $data.workNumber = $event.detail.value),
    d: $data.errorInfo
  }, $data.errorInfo ? {
    e: common_vendor.t($data.errorInfo)
  } : {}, {
    f: common_vendor.o((...args) => $options.cancel && $options.cancel(...args)),
    g: common_vendor.o((...args) => $options.getUserInfo && $options.getUserInfo(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5523583c"]]);
wx.createComponent(Component);
