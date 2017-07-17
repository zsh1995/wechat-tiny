
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');

var utils = require('..//../utils/score');

// examResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:'',
    score:'',
    type:'',
    remainTimes:10,
    passTimes:2,
    needTimes:1,
    updateExamStatus:'https://78662138.qcloud.la/gslm/exam/uploadStatus',
    uploadScore: 'https://78662138.qcloud.la/gslm/uploadScore'
  },

  endExam: function(e){
    wx.navigateBack({
    });
    return false;
  },
  gobacktoMain:function(e){
    wx.switchTab({
      url:'../../pages/examItems/examItems'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    result = utils.getCommentByScore(options.score);
    this.data.comment = result.comment;
    this.data.score = result.score;
    this.data.type = options.type;
    this.setData(this.data);
    var requestUrl = this.data.uploadScore;
    if (options.type== 'exam' && result.realScore >=54 ){
      requestUrl = this.data.updateExamStatus;
    }else if(options.type == 'practice'){
      requestUrl = this.data.uploadScore;
    }else{
      return;
    }
    qcloud.request({
      url: requestUrl,
      login: true,
      data:{
        score:options.score,
        groud_id:options.group_id,
        stars:options.stars,
        star:parseInt(options.stars)
      },
      method: 'POST',
      success(result) {

      },
      fail(error) {
        console.log('request fail', error);
      },
      complete() {
        console.log('request complete');
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
  
  }
})