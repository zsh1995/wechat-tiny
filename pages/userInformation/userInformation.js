// userInformation.js
var app = getApp()

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');
var utils = require('../../utils/util.js')
var userUtil = require('../../utils/user')

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false,
  });
};

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});



Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    requestUrl: config.service.requestUrl,
    updataUserInfo: `https://${config.service.host}/userInfo/updateUserInfo`,
    requestUserInfo: `https://${config.service.host}/userInfo/getUserInfo`,
    payrecordurl: `https://${config.service.host}/pay/getPurchRecord`,
    starRankUrl: `https://${config.service.host}/star/getRank`,
    onModify: false,
    ourUserInfo: {},
    showTips: false,
  },
  getStarRank: function () {
    var that = this;
    userUtil.getRank()
      .then(p => {
        var rank = p.data.data;
        that.setData({
          rank: rank,
        })
      })

  },
  gotoConfirm: function () {
    var rank = this.data.rank;
    rank = parseFloat(rank);
    rank = Math.floor(rank) + 1;
    wx.navigateTo({
      url: '../../pages/practiceGroup/practiceGroup?star=' + rank,
    })
  },
  bindNavCoupon() {
    wx.navigateTo({
      url: '../couponPage/couponPage',
    })
  },
  bindgetuserinfo(e) {
    let that = this
    wx.setStorage({
      key: 'userResult',
      data: e.detail,
      success: function (res) {
        utils.qcloulogin()
          .then(() => {
            wx.showToast({
              title: '登陆成功！',
              duration: 1200,
              mask: true,
              success: function (res) {
                that.onLoad()
                that.onShow()
                let sourcePage = wx.getStorageSync('sourcePage')
                if (sourcePage != null && sourcePage != '')
                  wx.clearStorage('sourcePage')
                wx.redirectTo({
                  url: sourcePage,
                })
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          })

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    this.getStarRank();
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    console.log(options)
    var that = this;
    this.requestUserInfo('invitor', function (userdata) {
      if (userdata.invitor == null || userdata.invitor == '') {
        that.setData({
          showTips: true,
        })
      }
    })
  },
  fillInvitor: function () {
    wx.navigateTo({
      url: '../../pages/invitorPage/invitorPage',
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  onModifyBind: function (e) {
    this.data.onModify = !this.data.onModify;
    this.setData(this.data);
  },

  bindEdit: function (e) {
    if (e.target.id == "login") return
    wx.navigateTo({
      url: '../../pages/detailInformation/detailInformation',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  doAccelarate: function () {
    wx.navigateTo({
      url: '../../pages/accPage/accPage',
    })
  },


  getPayRecord: function (e) {
    wx.navigateTo({
      url: '../../pages/purchRecord/purchRecord',
    })
  },

  requestUserInfo: function (e, callback) {
    var that = this;
    userUtil.getUserInfo()
      .then(result => {
        that.data.ourUserInfo = result.data.data;
        var tempZero = '';
        that.data.ourUserInfo.id = that.data.ourUserInfo.id.toString();
        var len = that.data.ourUserInfo.id.length;
        for (var cnt = 0; cnt < 8 - len; cnt++) {
          tempZero = tempZero.concat('0');
        }
        that.data.ourUserInfo.id = tempZero.concat(that.data.ourUserInfo.id)
        wx.setStorage({
          key: 'userId',
          data: that.data.ourUserInfo.id,
        })
        that.setData(that.data);
        if (callback) {
          callback(result.data.data);
        }
      })
  },

  bindInvitor: function (e) {
    wx.navigateTo({
      url: '../../pages/invitorList/invitorList',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onSubmit: function (event) {
    showBusy('正在提交');
    var that = this;
    qcloud.request({
      url: this.data.updataUserInfo,
      login: true,
      data: event.detail.value,
      method: 'POST',
      success(result) {
        that.requestUserInfo();
        that.data.onModify = false;
        that.setData(that.data);
        showSuccess('提交成功！');
      },
      fail(error) {
        showModel('提交失败', error);
        console.log('request fail', error);
      },
      complete() {
        console.log('request complete');
      }

    });
    console.log(event.detail.value)
  }
})