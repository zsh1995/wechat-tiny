// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');
var config = require('../../config');
var internalList = new Array();

var content=['1.填写你毕业后期待加入的企业，我们优先和建立直推渠道','2.在你通过星级测试后，你指定的企业会收到你的推荐邮件','3.推荐信可以和简历一起投递任何公司。']

// pages/accPage/accPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payProductUrl: `https://${config.service.host}/pay/payProduct`,
    checkUrl: `https://${config.service.host}/product/getExamAvaliableTime`,
    checkProductUrl: `https://${config.service.host}/product/returnable/checkPurched`,
    isPurched: false,
    state: 1,
    content:content,
  },
  onSubmit(e){
    console.log(e);
  },
  test(e){
    console.log(e);
  },

  onClick: function () {
    wx.navigateTo({
      url: '../enterpriseList/enterpriseList',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var button = this.selectComponent('#myButton');
    
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

  },


  accessEnsure: function (e) {
    this.doPay(this.data.payProductUrl,
      {
        productId: 5,
      });
  },

  doPay: function (payUrl, payData) {
    var that = this;
    qcloud.request({
      url: payUrl,
      login: true,
      data: payData,
      method: 'POST',
      success(result) {
        that.requestProduct(result.data);
      },
      fail(error) {
        console.log('request fail', error);
      },
      complete() {
        console.log('request complete');
      }

    });
  },

  checkProductBuy: function (productId, callback_success, callback_fail) {
    var that = this;
    console.log('is check productBuy')
    qcloud.request({
      url: this.data.checkProductUrl,
      login: true,
      data: {
        productId: productId,
      },
      method: 'POST',
      success(result) {
        that.data.isPurched = result.data.data.isPurched;
        console.log('isPurched:' + result.data.data.isPurched);
        that.setData(that.data)
        if (result.data.data.isPurched) {
          callback_success();
        }
        else
          callback_fail();
      },
      fail(error) {
        console.log('request fail', error);
      },
      complete() {
        console.log('request complete');
      }
    });
  },

  requestProduct: function (obj) {
    console.log("requestPay:" + obj);
    var that = this;
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
        console.log("success");
        wx.showLoading({
          title: '后台处理中',
          mask: true
        });
        var intFunction = setInterval(
          that._checkProductBuy(5,
            function () {
              wx.hideLoading()
              clearInterval(intFunction)

            },
            function () {
              console.log('ff' + execCount)
              execCount = execCount + 1;
              if (execCount >= 5) {
                that.setData({
                  showToast: true,
                })
                console.log('stop')
                clearInterval(internalList.pop())
              }
            }, that)
          , 1000
        )
        internalList.push(intFunction)
      },
      'fail': function (res) {
        console.log("fail");
      }
    })
  },

  goHurry: function () {
    this.setData({
      state: 2,
    })
  },

  payHurry: function () {
    var that = this;
    this.checkProductBuy(5,
      p => (
        that.setData({
          isPurched: true,
          showToast: true,
        }
        )), p => (
          wx.showModal({
            title: '付费提示',
            content: '付押金加急加急付押金付押金加急加急付押金付押金加急加急付押金付押金加急加急付押金',
            success: function (args) {
              if (args.confirm == true) {
                that.accessEnsure();
              }
            }
          })
        ))


  },
  _checkProductBuy: function (productId, callback_success, callback_fail, whos) {
    return function () {
      whos.checkProductBuy(productId, callback_success, callback_fail)
    }
  },

  closePic: function (e) {
    this.setData({
      showToast: false,
    })
  },





})