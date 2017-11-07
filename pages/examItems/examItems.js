// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');
//
var passExam = [0,0,0]
var title_height = 0;

Page({
    data: {
    motto: 'Hello World',
    color: 'green',
    examUrl:`https://${config.service.host}/exam/getExamStatus`,
    passExam:[1,1,1,1],
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

  bindtouchstart: function(e){
    this.setData({
      touchstartEvent: e
    })
  },
  bindtouchmove: function(e){
    if(this.getDirection(this.data.touchstartEvent,e) == 'top'){
      this.getFields(false);
      return;
    }
    if (this.getDirection(this.data.touchstartEvent, e) == 'bottom') {
      this.getFields(true);
      return;
    }

  },
  getDirection: function (startEvent, endEvent) {
    var x = endEvent.changedTouches[0].clientX - startEvent.changedTouches[0].clientX,
      y = endEvent.changedTouches[0].clientY - startEvent.changedTouches[0].clientY,
      pi = 360 * Math.atan(y / x) / (2 * Math.PI);
    if (pi < 30 && pi > -30 && x > 0 && Math.abs(x) > 20) {
      this.setData({
        showPullTips: false
      })
      return 'right';
    }
    if (pi < 30 && pi > -30 && x < 0 && Math.abs(x) > 20) {
      this.setData({
        showPullTips: false
      })
      return 'left';
    }
    if ((pi < -60 || pi > 60) && y > 0 && Math.abs(y) > 20) {
      return 'bottom';
    }
    if ((pi < -60 || pi > 60) && y < 0 && Math.abs(y) > 20) {
      return 'top';
    }
  },

  getFields: function (show) {
    if(!show){
      this.setData({
        //titleStyle: 'height:' + 0 + 'px;animation:appear .3s linear;animation-fill-mode:forwards;',
        titleStyle: "",
      })
    }else{
      wx.createSelectorQuery().select('#title-tips').fields({
        dataset: true,
        size: true,
        scrollOffset: true,
        properties: ['scrollX', 'scrollY']
      }, function (res) {
        title_height = res.height     // 节点的高度
        this.setData({
          //titleStyle: 'height:' + res.height + 'px;animation:disappear .3s linear;animation-fill-mode:forwards;',
          titleStyle:"content--disappear"
        })
      }.bind(this)).exec()
    }
    
  },
  onShow: function () {
    var that = this;
    console.log("examItems onShow")
    for (var cnt = 0; cnt < 3; cnt++) {
      this.getExamStatus(cnt + 1);
    }
    setTimeout(function(){
      that.getFields(true);
    },1000);
    /*
    setTimeout(
      function(){
        this.setData({
          titleStyle:'animation:disappear .5s ease-in-out;animation-fill-mode:forwards;'
        })
      }.bind(this),10000
    )
    */
  },

})