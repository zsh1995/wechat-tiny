var qcloud = require('../bower_components/wafer-client-sdk/index');
var config = require('../config');
var util = require('./util.js')
var urlMap = {
  uploadScoreUrl: `https://${config.service.host}/uploadScore`,
}


function uploadScore(stars, groupId, score, callback) {
  var data = {
    score: score,
    groud_id: groupId,
    stars: stars,
    star: parseInt(stars),
  }
  util.ajax_promise(urlMap.uploadScoreUrl, data)
    .then(result => {
      if (callback != undefined) callback();
    })
    .catch(erro=>{
      console.log(erro);
    })
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
function getExamStatus(stars, callback) {
  getExamRemaintimes(stars, remaintimes => {
    var x = remaintimes;
    getExamPasstimes(stars, passtimes => {
      if (callback != undefined) callback({
        passTimes: passtimes,
        remainTimes: x,
      })
    })
  })
}
function getExamRemaintimes(stars, callback) {
  var that = this;
  qcloud.request({
    url: `https://${config.service.host}/product/getExamAvaliableTime`,
    login: true,
    data: {
      type: 0,
      star: parseInt(stars),
      questionId: 0
    },
    method: 'POST',
    success(result) {
      if (callback != undefined) callback(result.data.data.remainTimes);
    },
    fail(error) {
      console.log('request fail', error);
    },
    complete() {
      console.log('request complete');
    }
  });

}

function getExamPasstimes(stars, callback) {
  var that = this;
  qcloud.request({
    url: `https://${config.service.host}/exam/getExamStatus`,
    login: true,
    data: {
      stars: stars
    },
    method: 'POST',
    success(result) {
      var passTimes = 0;
      if (result.data.code == 0) {
        passTimes = result.data.data.examStatus;
      }
      if (callback != undefined) callback(passTimes);
    },
    fail(error) {
      console.log('request fail', error);
    },
    complete() {
      console.log('request complete');
    }
  });

}

function uploadExamStatue(stars, score, callback) {
  wx.showLoading({
    title: '正在提交',
  })
  qcloud.request({
    url: `https://${config.service.host}/exam/uploadStatus`,
    login: true,
    data: {
      score: score,
      star: parseInt(stars),
    },
    method: 'POST',
    success(result) {
      wx.hideLoading();
      if (callback != undefined) callback();
    },
    fail(error) {
      console.log('request fail', error);
    },
    complete() {
      console.log('request complete');
    }
  });
}

module.exports = {
  uploadExamStatue: uploadExamStatue,
  getExamStatus: getExamStatus,
  calcNeedTimes: calcNeedTimes,
  uploadScore: uploadScore,
}