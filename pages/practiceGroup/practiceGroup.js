//获取应用实例
var app = getApp()

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');

var utils = require('..//../utils/score');



var star = 0
var optionsTitle = ['', '一 星 级 · 恋 爱 交 友', '二 星 级 · 社 会 生 活','三 星 级 · 求 职 工 作']
Page({
  data: {
    getScoreUrl: `https://${config.service.host}/gslm/getScores`,
    title:'',
    score: ['-','-','-','-','-','-','-','-','-','-'],
    color: ['', '', '', '', '', '', '', '', '', ''],
    star:1
  },

  groupOntap:function(e){
    console.log('start');
    var options = e.currentTarget.dataset.option;
    console.log(options);
    wx.navigateTo({
      //目的页面地址
      url: '../../pages/examInfo/examInfo?group=' + options+'&item='+star+'&type='+'practice',
      success: function (res) { },
    })
  },

  getScore:function(e){
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
        for(var cnt = 0; cnt < recordList.length;cnt++){
          var record = recordList[cnt];
          var showRecord = utils.getCommentByScore(record.score).score;
          that.data.score[record.questionGroup] = showRecord;
          if (record.score  >=54){
            that.data.color[record.questionGroup] ="#00C775";
          }else{
            that.data.color[record.questionGroup] = "#343B41";
          }
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
  
  onLoad: function (opt) {
    star = opt.star;
    console.log("star"+star);
    //从后端拉取分数
    this.getScore();
    this.data.title = optionsTitle[star];
    this.data.star= star;
    this.setData(this.data);
  },

  onShow: function(opt){
    console.log("onShow:" + star);
    //从后端拉取分数
    this.getScore();
    this.data.title = optionsTitle[star];
    this.setData(this.data);
  }

})
