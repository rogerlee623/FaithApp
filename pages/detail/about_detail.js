"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      //
      activityDetail: [],
      notes: {
        total: 10,
        list: [
          {
            avatar: "/static/resources/avatar.png",
            name: "特有文艺范",
            time: "2024-06-03",
            description: "此次调查面向全球16个主要市场的3300多家企业进行，涵盖全球主要经济体，包括目前已在中国市场开展业务或计划开拓中国市场的企业。调查显示，海外企业将供应链、技术和创新、数字化能力和平台作为未来一年在中国市场的三大投资重点。"
          },
          {
            avatar: "/static/resources/avatar.png",
            name: "特有文艺范",
            time: "2024-06-03",
            description: "此次调查面向全球16个主要市场的3300多家企业进行，涵盖全球主要经济体，包括目前已在中国市场开展业务或计划开拓中国市场的企业。调查显示，海外企业将供应链、技术和创新、数字化能力和平台作为未来一年在中国市场的三大投资重点。"
          }
        ]
      }
    };
  },
  onLoad(options) {
    console.log("options====", options);
    this.getinfo(options.id);
  },
  methods: {
    getUrlParam(url, paramName) {
      const searchParams = new URLSearchParams(url.split("?")[1]);
      return searchParams.get(paramName);
    },
    getinfo(id) {
      const paramValue = id;
      if (paramValue == 1) {
        this.activityDetail.push({
          title: "FAITH ERG Co- Chairs - Role Information",
          description1: "",
          src: "https://trip.chinahood.net/assets/wechaapp/images/about_1.png",
          description2: ""
        });
      }
      if (paramValue == 2) {
        this.activityDetail.push({
          title: "FAITH ERG 主题活动即将上线",
          description1: "",
          src: "https://trip.chinahood.net/assets/wechaapp/images/about_2.png",
          description2: ""
        });
      }
      if (paramValue == 3) {
        this.activityDetail.push({
          title: "FAITH ERG CUBE - 《与神对话》读书分享第一期",
          description1: "",
          src: "https://trip.chinahood.net/assets/wechaapp/images/about_3.png",
          description2: ""
        });
      }
      if (paramValue == 4) {
        this.activityDetail.push({
          title: "FAITH ERG CUBE - 《与神对话》读书会",
          description1: "",
          src: "https://trip.chinahood.net/assets/wechaapp/images/about_4.png",
          description2: ""
        });
      }
      if (paramValue == 5) {
        this.activityDetail.push({
          title: "“东南西北中，圆融在汇丰”\n感恩",
          description1: "",
          src: "https://trip.chinahood.net/assets/wechaapp/images/about_5.png",
          description2: ""
        });
      }
    }
    // {
    // 	title: '汇丰进博特别报告：海外企业继续看好中国市场',
    // 	description1: '中国的制造业优势、消费市场规模以及数字经济和可持续发展领域的机遇，是吸引海外企业加大布局的主要动力。',
    // 	src: 'https://api.softouchco.com/hsbc/activity_detial.png',
    // 	description2: '汇丰发布为第六届中国国际进口博览会特别定制的《海外企业看中国2023》调查报告。报告显示，受中国疫后经济复苏的鼓舞，超过八成（87%）受访海外企业表示将拓展中国业务布局。',
    // },
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.activityDetail, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.description1),
        c: item.src,
        d: common_vendor.t(item.description2)
      };
    }),
    b: common_vendor.t($data.notes.total),
    c: common_vendor.f($data.notes.list, (item, index, i0) => {
      return {
        a: item.avatar,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.time),
        d: common_vendor.t(item.description),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ff0e55b9"]]);
wx.createPage(MiniProgramPage);
