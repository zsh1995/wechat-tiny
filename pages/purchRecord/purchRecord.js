// userInformation.js
var app = getApp()

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');


function ge_time_format(timestamp = false) {
  if (timestamp) {
    var date = new Date(timestamp);
  } else {
    var date = new Date();
  }
    var Y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    var H = date.getHours()
    var i = date.getMinutes()
    var s = date.getSeconds()
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  if (H < 10) {
    H = '0' + H;
  }
  if (i < 10) {
    i = '0' + i;
  }
  if (s < 10) {
    s = '0' + s;
  }
  var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
  return t;
}
/**
 * 日期函数转为时间戳格式
 * 传入一个日期时间格式,如果不传入就是获取现在的时间了
 * @type String strtime 要转换的日期时间格式 2016-07-26 10:55:38
 * @return {String} 时间戳格式: 1469504554276
 */
function get_unix_time_stamp(strtime = false) {
  if (strtime) {
    var date = new Date(strtime);
  } else {
    var date = new Date();
  }
  time1 = date.getTime();   //会精确到毫秒---长度为13位
  //time2 = date.valueOf(); //会精确到毫秒---长度为13位
  //time3 = Date.parse(date); //只能精确到秒，毫秒将用0来代替---长度为10位
  return time1;
}




// purchRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payrecordurl: "https://74043727.qcloud.la/gslm/pay/getPurchRecord",
    purchList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    qcloud.request({
      url: this.data.payrecordurl,
      login: true,
      method: 'POST',
      data: {
        userName: "test"
      },
      success(result) {
        console.log("success:" + result);
        that.data.purchList = result.data.data;
        for(var cnt = 0;cnt < that.data.purchList.length;cnt++){
          var item = that.data.purchList[cnt]
          item.date = ge_time_format(parseInt(item.date) *1000)
        }
        that.setData(that.data);
      },
      fail(error) {
        that.data.ourUserInfo = { userName: "未获取到数据" };
        that.setData(that.data);
      },
      complete() {
      }

    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})