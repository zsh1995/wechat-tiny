// examNotice.js

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymentUrl:'https://78662138.qcloud.la/gslm/pay/payEncap',
    examNumber :0,
    examData:[
      {
        examTitle: "一 星 级 · 考 试",
        examContent: "一道沟通训练思考题都由一个案例、一个观点，以及对此观点的五个选项组成，\n沟通训练思考题有如下作用：\n 1.     用于人们相互沟通，每一道题，大家都发表自己意见，听取别人意见，尽量达成积极共识。\n2.     可以作为企业面试题，用于考察应聘者的思维方式积极程度。\n3.     可以作为各类求职招聘平台和交友平台考察求职者（会员）潜力指数的考试题。"
      },
      {
        examTitle: "二 星 级 · 考 试",
        examContent: "一道沟通训练思考题都由一个案例、一个观点，以及对此观点的五个选项组成，\n沟通训练思考题有如下作用：\n 1.     用于人们相互沟通，每一道题，大家都发表自己意见，听取别人意见，尽量达成积极共识。\n2.     可以作为企业面试题，用于考察应聘者的思维方式积极程度。\n3.     可以作为各类求职招聘平台和交友平台考察求职者（会员）潜力指数的考试题。"
      },
      {
        examTitle: "三 星 级 · 考 试",
        examContent: "一道沟通训练思考题都由一个案例、一个观点，以及对此观点的五个选项组成，\n沟通训练思考题有如下作用：\n 1.     用于人们相互沟通，每一道题，大家都发表自己意见，听取别人意见，尽量达成积极共识。\n2.     可以作为企业面试题，用于考察应聘者的思维方式积极程度。\n3.     可以作为各类求职招聘平台和交友平台考察求职者（会员）潜力指数的考试题。"
      }
    ]
  },
  gotoExam:function (e){
    var that = this;
    qcloud.request({
      url: this.data.paymentUrl,
      login: true,
      method: 'POST',
      success(result) {
        that.requestPayment(result.data);
      },
      fail(error) {
        console.log('request fail', error);
      },
      complete() {
        console.log('request complete');
      }

    });





    /*wx.navigateTo({
      //目的页面地址
      url: '../../pages/examInfo/examInfo?type=2',
      success: function (res) { },
    })
    */
  },

  requestPayment:function(obj){
	  console.log("requestPay:"+obj);
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success':function(res){
        console.log("success");
      },
      'fail':function(res){
        console.log("fail");
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.examNumber = options.examNum;
    console.log(options.examNum)
    this.setData(this.data);
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
  
  }
})