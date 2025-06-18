"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_utils = require("../../utils/utils.js");
const messageModal = () => "../../components/messageModal.js";
const _sfc_main = {
  components: {
    messageModal
  },
  data() {
    return {
      videolink: "https://trip.chinahood.net/uploads/ueditor/video/20240705/1720178708317441.mp4",
      showMessageModal: false,
      info: {
        "id": "",
        "type": "",
        "src": "",
        "title": "",
        "time": "",
        "content": "",
        videolink: ""
      },
      list: [],
      activityDetail: {
        title: "汇丰进博特别报告：海外企业继续看好中国市场",
        description1: "中国的制造业优势、消费市场规模以及数字经济和可持续发展领域的机遇，是吸引海外企业加大布局的主要动力。",
        src: "https://api.softouchco.com/hsbc/activity_detial.png",
        description2: "汇丰发布为第六届中国国际进口博览会特别定制的《海外企业看中国2023》调查报告。报告显示，受中国疫后经济复苏的鼓舞，超过八成（87%）受访海外企业表示将拓展中国业务布局。"
      },
      notes: {
        total: 10,
        list: [
          {
            avatarurl: "/static/resources/avatar.png",
            nickname: "特有文艺范",
            addtime: "2024-06-03",
            content: "或计。"
          },
          {
            avatarurl: "/static/resources/avatar.png",
            nickname: "特有文艺范",
            addtime: "2024-06-03",
            content: "此次调查面向或计划开拓中国市场的企业。调查显示，海外企业将供应链、技术和创新、数字化能力和平台作为未来一年在中国市场的三大投资重点。"
          }
        ]
      }
    };
  },
  onLoad(options) {
    let id = options.id;
    api_index.getArticleInfo(id).then((res) => {
      console.log("res===", res);
      this.info = res.info;
    });
    api_index.getMessageList({ aid: id }).then((res) => {
      if (res.info) {
        this.list = res.info;
      }
    });
  },
  methods: {
    openWebView() {
      common_vendor.index$1.navigateTo({
        url: "/pages/hsbcWebview/hsbcWebview?videolink=" + this.info.videolink
      });
    },
    close(boolean) {
      if (boolean) {
        api_index.getMessageList({ aid: this.info.id }).then((res) => {
          this.list = res.info;
        });
        let userInfo = common_vendor.index$1.getStorageSync(utils_utils.config.userInfo);
        api_index.getUserInfo({ openId: userInfo.openid }).then((res) => {
          if (res.info)
            common_vendor.index$1.setStorageSync(utils_utils.config.userInfo, res.info);
        });
      }
      this.showMessageModal = false;
    }
  }
};
if (!Array) {
  const _component_message_modal = common_vendor.resolveComponent("message-modal");
  _component_message_modal();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.info.title),
    b: $data.info.content,
    c: $data.info.videolink
  }, $data.info.videolink ? {
    d: $data.info.videolink,
    e: $data.info.src
  } : {}, {
    f: common_vendor.t($data.list.length),
    g: common_vendor.o(($event) => $data.showMessageModal = true),
    h: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.avatarurl,
        b: common_vendor.t(item.nickname),
        c: common_vendor.t(item.addtime),
        d: common_vendor.t(item.content),
        e: index
      };
    }),
    i: $data.showMessageModal,
    j: common_vendor.o($options.close),
    k: common_vendor.p({
      aid: $data.info.id
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-eca06f3c"]]);
wx.createPage(MiniProgramPage);
