// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');
//
var passExam = [0,0,0]

Page({
    data: {
    motto: 'Hello World',
    color: 'green',
    examUrl:'https://78662138.qcloud.la/gslm/exam/getExamStatus',
    passExam:[0,0,0,0]
  },

  gotoPractice:function(e){
    var star = e.currentTarget.dataset.option;
    wx.navigateTo({
      //目的页面地址
      url: '../../pages/practiceGroup/practiceGroup?star=' + star,
      success: function (res) { },
    })
  },
  gotoExam:function(e){
    var star = e.currentTarget.dataset.option;
    wx.navigateTo({
      //目的页面地址
      url: '../../pages/examNotice/examNotice?examNum='+star,
      success: function (res) { },
    })
  },

  getExamStatus:function(star){
    var that = this;
    qcloud.request({
      url: this.data.examUrl,
      login: true,
      data: {
        stars: star
      },
      method: 'POST',
      success(result) {
        if(result.data.code == 0){
          var passTimes = result.data.data.examStatus;
          var isPass = 1;
          switch(star){
            case 1:if(passTimes >=3) isPass = 0 ;break;
            case 2:if(passTimes >=4) isPass = 0;break;
            case 3:if(passTimes >=5) isPass = 0;;break;
          }
          that.data.passExam[star - 1] = isPass;
        }
        else
          that.data.passExam[star - 1] = 1;
        that.setData(that.data);
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
    console.log("examItems onLoad")

  },
  onShow: function () {
    var that = this;
    console.log("examItems onShow")
    for (var cnt = 0; cnt < 3; cnt++) {
      this.getExamStatus(cnt + 1);
    }
  },

})