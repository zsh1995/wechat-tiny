var qcloud = require('../bower_components/wafer-client-sdk/index');
var config = require('../config');
var utils = require('./util.js');

var couponIdArray = new Map();
var COUPON_KEY = "couponInfos"
couponIdArray['exam'] = 2;
couponIdArray['analyse'] = 1;

function calculateAnalyseTimes(dataList) {
  var base = {
    analyTime: 0,
    calcTimes: function (item) {
      if (item.couponId == 1 && item.usedFlag != 1) {
        this.analyTime++
      }
    }
  }
  dataList.forEach(base.calcTimes, base);
  return base.analyTime
}

function calculateExamTimes(dataList) {
  var base = {
    examTime: 0,
    calcTimes: function (item) {
      if (item.couponId == 2 && item.usedFlag != 1) {
        this.examTime++
      }
    }
  }
  dataList.forEach(base.calcTimes, base);
  return base.examTime
}

function ajaxCoupons(callback) {
  qcloud.request({
    url: `https://${config.service.host}/ajax/coupon/getAllCoupon`,
    login: true,
    method: 'POST',
    data: {
    },
    success(result) {
      callback(result.data.data);
    }
  });
}

function ajaxCouponsSync(callback) {
  var flag = 0;
  qcloud.request({
    url: `https://${config.service.host}/ajax/coupon/getAllCoupon`,
    login: true,
    method: 'POST',
    data: {
    },
    success(result) {
      callback(result.data.data);
    },
    fail(error) {
      console.log('request fail', error);
    },
    complete() {
      flag = 1;
    }

  });


}

function useExamCoupon(star) {
  return utils.ajax_promise(`https://${config.service.host}/ajax/coupon/useExam`, {
    star: star
  })
}
function useAnalyseCoupon(star, questionId, feQuestionId, groupId) {
  return utils.ajax_promise(`https://${config.service.host}/ajax/coupon/useAnalyse`, {
    star: star,
    questionId: questionId,
    feQuestionId: feQuestionId,
    groupId: groupId,
  })
}

function getTimes(couponType, callback) {
  var map = {
    'analyse': getAnalyseTimes,
    'exam': getExamTimes,
  }
  return map[couponType](callback);
}

function getAnalyseTimes() {
  var coupon = wx.getStorageSync(COUPON_KEY);
  if (coupon == "") {
    storeCouponSync();
  } else {
    return coupon.analyseTimes;
  }
}
function getExamTimes(callback) {
  var coupon = wx.getStorageSync(COUPON_KEY);
  if (coupon == "") {
    storeCouponSync(callback);
  } else {
    callback(coupon.examTimes);
    return coupon.examTimes;
  }
}


function storeCoupons() {
  ajaxCoupons(p => {
    wx.setStorage({
      key: COUPON_KEY,
      data: {
        analyseTimes: calculateAnalyseTimes(p),
        examTimes: calculateExamTimes(p)
      }
    })
  })
}

function storeCouponSync(callback) {
  ajaxCouponsSync(p => {
    wx.setStorageSync({
      key: COUPON_KEY,
      data: {
        analyseTimes: calculateAnalyseTimes(p),
        examTimes: calculateExamTimes(p)
      }
    })
    callback(calculateExamTimes(p));
  })
}

module.exports = {
  calculateAnalyseTimes: calculateAnalyseTimes,
  calculateExamTimes: calculateExamTimes,
  storeCoupons: storeCoupons,
  ajaxCoupons: ajaxCoupons,
  useExamCoupon: useExamCoupon,
  useAnalyseCoupon: useAnalyseCoupon,
  getTimes: getTimes,
}