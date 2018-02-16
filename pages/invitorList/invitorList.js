// invitorList.js


// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');

var util = require('../../utils/util.js')

var userUtils = require('../../utils/user')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    invitorList:[],
    myInvitor:{},
    invitorListUrl: `https://${config.service.host}/userInfo/getInvitedList`
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    userUtils.getInvitor()
      .then(result=>{
        if (result.data.data.nickName == null && result.data.data.avatar_url == null) {
          result.data.data = {
            nickName: '无',
            avatarUrl: null
          }
        }
        that.setData({
          myInvitor: result.data.data
        })
      })
    userUtils.getInvitedUser()
      .then(result=>{
        var invitedList = result.data.data;
        wx.hideLoading()
        for (var index in invitedList) {
          var curItem = invitedList[index]
          curItem.createTime = curItem.createTime.substr(0,10)
        }
        that.setData({
          invitorList: result.data.data,
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