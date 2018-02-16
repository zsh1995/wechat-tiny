var qcloud = require('../bower_components/wafer-client-sdk/index');
var config = require('../config');
var util = require('./util.js')
var urlMap = {
  uploadScoreUrl: `https://${config.service.host}/ajax/exam/uploadScore`,
  getPracticeScoreUrl: `https://${config.service.host}/ajax/exam/getPracticeScore`,
  invitedCountUrl:`https://${config.service.host}/ajax/user/invitor/getCount`,
  finishExamUrl:`https://${config.service.host}/ajax/exam/finishedExam`
}


function uploadScore(star, groupId, score, callback) {
  var data = {
    score: score,
    groupId: groupId,
    star: star,
  }
  return util.ajax_promise(urlMap.uploadScoreUrl, data);
}
function calcNeedTimes(stars, passTimes) {
  var needTimes = 0;
  switch (parseInt(stars)) {
    case 1: needTimes = 3 - passTimes; break;
    case 2: needTimes = 4 - passTimes; break;
    case 3: needTimes = 5 - passTimes; break;
  }
  needTimes = needTimes < 0 ? 0 : needTimes;
  return needTimes;
}
function getExamStatus(star) {
  return Promise.all([getExamRemaintimes(star),getExamPasstimes(star)])
                .then(p=>{
                  console.log(p)
                  return Promise.resolve({
                    remainTimes :p[0].data.data,
                    passTimes:p[1].data.data,
                  })
                })
}
function getExamRemaintimes(star) {
  var that = this;
  return util.ajax_promise(`https://${config.service.host}/ajax/user/getExamAvaliableTime`,{
    star:star,
  })

}

function getExamPasstimes(star) {
  var that = this;
  return util.ajax_promise(`https://${config.service.host}/ajax/exam/getExamPassTime`,{
    star:star,
  })
}

function uploadExamStatue(star, chooseList) {
  
  return util.ajax_promise(urlMap.finishExamUrl,{
    star:star,
    chooseList:chooseList,
  })
}

function getPracticeScores(star){
  return util.ajax_promise(urlMap.getPracticeScoreUrl,{
    star:star,
  })
}

function getInvitedCount(star){
  return util.ajax_promise(urlMap.invitedCountUrl,{
    star:star,
  })
}


module.exports = {
  uploadExamStatue: uploadExamStatue,
  getExamStatus: getExamStatus,
  getExamRemaintimes:getExamRemaintimes,
  calcNeedTimes: calcNeedTimes,
  uploadScore: uploadScore,
  getPracticeScores: getPracticeScores,
  getInvitedCount:getInvitedCount,
}