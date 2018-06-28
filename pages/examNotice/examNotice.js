// examNotice.js

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');
var payUtils = require('../../utils/payUtils')
var examUtils= require('../../utils/exam.js')
var couponUtil = require('../../utils/coupon.js');
var userRightUtil = require('../../utils/userRight')
let parseHtml = require('../../utils/richTextParse/richText.js')

var intFunction = null;
var execCount = 0;
var star = 0;
var internalList = new Array();
var internalStop = false;
let pic1Src ='https://s1.ax1x.com/2018/06/05/C7y929.jpg'
let pic2Src = 'https://s1.ax1x.com/2018/06/05/C7yp8J.jpg'
let examTips1 = parseHtml.go('<p>1、测试过关的价值</p><br /><p>1）在梧桐果求职会有很大的优势。</p><p>梧桐果（www.wutongguo.com）在企业登录页面向企业宣传“高商苑星级学员，值得优先面试”，如下图右下角所示。</p><br />')
let examTips2 = parseHtml.go('<br /><p>企业搜索简历在同等条件下优先展示搞撒很难过远星级学员，并且标记星级，如下图第一个简历所示。</p><br />')
let examTips3 = parseHtml.go('<br /><p>梧桐果是覆盖全国各地各类名优企的综合型校招平台，与百度百聘、支付宝合作。</p><br /><p>2）给求职推荐信，使用任何企业（点击“我”）</p><br /><p>3）目前很多名企明示不招应届生，我们会去找这些企业介绍高商苑星级学员和往届生不会有明显的差别，甚至比毕业一两年的往届生更好，然后邀请他们在梧桐果发布招聘信息。</p><br /><br /><p>2、过关标准及时限</p><br /><p>随机抽题，每次6组，其中3组结果超过90%。</p><br /><p>一组测试要在30分钟内完成，中途可退出再进，题不变。</p>')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymentUrl: `https://${config.service.host}/pay/payEncap`,
    payProductUrl: `https://${config.service.host}/pay/payProduct`,
    checkUrl: `https://${config.service.host}/product/getExamAvaliableTime`,
    checkProductUrl: `https://${config.service.host}/product/returnable/checkPurched`,
    examNumber: 0,
    isPassed: false,
    remainTimes: 0,
    isPurched: false,
    examTimes:0,
    examData: [examTips1, examTips2, examTips3],
    examPic: [pic1Src, pic2Src]
  },
  gotoExam: function (e) {
    var that = this;
    var options = e.currentTarget.dataset.option;
    if (options == 'goExam') {
      wx.navigateTo({
        //目的页面地址
        url: '../../pages/examInfo/examInfo?group=' + options + '&item=' + star + '&type=' + 'exam',
        success: function (res) { },
      })
    } else {
      payUtils.doPayExam(star)
        .then(p => {
          p.data.package=p.data.repay_id
          that.requestPayment(p.data);
        })
    }
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
    //保证金 暂不启用
    return;
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

  checkUserRight: function (star, callback_success, callback_fail) {
    var that = this;
    userRightUtil.getExamRemaintimes(star).then(result=>{
      that.data.remainTimes = result.data.data;
      console.log('remainTimes:' + result.data.data);
      that.setData(that.data)
      if (result.data.data > 0)
        callback_success();
      else
        callback_fail();
    })
  },
  preview(ev){
    let id = parseInt(ev.target.id)
    wx.previewImage({
      urls: [this.data.examPic[id]],
    })
  },

  _checkUserRight: function (star, callback_success, callback_fail, whos) {
    return function () {
      whos.checkUserRight(star, callback_success, callback_fail)
    }
  },

  _checkProductBuy: function (productId, callback_success, callback_fail, whos) {
    return function () {
      whos.checkProductBuy(productId, callback_success, callback_fail)
    }
  },

  checkUserPayment:function(){
    var that = this;
    var intFunction = setInterval(
      that._checkUserRight(star,
        function () {
          // if(internalStop) return;
          console.log('ss')
          wx.hideLoading()
          clearInterval(internalList.pop())
          internalStop = true;
          //跳转
          wx.navigateTo({
            //目的页面地址
            url: '../../pages/examInfo/examInfo?group=' + '&item=' + star + '&type=' + 'exam',
            success: function (res) { },
          })
        },
        function () {
          console.log('ff' + execCount)
          execCount = execCount + 1;
          if (execCount >= 5) {
            wx.hideLoading()
            console.log('stop')
            clearInterval(internalList.pop())
          }
        }, that)
      , 1000
    )
    internalList.push(intFunction)
  },


  requestPayment: function (obj) {
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
        that.checkUserPayment();
       
      },
      'fail': function (res) {
        console.log("fail");
      }
    })
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
        intFunction = setInterval(
          that._checkProductBuy(5,
            function () {
              wx.hideLoading()
              clearInterval(intFunction)

            },
            function () {
              console.log('ff' + execCount)
              execCount = execCount + 1;
              if (execCount >= 5) {
                wx.hideLoading()
                console.log('stop')
                clearInterval(intFunction)
              }
            }, that)
          , 1000
        )
      },
      'fail': function (res) {
        console.log("fail");
      }
    })
  },

  payHurry: function () {
    var that = this;
    wx.showModal({
      title: '付费提示',
      content: '付押金加急加急付押金付押金加急加急付押金付押金加急加急付押金付押金加急加急付押金',
      success: function (args) {
        if (args.confirm == true) {
          that.accessEnsure();
        }
      }
    })
  },
  useCoupon:function(){
    var that = this;
    wx.showLoading({
      title: '正在使用优惠券',
    })
    couponUtil.useExamCoupon(star)
      .then(p => {
        wx.hideLoading();
        that.checkUserPayment();
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this;
    star = parseInt(options.examNum);
    examUtils.checkExamProcess(star)
    .then(p=>{
      console.log(p.data.data)
      that.setData({
        inExam: p.data.data
      })
    })

    var that = this;
    this.data.examNumber = options.examNum;
    this.data.isPassed = options.isPassed == 'true' ? true : false;
    couponUtil.storeCoupons();
    this.checkProductBuy(5, function () {
      that.setData({
        isPurched: true,
      })
    }, function () {
      that.setData({
        isPurched: false,
      })
    });
    console.log(options.isPassed)

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
    var that = this;
    wx.showLoading({
      title: '正在获取信息...',
      mask: true
    });
    var examTimes = couponUtil.getTimes('exam',p=>{
      console.log(p)
      that.setData({
        examTimes: p
      })
    });


    this.checkUserRight(star, function () {
      wx.hideLoading()
    }, function () {
      wx.hideLoading()
    })
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