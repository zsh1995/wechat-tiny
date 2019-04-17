// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');
var config = require('../../config');
var companyUtil = require('../../utils/company.js')
var internalList = new Array();
var richTextParse = require('../../utils/richTextParse/richText.js')
var content = [richTextParse.go("<p>1、名优企</p><ul class='ul'><li>500强、上市公司、高新等</li>"), "<p>2、直推并安排面试的理由</p><ul class='ul'><li>思维和沟通能力比较好</li></ul><p>3、实际操作</p><ul class='ul'><li>关注上述企业招聘需求</li><li>有自己符合要求的岗位就将该岗位要求和简历发给我们zhitui@gaoshangyuan.com（需注明高商苑ID号）</li><li>我们确认后安排面试</li><li>我们可以提供推荐信，做为面试开始自我介绍的工具。</li></ul><p>4、收费</p><ul class='ul'><li>先交押金（一周薪资），持续安排面试</li><li>确定入职后收费</li><li>入职前可随时要求退还押金</li></ul><p>5、你指定企业，我们安排面试</p><ul class='ul'><li>步骤同上，押金上调20%！</li></ul>"]

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
    let companys = [e.detail.value.wantedCompany1, e.detail.value.wantedCompany2, e.detail.value.wantedCompany3]
    companyUtil.uploadCompanys(companys)
    .then(p=>{
      wx.showToast({
        title: '成功！',
      })
    })
    .catch(p=>{
      wx.showToast({
        title: "失败！"+p.message,
      })
    })
  },
  test(e){
    console.log(e);
  },
  toSee () {
    wx.previewImage({
      urls: [`https://s1.ax1x.com/2018/03/09/9Rk1oV.jpg`],
    })
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