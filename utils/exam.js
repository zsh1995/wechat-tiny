var qcloud = require('../bower_components/wafer-client-sdk/index');
var config = require('../config');
var util = require('./util.js')

let urlMap = {
  'getQuestions': `https://${config.service.host}/ajax/exam/getQuestions`,
  'getExam': `https://${config.service.host}/ajax/exam/getExamQuestions`,
  'checkAnalysePurched':`https://${config.service.host}/ajax/user/checkPurchedAnalyse`,
  'getAnalyseUrl':`https://${config.service.host}/ajax/exam/getAnalyse`,
}

function getPraciceQuestions(star,groupId){
  return util.ajax_promise(urlMap.getQuestions, {
    star:star,
    groupId:groupId,
  })
}

function getExamQuestions(star){
  return util.ajax_promise(urlMap.getExam, {
    star:star,
  })
}

function checkAnalysePurched(star , questionId){
  return util.ajax_promise(urlMap.checkAnalysePurched,{
    star:star,
    questionId:questionId,
  })
}
function getAnalyse(star,questionId){
  return util.ajax_promise(urlMap.getAnalyseUrl,{
    star:star,
    questionId:questionId,
  })
}

module.exports = {
  getPraciceQuestions: getPraciceQuestions,
  getExamQuestions:getExamQuestions,
  getAnalyse:getAnalyse,
  checkAnalysePurched:checkAnalysePurched,
}