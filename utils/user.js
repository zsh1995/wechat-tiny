var qcloud = require('../bower_components/wafer-client-sdk/index');
var config = require('../config');
var util = require('./util.js')

let urlMap = {
  'exerciseUrl': `https://${config.service.host}/ajax/user/exerciseStatus`,
  'practiceUrl': `https://${config.service.host}/ajax/user/practiceStatus`,
  'getRankUrl': `https://${config.service.host}/ajax/user/getRank`,
  'getDetailInfoUrl': `https://${config.service.host}/ajax/user/detailInfo`,
  'purchRecordUrl': `https://${config.service.host}/ajax/user/purchRecord`,
  'getInvited': `https://${config.service.host}/ajax/user/invitor/getInvitedList`,
  'getInvitor': `https://${config.service.host}/ajax/user/invitor/getInvitor`,
  'getUserInfoById': `https://${config.service.host}/ajax/user//invitor/getUserInfo`,
  'uploadUserInfoUrl': `https://${config.service.host}/ajax/user/uploadUserInfo`,
  'setInvitorUrl': `https://${config.service.host}/ajax/user/invitor/setInvitor`
}
function setInvitor(id){
  return util.ajax_promise(urlMap.setInvitorUrl,{
    invitorId:id
  })
}
function getExercise(){
    return util.ajax_promise(urlMap.exerciseUrl)
}
function getPractice(){
    return util.ajax_promise(urlMap.practiceUrl)
}
function getRank(){
    return util.ajax_promise(urlMap.getRankUrl)
}
function getUserInfo(){
    return util.ajax_promise(urlMap.getDetailInfoUrl)
}
function getPurchRecord(){
    return util.ajax_promise(urlMap.purchRecordUrl)
}
function getInvitedUser(){
    return util.ajax_promise(urlMap.getInvited)
}
function getInvitor(){
    return util.ajax_promise(urlMap.getInvitor)
}
function getUserInfoById(id){
    return util.ajax_promise(urlMap.getUserInfoById,{
        userId : id,
    })
}

function uploadUserInfo(userInfo){
    return util.ajax_promise_json(urlMap.uploadUserInfoUrl,userInfo)
}

module.exports = {
    getExerciseFlag: getExercise,
    getPracticeFlag:getPractice,
    getRank:getRank,
    getUserInfo:getUserInfo,
    getPurchRecord:getPurchRecord,
    getInvitor:getInvitor,
    getInvitedUser:getInvitedUser,
    getUserInfoById:getUserInfoById,
    uploadUserInfo:uploadUserInfo,
    setInvitor: setInvitor,

  }