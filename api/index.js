"use strict";
const utils_request = require("../utils/request.js");
function getListInfoData(id, data) {
  return utils_request.request(
    "/listinfo/" + id,
    data,
    "GET"
  );
}
function getBannerList(data) {
  return utils_request.request("/banner", data, "GET");
}
function userLogin(data) {
  return utils_request.request("/api/index/login", data, "GET");
}
function getUserInfo(data) {
  return utils_request.request("/api/index/getMyInfo", data, "GET");
}
function updateUserInfo(data) {
  return utils_request.request("/api/index/upinfo", data, "POST");
}
function getHomeList(data) {
  return utils_request.request("/homeinfo", data, "GET");
}
function getArticleInfo(id) {
  return utils_request.request("/article/" + id, {}, "GET");
}
function getMessageList(data) {
  return utils_request.request("/api/index/messagelist", data, "GET");
}
function levaveMessage(data) {
  return utils_request.request("/api/index/message", data, "GET");
}
function checkIn(data) {
  return utils_request.request("/api/checkin/selfCheckin", data, "GET");
}
function checkInList(data) {
  return utils_request.request("/api/checkin/checkinList", data, "GET");
}
function like(data) {
  return utils_request.request("/api/index/like", data, "GET");
}
function personMessageList(data) {
  return utils_request.request("/api/index/messageList", data, "GET");
}
function share(data) {
  return utils_request.request("/api/index/share", data, "GET");
}
exports.checkIn = checkIn;
exports.checkInList = checkInList;
exports.getArticleInfo = getArticleInfo;
exports.getBannerList = getBannerList;
exports.getHomeList = getHomeList;
exports.getListInfoData = getListInfoData;
exports.getMessageList = getMessageList;
exports.getUserInfo = getUserInfo;
exports.levaveMessage = levaveMessage;
exports.like = like;
exports.personMessageList = personMessageList;
exports.share = share;
exports.updateUserInfo = updateUserInfo;
exports.userLogin = userLogin;
