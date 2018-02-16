var qcloud = require('../bower_components/wafer-client-sdk/index');
var config = require('../config');
var util = require('../utils/util')
var userRightUtil = require('../utils/userRight')

var urlMap = {
  'payAnalyse':`https://${config.service.host}/weixinpay/payAnalyse`,
  'payExam':`https://${config.service.host}/weixinpay/payExam`,
}

function checkUserRight(star) {
  var that = this;
  console.log('is checking UserRight');
  return userRightUtil.getExamRemaintimes(star);

}


function _checkUserRight(star, questionId, callback_success, callback_fail, successFunc, whos) {
  return function () {
    whos.checkUserRight(star, questionId, callback_success, callback_fail, successFunc)
  }
}

function getExamNeedTimes(star) {
  var needTimes = 0;
  switch (parseInt(star)) {
    case 1: needTimes = 3; break;
    case 2: needTimes = 4; break;
    case 3: needTimes = 5; break;
  }
  return needTimes
}

function getPassedTimes(star) {
  var that = this;
  return util.ajax_promise(`https://${config.service.host}/ajax/exam/getExamPassTime`,{
    star:star
  })
}

function getExamStatus(star) {
  return getPassedTimes(star)
          .then(p => {
            return Promise.resolve((getExamNeedTimes(star) - p)>0);
          })
}

function checkProductBuy(productId){
  return util.ajax_promise(`https://${config.service.host}/ajax/user/checkPurchedReturnable`,{
    productId:productId,
  })
}
function doPayExam(star){
  return util.ajax_promise(urlMap.payExam,{
    star:star,
  })
  
}
function doPayAnalyse(star,questionId,feQuestionId,groupId){
  return util.ajax_promise(urlMap.payAnalyse,{
            star:star,
            questionId:questionId,
            feQuestionId:feQuestionId,
            groupId:groupId,
          })
}





module.exports = {
  _checkUserRight: checkUserRight,
  checkUserRight: checkUserRight,
  checkProductBuy:checkProductBuy,
  getExamNeedTimes: getExamNeedTimes,
  getExamStatus: getExamStatus,
  getPassedTimes: getPassedTimes,
  doPayExam:doPayExam,
  doPayAnalyse:doPayAnalyse,
}
