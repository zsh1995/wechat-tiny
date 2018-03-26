// invitorPage.js

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');

var userUtil = require('../../utils/user.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    invitor_avator: "",
    updataUserInfo: `https://${config.service.host}/ajax/user/invitor/setInvitor`,
    requestUserInfo: `https://${config.service.host}/ajax/invitor/getUserInfo`

  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  chooseInvitor:function(){
    var that = this;
    userUtil.setInvitor(this.data.inputVal)
    .then(p=>{
      if (p.data.code == 0) {
        wx.navigateBack({})
      } else {
        wx.showToast({
          title: p.data.message,
          icon: 'loading',
          mask: true
        })
      }
    })
  },
  inputTyping: function (e) {
    var that = this;
    userUtil.getUserInfoById(e.detail.value)
    .then(p=>{
      that.data.invitor_avator = p.data.data.avatarUrl;
      that.data.invitor_name = p.data.data.nickName
      that.setData(that.data);
    })
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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