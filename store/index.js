"use strict";
const common_vendor = require("../common/vendor.js");
new common_vendor.index.Store({
  state: {
    userInfo: null,
    language: 1,
    curNum: 1,
    showNotice: false,
    isDisabled: false,
    isLogin: true,
    //false 无需登录 true 需要登录
    isPrompt: true
    // true 需显示 false 不显示
  },
  mutations: {
    changeUserInfo(state, value) {
      state.userInfo = value;
    },
    changeLanguage(state, value) {
      state.language = value;
    },
    changeCurNum(state, value) {
      state.curNum = value;
    },
    changeShowNotice(state, value) {
      state.showNotice = value;
    },
    changeIsDisabled(state, value) {
      state.isDisabled = value;
    },
    changeIsLogin(state, value) {
      state.isLogin = value;
    },
    changeIsPrompt(state, value) {
      state.isPrompt = value;
    }
  },
  actions: {
    setUserInfo(context, value) {
      context.commit("changeUserInfo", value);
    },
    setLanguage(context, value) {
      context.commit("changeLanguage", value);
    },
    setCurNum(context, value) {
      context.commit("changeCurNum", value);
    },
    setShowNotice(context, value) {
      context.commit("changeShowNotice", value);
    },
    setIsDisabled(context, value) {
      context.commit("changeIsDisabled", value);
    },
    setIsLogin(context, value) {
      context.commit("changeIsLogin", value);
    },
    setIsPrompt(context, value) {
      context.commit("changeIsPrompt", value);
    }
  },
  modules: {}
});
