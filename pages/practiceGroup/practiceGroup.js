//获取应用实例
var app = getApp()

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');

var userRightUtils = require('../../utils/userRight');

var scoreUtils =require('../../utils/score.js');

var payUtil = require('..//../utils/payUtils');
var userUtils = require('../../utils/user')
var examUtils=require('../../utils/exam.js')
var requireCdt = ['','无要求','指定机构200H志愿者','100H实习证明']

var upperSlider = null
var star = 0
var optionsTitle = ['', '一 星 级', '二 星 级', '三 星 级']
var describeTitle = ['', '人际关系、团队协作', '社会现象、社会热点', '职场案例、工作思维']
Page({
  data: {
    checkPurched: `https://${config.service.host}/ajax/user/checkPurchedReturnable`,
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
    userUtils.getExerciseFlag().then(result=>{
      var exerciseFlag = result.data.data;
      that.setData({
        exerciseFlag: exerciseFlag,
      });
    })  
  },

  getPractice: function (e) {
    var that = this;
    userUtils.getPracticeFlag().then(result => {
      var practiceFlag = result.data.data;
      that.setData({
        practiceFlag: practiceFlag,
      });
    })  
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
    userRightUtils.getInvitedCount(star)
    .then(result=>{
      var invitor = result.data.data;
      that.setData({
        invitor: invitor,
      });
    })
  },

  getScore: function (e) {
    var that = this;
    userRightUtils.getPracticeScores(star).then(result=>{
      var recordList = result.data.data;
      let defaultLen = star==1?9:6
      that.data.scoreList = new Array(defaultLen+1);
      for (var cnt = 0; cnt < recordList.length; cnt++) {
        var record = recordList[cnt];
        var showRecord = scoreUtils.getCommentByScore(record.score);
        that.data.scoreList[record.questionGroup]={
          score: showRecord.titleScore,
          color: showRecord.color,
        }
      }
      that.data.scoreL = new Array(defaultLen/3)
      that.setData(that.data);
      console.log(result);
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
  touchstar(e){
    upperSlider.ontouch(e);
  },
  touchmove(e){
    upperSlider.onmove(e);
  },
  touchend(e){
    upperSlider.onend(e);
  },

  onLoad: function (opt) {
    star = parseInt(opt.star);
    console.log("star" + star);
    examUtils.checkExamProcess(star)
      .then(p => {
        console.log(p.data.data)
        that.setData({
          inExam: p.data.data
        })
      })
    var that = this;
    upperSlider = this.selectComponent('#us');
    //从后端拉取分数
    this.getScore();
    //this.checkIsPurched();
    this.getExercies();
    this.getPractice();
    this.getInvitorCount();
    payUtil.checkUserRight(star)
      .then(p=>{
        that.data.remainTimes = p.data.data;
      })
    payUtil.getPassedTimes(star)
      .then(p => {
        that.setData({
          passedTimes: p.data.data,
          needTimes: payUtil.getExamNeedTimes(star),
          isPassed: (payUtil.getExamNeedTimes(star) - p.data.data) <= 0,
        })
      })
    this.getStar();
    if(parseInt(star) > 1){
      payUtil.getExamStatus(star-1)
        .then(p => {
          console.log(p);
           p ? that.setData({ preExamPass: true }) : 0
        } )
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
  clickExercise:function(e){
    wx.showModal({
      title: '坚持跑步',
      content: '下载“悦跑圈”， 搜素并加入“高商苑”跑团！\n坚持3个月，每月8次，每次1600米，每次1000米配速3-8分钟',
      showCancel:false,
    })
  },
  clickPractice:function(e){
    
    if (!String.prototype.format) {
      String.prototype.format = function () {
        var str = this.toString();
        if (!arguments.length)
          return str;
        var args = typeof arguments[0],
          args = (("string" == args || "number" == args) ? arguments : arguments[0]);
        for (var arg in args)
          str = str.replace(RegExp("\\{" + arg + "\\}", "gi"), args[arg]);
        return str;
      }
    }

    wx.showModal({
      title: '完成标准',
      content: '在校生：{0}\n往届生： 需工作表现证明'.format(requireCdt[star]),
      showCancel:false,
    })
  },
  getStar(){
    var that = this;
    userUtils.getRank()
      .then(p => {
        var rank = p.data.data;
        that.setData({
          rank: rank,
        })
      })
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
