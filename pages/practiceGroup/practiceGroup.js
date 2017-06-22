//获取应用实例
var app = getApp()

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');


var star = 0
var optionsTitle = ['', '一星级 · 恋爱交友', '二星级 · 社会生活','三星级 · 求职工作']
Page({
  data: {
    getScoreUrl: 'https://78662138.qcloud.la/gslm/getScores',
    title:'',
    score: ['-','-','-','-','-','-','-','-','-','-']
  },

  groupOntap:function(e){
    console.log('start');
    var options = e.currentTarget.dataset.option;
    console.log(options);
    wx.navigateTo({
      //目的页面地址
      url: '../../pages/examInfo/examInfo?group=' + options+'&item='+star,
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
          that.data.score[record.questionGroup] = record.score;
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
