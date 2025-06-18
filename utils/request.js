"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "https://trip.chinahood.net";
const request = (url, data = {}, type = "GET") => {
  let url_str = baseURL + url;
  console.log("url_str====", url_str);
  console.log("param====", data);
  let header = {
    "content-type": type == "POST" ? "application/x-www-form-urlencoded" : "application/json"
  };
  return new Promise((resolve, reject) => {
    common_vendor.index$1.request({
      url: url_str,
      //真实接口地址。
      method: type,
      //请求的方式
      data,
      //参数
      header,
      // 成功使用resolve
      success: (res) => {
        res = res.data;
        console.log("res====", res);
        if (res.status == 1) {
          common_vendor.index$1.hideLoading();
          resolve(res);
        } else {
          common_vendor.index$1.showToast({
            title: res.msg,
            icon: "none"
          });
          reject(res);
        }
      },
      //失败调用reject
      fail: (err) => {
        console.log("err===", err);
        if (err.errMsg) {
          common_vendor.index$1.showToast({
            title: err.errMsg,
            icon: "none"
          });
        } else {
          common_vendor.index$1.showToast({
            title: "服务器错误",
            icon: "none"
          });
        }
        reject(err);
      }
    });
  });
};
exports.request = request;
