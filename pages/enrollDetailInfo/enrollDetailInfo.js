// pages/enrollDetailInfo/enrollDetailInfo.js
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
    showToast:true,
    steps:1,
    schoolName:'选择您的学校',
    updataUserInfo: `https://${config.service.host}/userInfo/updateUserInfo`,
    nextStepText:'下一步：填写基本信息',
  },

  chooseSchool: function (e) {
    wx.navigateTo({
      url: '../../pages/schoolChoose/schoolChoose',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onSubmit: function (e) {
    console.log(e)
  },

  onSubmit: function (e) {
    if(this.data.steps == 1) return;
    var userInfo = e.detail.value;
    var mSchool = this.data.schoolName
    mSchool = mSchool == '选择您的学校' ? '' : mSchool
    userInfo.school = mSchool
    userInfo.userChannel = 1;
    var that = this;
    userUtil.uploadUserInfo(userInfo)
    .then(p=>{
      wx.showToast({
        title: '成功',
      })
      setTimeout(p=>{
        wx.redirectTo({
          url: '/pages/practiceGroup/practiceGroup?star=1',
        })
      }, 1200)
    })
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
  
  },
  navigator:function(){
    wx.switchTab({
      url: '../../pages/examItems/examItems'
    })
  },
  nextStep:function(){
    if(this.data.steps == 2){

    }else{
      wx.setTopBarText({
        text: '报名·基本信息',
      })
      this.setData({
        steps:this.data.steps + 1,
        nextStepText:'我要报名',
      })
    }
    
  }

})