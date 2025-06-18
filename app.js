"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/tabBar/index/index.js";
  "./pages/tabBar/read/read.js";
  "./pages/tabBar/flag/flag.js";
  "./pages/tabBar/about/about.js";
  "./pages/tabBar/me/me.js";
  "./pages/detail/detail.js";
  "./pages/detail/about_detail.js";
  "./pages/record/record.js";
  "./pages/message/message.js";
  "./pages/hsbcWebview/hsbcWebview.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
common_vendor.index$1.loadFontFace({
  family: "Catalpa",
  source: 'url("https://trip.chinahood.net/assets/wechaapp/font/Catalpa-Extralight.ttf")',
  success() {
    console.log("success");
  }
});
createApp().app.mount("#app");
exports.createApp = createApp;
