//app.js
var qcloud = require('./bower_components/wafer-client-sdk/index');
var config = require('./config');

App({
  onLaunch: function () {
    try {
      wx.clearStorageSync()
    } catch (e) {
      // Do something when catch error
    }
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    qcloud.setLoginUrl(config.service.loginUrl);
//    qcloud.login({ success: function () { console.log('service login') } });
  },
  getUserInfo:function(cb){
    var that = this
    if(false){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          console.log("login success")
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})