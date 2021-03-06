// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');
var payUtils = require('../../utils/payUtils')
//
var passExam = [0,0,0]
var title_height = 0;
var letter = '<就业推荐信>'
Page({
    data: {
    motto: 'Hello World',
    color: 'green',
    examUrl:`https://${config.service.host}/ajax/exam/getExamPassTime`,
    passExam:[1,1,1,1],
    letter: letter,
  },

  gotoPractice:function(e){
    console.log(e)
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
    payUtils.getExamStatus(star).then(p=>{
      that.data.passExam[star - 1] = p;
    })

  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'picUrls',
      success: function(res) {
        that.setData({
          picUrls:res.data,
        })
      },
    })
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
  toSee:function(e){
    var id = parseInt(e.target.dataset.id);
   /*
    console.log('toSee:'+e)
    
    this.setData({
      showToast:true,
      showPic:{
        url: this.data.picUrls['rcmd-star-'+id],
      }
    })
    */
    wx.previewImage({
      urls: [
        this.data.picUrls['rcmd-star-' + id]
      ],
    })
  },
  closePic:function(){
    this.setData({
      showToast:false,
    })
  }

})