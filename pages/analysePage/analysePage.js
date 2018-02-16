// analysePage.js
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');

var examUtils = require('../../utils/exam')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    analyseUrl:`https://${config.service.host}/question/getAnalyse`,
    analyse:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("ana" + options.star + "," + options.questionId)
    var star = options.star;
    var questionId = options.questionId;
    var that = this
    examUtils.getAnalyse(star,questionId)
      .then(p=>{
        that.setData({
          analyse: p.data.data
        })
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