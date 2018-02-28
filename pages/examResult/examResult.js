
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');

var utils = require('..//../utils/score');

var examTimesUtil = require('../../utils/userRight.js');
var stars;

// 当前操作类型

var curType = '';
// examResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: '',
    score: '',
    scoreColor: '#DDDDDD',
    type: '',
    remainTimes: 10,
    passTimes: 0,
    needTimes: 0,
    updateExamStatus: `https://${config.service.host}/exam/uploadStatus`,
    uploadScore: `https://${config.service.host}/uploadScore`,
    examUrl: `https://${config.service.host}/exam/getExamStatus`,
    checkUrl: `https://${config.service.host}/product/getExamAvaliableTime`,

  },

  endExam: function (e) {
    wx.navigateBack({
    });
    return false;
  },

  nextStep: function (e) {
    wx.navigateTo({
      url: '../../pages/enrollDetailInfo/enrollDetailInfo',
    })
  },
  gobacktoMain: function (e) {
    wx.switchTab({
      url: '../../pages/examItems/examItems'
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
        var passTimes = 0;
        if (result.data.code == 0) {
          var passTimes = result.data.data.examStatus;
        }
        var needTimes = 0;
        switch (parseInt(stars)) {
          case 1: needTimes = 3 - passTimes; break;
          case 2: needTimes = 4 - passTimes; break;
          case 3: needTimes = 5 - passTimes; break;
        }
        needTimes = needTimes < 0 ? 0 : needTimes;
        if (needTimes == 0) that.setData({
          passExam: true,
        })
        that.setData({
          passTimes: passTimes,
          needTimes: needTimes,
        });
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
        that.data.remainTimes = result.data.data.remainTimes;
        if (that.data.remainTimes < that.data.needTimes) {
          //todo
        }
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
  reWatch: function () {
    var options = this.data.groudId;
    var star = this.data.star;
    var list = this.data.chooseList;
    wx.redirectTo({
      url: '../../pages/examInfo/examInfo?group=' + options + '&item=' + star + '&type=' + 'practice' + '&chooseList=' + list,
    })
  },
  getStarString: function (star) {
    var str = '';
    switch (star) {
      case 1: str = '一星级'; break;
      case 2: str = '二星级'; break;
      case 3: str = '三星级'; break;
    }
    return str;

  },
  gotoPractice: function () {
    wx.redirectTo({
      url: '../../pages/practiceGroup/practiceGroup?star=' + stars,
    })
  },
  strToArray: function (str) {
    var temp = str.split(',');
    temp.forEach(function (value, index, array) { array[index] = parseInt(value) })
    return temp;

  },

  loadCommentDataByScore:function(score){
    var result = utils.getCommentByScore(score);
    this.data.comment = result.comment;
    this.data.score = result.score;
    this.data.scoreColor = result.color;
    this.data.passed = score >= 54;
    this.setData(this.data);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    stars = parseInt(options.stars);
    wx.setNavigationBarTitle({
      title: this.getStarString(stars) + '·0' + options.group_id + '组'
    })
    this.data.star = options.stars;
    this.data.groudId = options.group_id;
    this.data.chooseList = this.strToArray(options.chooseList);
    this.data.type = options.type;
    this.setData(this.data);
    var requestUrl = this.data.uploadScore;
    console.log('options.type' + options.type)

    if (options.type == 'exam') {
      wx.showLoading({
        title: '正在提交',
      })
      examTimesUtil.uploadExamStatue(stars, this.data.chooseList)
        .then(p=>{
          that.loadCommentDataByScore(p.data.data);
          return examTimesUtil.getExamStatus(stars);
        })
        .then(p=>{
          var pt = p.passTimes;
          var rt = p.remainTimes;
          var nt = examTimesUtil.calcNeedTimes(stars, pt);
          that.setData({
            passTimes: pt,
            remainTimes: rt,
            needTimes: nt,
          })
          wx.hideLoading();
        })
    } else if (options.type == 'practice') {
      wx.showLoading({
        title: '正在提交',
      })
      examTimesUtil.uploadScore(stars, options.group_id, options.score)
                    .then(p=>{
                      that.loadCommentDataByScore(options.score);
                      wx.hideLoading();
                    })
    } else {
      wx.setNavigationBarTitle({
        title: '报名·基础测试'
      })
      return;
    }
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
    if (this.data.type == 'exam') {
      //this.getExamStatus();
      //this.checkUserRight();
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