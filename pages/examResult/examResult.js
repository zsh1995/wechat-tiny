
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');

var utils = require('..//../utils/score');
var stars ;

// 当前操作类型

var curType = '';
// examResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:'',
    score:'',
    scoreColor:'#DDDDDD',
    type:'',
    remainTimes:10,
    passTimes:0,
    needTimes:0,
    updateExamStatus:`https://${config.service.host}/exam/uploadStatus`,
    uploadScore: `https://${config.service.host}/uploadScore`,
    examUrl: `https://${config.service.host}/exam/getExamStatus`,
    checkUrl: `https://${config.service.host}/pay/checkPurchRecord`,

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

  getExamStatus: function () {
    var that = this;
    qcloud.request({
      url: this.data.examUrl,
      login: true,
      data: {
        stars: stars
      },
      method: 'POST',
      success(result) {
        if (result.data.code == 0) {
          var passTimes = result.data.data.examStatus;
          var needTimes = 0;
          switch ( parseInt(stars) ) {
            case 1: needTimes = 3 - passTimes; break;
            case 2: needTimes = 4 - passTimes; break;
            case 3: needTimes = 5 - passTimes; break;
          }
          needTimes = needTimes < 0 ? 0 :needTimes;
        }
        that.setData({
          passTimes: passTimes,
          needTimes: needTimes
        });
      },
      fail(error) {
        console.log('request fail', error);
      },
      complete() {
        console.log('request complete');
      }
    });


  },


  checkUserRight: function () {
    var that = this;
    console.log('is checking UserRight')
    qcloud.request({
      url: this.data.checkUrl,
      login: true,
      data: {
        type: 0,
        star: parseInt(stars),
        questionId: 0
      },
      method: 'POST',
      success(result) {
        that.data.remainTimes = result.data.data.remainTime;
        console.log('remainTimes:' + result.data.data.remainTime);
        that.setData(that.data)
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    stars = options.stars;
    var result = utils.getCommentByScore(options.score);
    this.data.comment = result.comment;
    this.data.score = result.score;
    this.data.type = options.type;
    if(result.realScore >= 54 ){
      this.data.scoreColor = '#00C775';
    } else {
      this.data.scoreColor = '#DDDDDD';
    }
    this.setData(this.data);
    var requestUrl = this.data.uploadScore;

    if (options.type== 'exam' && result.realScore >=54 ){
      requestUrl = this.data.updateExamStatus;
    }else if(options.type == 'practice'){
      requestUrl = this.data.uploadScore;
    }else{
      return;
    }
    wx.showLoading({
      title: '正在提交',
    })
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
        console.log('POST SUCCESS')
        wx.hideLoading();
        that.getExamStatus();
        that.checkUserRight();
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
    if(this.data.type == 'exam'){
      this.getExamStatus();
      this.checkUserRight();
    }
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