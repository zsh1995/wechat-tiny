//获取应用实例
var app = getApp()

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');

var utils = require('..//../utils/score');

var payUtil = require('..//../utils/payUtils');


var star = 0
var optionsTitle = ['', '一 星 级', '二 星 级', '三 星 级']
var describeTitle = ['', '人际关系、团队协作、恋爱观', '社会现象、社会热点', '职场案例、工作思维']
Page({
  data: {
    getScoreUrl: `https://${config.service.host}/getScores`,
    checkPurched: `https://${config.service.host}/product/returnable/checkPurched`,
    examUrl: `https://${config.service.host}/exam/getExamStatus`,
    practiceUrl: `https://${config.service.host}/star/practice`,
    exerciseUrl: `https://${config.service.host}/star/exercise`,
    invitorUrl: `https://${config.service.host}/invitor/getcount`,
    title: '',
    score: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    color: ['', '', '', '', '', '', '', '', '', ''],
    star: 1,
    isPassed:false,
    preExamPass:false,
    passedTimes:0,
    remainTimes:0,

  },

  groupOntap: function (e) {
    console.log('start');
    var options = e.currentTarget.dataset.option;
    console.log(options);
    wx.navigateTo({
      //目的页面地址
      url: '../../pages/examInfo/examInfo?group=' + options + '&item=' + star + '&type=' + 'practice',
      success: function (res) { },
    })
  },

  getExercies: function (e) {
    var that = this;
    qcloud.request({
      url: this.data.exerciseUrl,
      login: true,
      data: {
        stars: star
      },
      method: 'POST',
      success(result) {
        var exerciseFlag = result.data.data;
        that.setData({
          exerciseFlag: exerciseFlag,
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

  getPractice: function (e) {
    var that = this;
    qcloud.request({
      url: this.data.practiceUrl,
      login: true,
      data: {
        stars: star
      },
      method: 'POST',
      success(result) {
        var practiceFlag = result.data.data;
        that.setData({
          practiceFlag: practiceFlag,
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
  navigatoInvitor:function(e){
    wx.navigateTo({
      url: '../invitorList/invitorList',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  getInvitorCount: function (e) {
    var that = this;
    qcloud.request({
      url: this.data.invitorUrl,
      login: true,
      data: {
        star: star
      },
      method: 'POST',
      success(result) {
        var invitor = result.data.data;
        that.setData({
          invitor: invitor,
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

  getScore: function (e) {
    var that = this;
    qcloud.request({
      url: this.data.getScoreUrl,
      login: true,
      data: {
        stars: star
      },
      method: 'POST',
      success(result) {
        var recordList = result.data.data.practiceRecords;
        for (var cnt = 0; cnt < recordList.length; cnt++) {
          var record = recordList[cnt];
          var showRecord = utils.getCommentByScore(record.score);
          that.data.score[record.questionGroup] = showRecord.titleScore;
          that.data.color[record.questionGroup] = showRecord.color;
        }
        that.setData(that.data);
        console.log(result);
      },
      fail(error) {
        console.log('request fail', error);
      },
      complete() {
        console.log('request complete');
      }

    });
  },
  checkIsPurched: function (e) {
    var that = this;
    qcloud.request({
      url: this.data.checkPurched,
      login: true,
      data: {
        productId: 5
      },
      method: 'POST',
      success(result) {
        console.log(result);
      },
      fail(error) {
        console.log('request fail', error);
      },
      complete() {
        console.log('request complete');
      }

    });
  },

  onLoad: function (opt) {
    star = parseInt(opt.star);
    console.log("star" + star);
    var that = this;
    //从后端拉取分数
    this.getScore();
    //this.checkIsPurched();
    this.getExercies();
    this.getPractice();
    this.getInvitorCount();
    payUtil.checkUserRight(star, 0,
      p => (that.data.remainTimes = p.data.data.remainTimes),
      p => that.data.remainTimes = 0,
      function (result) {
        return result.data.data.remainTimes > 0
      }
    );
    payUtil.getPassedTimes(star,
      p => (
        that.setData({
          passedTimes: p,
          needTimes: payUtil.getExamNeedTimes(star),
          isPassed: (payUtil.getExamNeedTimes(star) - p) <= 0,
        })
      ))
    if(star > 1){
      payUtil.getExamStatus(star - 1,p=>(!p ?that.setData({preExamPass:true}):0));
    }else{
      that.setData({ preExamPass: true })
    }
    this.data.title = optionsTitle[star];
    this.data.detailTitle = describeTitle[star];
    this.data.star = star;
    this.setData(this.data);
  },

  onShow: function (opt) {
    console.log("onShow:" + star);
    //从后端拉取分数
    this.getScore();
    this.data.title = optionsTitle[star];
    this.data.detailTitle = describeTitle[star];
    this.setData(this.data);
  },
  gotoExam: function (e) {
    var star = e.currentTarget.dataset.option;
    console.log("nav:" + this.data.isPassed);
    if (!this.data.preExamPass) return;
    wx.navigateTo({
      //目的页面地址
      url: '../../pages/examNotice/examNotice?examNum=' + star + '&isPassed=' + this.data.isPassed,
      success: function (res) { },
    })
  },

})
