"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_index = require("../../../api/index.js");
const utils_utils = require("../../../utils/utils.js");
const common_assets = require("../../../common/assets.js");
const entryModal = () => "../../../components/entryModal.js";
const _sfc_main = {
  components: {
    entryModal
  },
  data() {
    return {
      isLogin: true,
      //是否登录
      /**
       * @description
       * id
       * type 人物介绍/推荐活动
       * src 顶部图片
       * title 标题
       * time 时间
       * description 具体内容 
       **/
      flagList: [],
      //列表数据
      page: 1,
      typeList: [
        {
          name: "推荐活动",
          value: 1
        },
        {
          name: "人物介绍",
          value: 2
        }
      ]
    };
  },
  onLoad() {
    this.checkLogin();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.getList();
  },
  onReachBottom() {
    this.page += 1;
    this.getList();
  },
  onShareAppMessage(e) {
    let that = this;
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({});
        that.shareArticle(e.target.dataset.url);
      }, 10);
    });
    return {
      title: e.target.dataset.title,
      //自定义分享标题			 
      path: "/pages/detail/detail?id=" + e.target.dataset.url,
      imageUrl: e.target.dataset.src,
      //可设置默认分享图，不设置默认截取头部5:4
      promise,
      success: function(res) {
        console.log("res=====", res);
        console.log("分享成功");
      }
    };
  },
  methods: {
    shareArticle(id) {
      let userInfo = common_vendor.index$1.getStorageSync(utils_utils.config.userInfo);
      let openId = userInfo.openid;
      let param = {
        openId: userInfo.openid,
        aid: id
      };
      api_index.share(param).then((res) => {
        common_vendor.index$1.showToast({
          title: "分享成功"
        });
        api_index.getUserInfo({ openId }).then((res2) => {
          if (res2.info)
            common_vendor.index$1.setStorageSync(utils_utils.config.userInfo, res2.info);
        });
      });
    },
    checkLogin() {
      if (common_vendor.index$1.getStorageSync(utils_utils.config.userInfo)) {
        this.isLogin = true;
        common_vendor.index$1.showTabBar();
        this.getList();
      } else {
        this.isLogin = false;
        common_vendor.index$1.hideTabBar();
      }
    },
    getList() {
      let userInfo = common_vendor.index$1.getStorageSync(utils_utils.config.userInfo);
      let param = {
        openId: userInfo.openid,
        page: this.page
      };
      api_index.getListInfoData(2, param).then((res) => {
        if (this.page > 1) {
          if (res.info)
            this.flagList = this.flagList.concat(res.info);
        } else {
          if (res.info)
            this.flagList = res.info;
          else
            this.flagList = [];
        }
        common_vendor.index$1.stopPullDownRefresh();
      });
      return;
    },
    getTypeName(type) {
      let arrM = this.typeList.filter((item) => item.value == type);
      if (arrM.length)
        return arrM[0].name;
      else
        return "推荐活动";
    },
    pushDetail(id) {
      common_vendor.index$1.navigateTo({
        url: "/pages/detail/detail?id=" + id
      });
    },
    likeIn(item, index) {
      if (item.like == 1) {
        common_vendor.index$1.showToast({
          title: "请勿重复操作！",
          icon: "none"
        });
        return;
      }
      let userInfo = common_vendor.index$1.getStorageSync(utils_utils.config.userInfo);
      let openId = userInfo.openid;
      let param = {
        openId,
        aid: item.id
      };
      api_index.like(param).then((res) => {
        common_vendor.index$1.showToast({
          title: "点赞成功"
        });
        this.flagList[index].like = 1;
        api_index.getUserInfo({ openId }).then((res2) => {
          if (res2.info)
            common_vendor.index$1.setStorageSync(utils_utils.config.userInfo, res2.info);
        });
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
    a: common_assets._imports_0$2,
    b: common_vendor.f($data.flagList, (item, index, i0) => {
      return {
        a: item.src,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.time),
        d: common_vendor.t(item.description),
        e: common_vendor.o(($event) => $options.pushDetail(item.id), "flag" + index),
        f: item.like == 1 ? "/static/resources/collect-sel.png" : "/static/resources/collect.png",
        g: common_vendor.o(($event) => $options.likeIn(item, index), "flag" + index),
        h: item.id,
        i: item.src,
        j: item.title,
        k: "flag" + index
      };
    }),
    c: common_assets._imports_1,
    d: !$data.isLogin,
    e: common_vendor.o($options.checkLogin)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4965bba6"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
