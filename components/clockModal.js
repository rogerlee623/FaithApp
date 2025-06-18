"use strict";
const common_vendor = require("../common/vendor.js");
const api_index = require("../api/index.js");
const utils_utils = require("../utils/utils.js");
const common_assets = require("../common/assets.js");
const defaultFile = "/static/upload-default.png";
const _sfc_main = {
  name: "updateInfo",
  props: {
    type: Number,
    default: 0
  },
  data() {
    return {
      file: defaultFile,
      log: "",
      title: "发布信息",
      alert_text: "发布信息",
      placeholder: "填写"
    };
  },
  watch: {
    type: {
      handler(value) {
        console.log("userInfo===", value);
        this.file = defaultFile;
        this.log = "";
        switch (value) {
          case 0:
            {
              this.title = "超慢跑记录上传";
              this.alert_text = "请上传超慢跑打卡图片或运动数据";
              this.placeholder = "请上传超慢跑打卡图片或运动数据";
            }
            break;
          case 4:
            {
              this.title = "自我训练记录上传";
              this.alert_text = "请上传运动记录图，如：运动数据、运动打卡等";
              this.placeholder = "请上传运动记录图，如：运动数据、运动打卡等";
            }
            break;
          case 6:
            {
              this.title = "大师课阅听记录";
              this.alert_text = "上传大师课播放历史或收听页面截屏";
              this.placeholder = "可在此笔记阅听进度";
            }
            break;
          case 9:
            {
              this.title = "留言反馈";
              this.alert_text = "留言反馈";
              this.placeholder = "请描述问题或填写反馈内容";
            }
            break;
          default:
            {
              this.title = "发布信息";
              this.alert_text = "发布信息";
              this.placeholder = "填写";
            }
            break;
        }
      },
      immediate: true,
      //设置为 true 时，第一次进入页面时即监听
      deep: true
      // 深度监听父组件传过来对象变化 
    }
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    save() {
      if (this.file == defaultFile) {
        common_vendor.index$1.showToast({
          title: "请选择图片",
          icon: "none"
        });
        return;
      }
      if (!this.log) {
        common_vendor.index$1.showToast({
          title: "请填写内容",
          icon: "none"
        });
        return;
      }
      let userInfo = common_vendor.index$1.getStorageSync(utils_utils.config.userInfo);
      let openId = userInfo.openid;
      let param = {
        type: this.type,
        openId,
        content: this.log,
        imgUrl: this.file
      };
      console.log("param===", param);
      api_index.checkIn(param).then((res) => {
        common_vendor.index$1.showToast({
          title: res.msg
        });
        this.$emit("close");
      });
    },
    chooseImage() {
      let that = this;
      common_vendor.index$1.chooseImage({
        count: 1,
        // 默认9, 设置图片的选择数量
        sizeType: ["original", "compressed"],
        // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"],
        // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          console.log(res.tempFilePaths);
          common_vendor.index$1.uploadFile({
            url: "https://trip.chinahood.net/api/Upfiles/pic",
            // 后台上传接口
            filePath: res.tempFilePaths[0],
            // 上传图片 url
            name: "file",
            header: {
              "Content-Type": "multipart/form-data"
              // 'Authorization':uni.getStorageSync('token')
            },
            success(res2) {
              let data = JSON.parse(res2.data);
              that.file = decodeURI(data.url);
            }
          });
        },
        fail: (err) => {
          console.log("选择图片失败", err);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.t($data.title),
    c: $data.file,
    d: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args)),
    e: common_assets._imports_1$2,
    f: common_vendor.t($data.alert_text),
    g: $data.placeholder,
    h: $data.log,
    i: common_vendor.o(($event) => $data.log = $event.detail.value),
    j: common_vendor.o((...args) => $options.cancel && $options.cancel(...args)),
    k: common_vendor.o((...args) => $options.save && $options.save(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-67279723"]]);
wx.createComponent(Component);
