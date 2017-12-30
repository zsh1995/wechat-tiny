var qcloud = require('../bower_components/wafer-client-sdk/index');
var config = require('../config');

function checkUserRight(star, questionId, callback_success, callback_fail, successFunc) {
  var that = this;
  console.log('is checking UserRight')
  qcloud.request({
    url: `https://${config.service.host}/product/getExamAvaliableTime`,
    login: true,
    data: {
      type: 0,
      star: parseInt(star),
      questionId: parseInt(questionId),
    },
    method: 'POST',
    success(result) {
      if (successFunc(result))
        callback_success(result);
      else
        callback_fail(result);
    },
    fail(error) {
      console.log('request fail', error);
    },
    complete() {
      console.log('request complete');
    }

  });

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

function getPassedTimes(star, doWithData) {
  var that = this;
  qcloud.request({
    url: `https://${config.service.host}/exam/getExamStatus`,
    login: true,
    data: {
      stars: star
    },
    method: 'POST',
    success(result) {
      var passTimes = 0
      if (result.data.code == 0) {
        passTimes = result.data.data.examStatus;
      }
      doWithData(passTimes)

    },
    fail(error) {
      console.log('request fail', error);
    },
    complete() {
      console.log('request complete');
    }
  });
}

function getExamStatus(star, doAfterGet) {
  getPassedTimes(star, p => (doAfterGet(getExamNeedTimes(star) - p)>0)
  )
}





module.exports = {
  _checkUserRight: _checkUserRight,
  checkUserRight: checkUserRight,
  getExamNeedTimes: getExamNeedTimes,
  getExamStatus: getExamStatus,
  getPassedTimes: getPassedTimes,

}
