//index.js
//获取应用实例
var app = getApp()
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');

Page({
  data: {
    motto: '欢迎进入高商联盟',
    userInfo: {},
    showPicStyle: '',
    showToast: false,
    requestUserInfo: `https://${config.service.host}/userInfo/getUserInfo`,
  },

  //
  requestUserInfo: function (e) {
    var that = this;
    qcloud.request({
      url: this.data.requestUserInfo,
      login: true,
      method: 'POST',
      data: {
        userName: "test"
      },
      success(result) {
        if (result.data.data.userInfo.userChannel != 1) {
          that.setData({
            showToast: true,
          })
          setTimeout(function () {
            that.setData({
              showPicStyle: 'pic-hidden',
            })
          }, 1000)
        }
      },
      fail(error) {
        that.data.ourUserInfo = { userName: "未获取到数据" };
        that.setData(that.data);
      },
      complete() {
      }

    });
  },
  //事件处理函数
  bindViewTap: function () {
    console.log("bindViewTapTest");
    wx.navigateTo({
      url: '../examItems/examItems'
    })
  },

  cancelShow: function (e) {
    this.setData({
      showToast: false,
    })
    wx.navigateTo({
      url: '../examInfo/examInfo?type=enroll&item=1&group=1',
    })
  },

  onClick: function () {
    wx.navigateTo({
      url: '../enterpriseList/enterpriseList',
    })
  },
  navToSmr:function(){
    wx.navigateTo({
      url: '../summaryPage/summaryPage',
    })
  },

  onShow: function () {
    var that = this;
    that.requestUserInfo();
  },
  closePic: function (e) {
    if (e.target.id == "closePic") {
      this.setData({
        showToast: false,
      })
    }

  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
      })
    })
  }
})
