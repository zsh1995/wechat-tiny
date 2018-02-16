// 引入算分算法
var util = require('../../utils/score')
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');
//
var coupond = require('../../utils/coupon');
var payUtils = require('../../utils/payUtils');
// 引入配置
var config = require('../../config');
//exam
var examAjax = require('../../utils/exam')

var internalList = new Array();
var upperSlider = null;
var swipperPage = null;

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000,
});

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

var chooseList = [];

var score = 0;

var groupId;

var stars;

var type;

var execCount = 0;

var intFunction = null;

//
var screenSize = {
  width: 360,
  height: 0,
};

var screenWidth = 360;
var screenHeight = 0;

var intervalList = [];


// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};


Page({
  data: {
    type: "交流基地",
    currentPage: 0,
    commBaseMessage: "以下交流基地在每周一至六14:00 – 15:30都有交流会，建议你一周来一次，可以认识很多高质量朋友（含异性朋友）。需喝一瓶水或一杯茶（咖啡）\n 参加六次可申请教育部“职业沟通能力证书”（详情请看高商联盟简介 – 加盟训练）。 \n 1、北京 \n 1）学院路地区：清华大学观畴园地下一层紫荆书咖 \n 2）回龙观地区：（待定）",
    showPullTips: false,
    loginUrl: config.service.loginUrl,
    requestUrl: config.service.requestUrl,
    questionUrl: `https://${config.service.host}/ajax/exam/getQuestions`,
    examUrl: `https://${config.service.host}/exam/getExamQuestions`,
    paymentUrl: `https://${config.service.host}/pay/payEncap`,
    checkUrl: `https://${config.service.host}/pay/analyse/checkPurchRecord`,
    couponInfoUrl: `https://${config.service.host}/coupon/userCoupon`,
    couponUseUrl: `https://${config.service.host}/coupon/useCoupon`,
    isSelect: false,
    attitude: ['非常支持', '比较支持', '中立/不必探讨', '比较反对', '非常反对'],
    selectdata: {
      isSelect: false,
      selectedId: 0
    },
    titleStyle: 'bottom-disappear',
    answers: {
      allLists: [],//题号数据
      isShowTip: false//默认是否显示提示
    },
    color: 'green'
  },
  bindCommBase: function (e) {
    wx.showModal({
      title: ' ',
      showCancel: false,
      confirmText: "关 闭",
      content: this.data.commBaseMessage,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  bindViewTap: function () {
    this.setData({
      color: 'blue'
    })
  },
  //swiper切换
  setEvent: function (e) {
    console.log('setEvent');
    upperSlider.ontouch(e);
    this.setData(this.data);
    return false;
  },
  onmove: function (e) {
    console.log('onmove')
    upperSlider.onmove(e);
  },
  //滑动结束
  touchEnd: function (e) {
    console.log('touchEnd');
    upperSlider.onend(e);
    return false;
  },

  //获得手势方向
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

  onPullDown: function () {
    this.setData({
      titleStyle: 'bottom-disappear'
    });
    upperSlider.hide();
  },
  onPullUp: function () {
    this.setData({
      titleStyle: ''
    });
  },
  touchViewStart: function (e) {
    console.log("touchViewStart");
    this.data.isSelect = false;
    var currentPage = swipperPage.getCurrentPageId();
    chooseList[currentPage] = -1;
    this.data.chooseList[currentPage] = -1;
    this.setData(this.data);
  },
  touchViewEnd: function (e) {
    console.log("touchViewEnd");
  },
  tapCheckbox: function (e) {
    var tapId = e.currentTarget.dataset.option;
    console.log("tapCheckbox" + tapId);
    var options = this.data.answers.allLists[swipperPage.getCurrentPageId()].options;
    this.data.isSelect = true;
    this.data.selectdata.selectedId = tapId;
    this.setData(this.data);
    this.touchInsure();
  },
  changePage: function (dire) {
    if (dire == 'left') {

    } else if (dire == 'right') {

    }
  },
  touchInsure: function (e) {
    console.log("tapInsure");
    this.data.isSelect = true;
    //更新选项表
    var allLists = this.data.answers.allLists;
    var currentPage = swipperPage.getCurrentPageId();
    chooseList[currentPage] = this.data.selectdata.selectedId;
    this.data.chooseList = chooseList;
    this.setData(this.data);
    //检查未做题目
    var itemNoChoose = this.checkIsAllChoose(chooseList)
    if (itemNoChoose.length == 0) {
      var mScore = 0;
      for (var index in chooseList) {
        mScore += util.calculateScore(allLists[index].type, chooseList[index]);
      }
      wx.redirectTo({
        url: '../examResult/examResult?score=' + mScore + '&group_id=' + groupId + '&stars=' + stars + '&type=' + type + '&chooseList=' + chooseList
      });
    }

    if (swipperPage.isOnLast()) {
      if (itemNoChoose.length > 0) {
        wx.showModal({
          content: '还有未完成的题目（' + itemNoChoose + '）',
          showCancel: false
        })
      }
    }
    // 翻页
    setTimeout(p => swipperPage.nextPage(), 600)
    return false;
  },
  onScroll: function (e) {
    this.setData({
      showPullTips: false
    })
  },

  checkIsAllChoose: function (chooseList) {
    var noChooseList = []
    for (var item in chooseList) {
      if (chooseList[item] == -1) {
        noChooseList.push(parseInt(item) + 1)
      }
    }
    return noChooseList
  },




  checkUserRight: function (star, callback_success, callback_fail) {
    var that = this;
    var currentPage = this.data.currentPage;
    var currentItem = this.data.answers.allLists[currentPage];
    var questionId = currentItem.questionId
    console.log('is checking UserRight')
    examAjax.checkAnalysePurched(star,questionId)
      .then(result=>{
        that.data.isPurched = result.data.data.isPurched;
        that.setData(that.data)
        if (result.data.data.isPurched)
          callback_success();
        else
          callback_fail();
      })
  },

  _checkUserRight: function (star, callback_success, callback_fail, whos) {
    return function () {
      whos.checkUserRight(star, callback_success, callback_fail)
    }
  },




  requestPayment: function (obj) {
    console.log("requestPay:" + obj);
    var currentPage = this.data.currentPage;
    var currentItem = this.data.answers.allLists[currentPage];
    var questionId = currentItem.questionId
    var that = this;
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.repay_id,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
        console.log("success");
        wx.showLoading({
          title: '后台处理中',
          mask: true
        });
        var intFunction = setInterval(
          that._checkUserRight(stars,
            function () {
              wx.hideLoading()
              clearInterval(internalList.pop())
              that.data.answers.allLists[currentPage].isPurchAnalyse = 1;
              that.setData(that.data)
              //跳转
              wx.navigateTo({
                url: '../analysePage/analysePage?star=' + stars + '&questionId=' + questionId,
              })
            },
            function () {
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
      'fail': function (res) {
        console.log("fail");
      }
    })
  },

  bindClickAnalyse: function (e) {
    // todo 如果已经购买，直接加载解析

    // todo 如果未购买，弹窗提示
    //

  },



  bindAnalyse: function (e) {
    var currentPage = this.data.currentPage;
    var currentItem = this.data.answers.allLists[currentPage];
    if (currentItem.isPurchAnalyse == null) currentItem.isPurchAnalyse = 0
    var questionId = currentItem.questionId
    var that = this;
    if (currentItem.isPurchAnalyse != 0) {
      wx.navigateTo({
        url: '../analysePage/analysePage?star=' + stars + '&questionId=' + questionId,
      })
    } else {
      var analyseTimes = 0;

      try {
        analyseTimes = wx.getStorageSync('couponInfos').analyseTimes

      } catch (e) {
        console.log("analyseTims erro")
      }

      var countString = ""
      var url;
  

      wx.showModal({
        title: '温馨提示',
        content: '前三个解析免费（您当前还有' + analyseTimes + '次免费机会），之后收费5元/个，鼓励共享！此收入捐赠给佛山启智和北京美新路公益机构。你本人或身边的人需要资助，也可以联系我们！',
        success: function (res) {
          if (res.confirm) {
            if (analyseTimes > 0) {
              //countString = "但您有" + analyseTimes +"次免费机会，点击确定使用。"
              coupond.useAnalyseCoupon(stars, questionId, currentPage + 1, groupId)
                .then(p => {
                  that.data.answers.allLists[currentPage].isPurchAnalyse = 1;
                  that.setData(that.data)
                  wx.setStorageSync('couponInfos', {
                    analyseTimes: analyseTimes - 1
                  })
                  wx.navigateTo({
                    url: '../analysePage/analysePage?star=' + stars + '&questionId=' + questionId,
                  })
                })
            } else {
              //countString = '点击确定进行购买'
              payUtils.doPayAnalyse(stars, questionId, currentPage + 1, groupId)
                .then(p=>{
                  that.requestPayment(p.data)
                })
            }          
          }
        }
      })
    }
  },

  bindTips: function (e) {
    var currentPage = this.data.currentPage;
    var that = this;
    wx.showModal({
      title: ' ',
      showCancel: false,
      confirmText: "关 闭",
      content: "tips" in that.data.answers.allLists[currentPage] ? that.data.answers.allLists[currentPage].tips : "no message",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  getFields: function () {
    var that = this;
    var worker = setInterval(p => {
      wx.createSelectorQuery().select('#mainContent' + swipperPage.getCurrentPageId()).boundingClientRect(function (rect) {
        if (rect == null) return;
        console.log("debug:height" + rect.height + "width" + rect.width + "screenWidth:" + screenWidth + "screenHeight:" + screenHeight + "canIuse:" + wx.canIUse("getSystemInfoSync.return.screenWidth"))
        if (rect.height * 750 / screenWidth > 530) {
          that.setData({
            showPullTips: true
          })
        }
        clearInterval(intervalList.pop())
      }).exec()
    }, 200)
    intervalList.push(worker);
  },

  _pullQuestions: function () {
    var that = this;
    return examAjax.getPraciceQuestions(parseInt(stars), groupId)
  },
  _decorateQuestionList: function (data) {
    var resultData = data;
    var cnt = 0;
    var colors = ["#999999", "#2BB675", "#FFE51A", "#ED662C", "#6A6869"]
    var mOptions = [{ color: "#999999", font: "black", text: '非常\n支持' }, { color: "#2BB675", font: "white", text: '比较\n支持' }, { color: "#FFE51A", font: "black", text: '中立' }, { color: "#ED662C", font: "white", text: '比较\n反对' }, { color: "#6A6869", font: "white", text: '非常\n反对' }]
    for (var i = 0; i < resultData.length; i++) {
      resultData[i].content = resultData[i].content.replace(/\\n/, "\n");
      resultData[i].index = i;
      resultData[i].options = mOptions
    }
    return resultData;
  },
  getExam: function () {
    var that = this;
    examAjax.getExamQuestions(parseInt(stars))
      .then(
      result => {
        that.data.answers.allLists = this._decorateQuestionList(result.data.data);
        that.setData(that.data);
      })
      .then(value => wx.hideLoading())
  },

  pullQuestions: function () {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    this._pullQuestions()
      .then(result => {
        that.data.answers.allLists = this._decorateQuestionList(result.data.data);
        that.setData(that.data);
      })
      .then(value => wx.hideLoading())
  },

  getCoupons() {
    coupond.storeCoupons();

  },

  getStarString: function (star) {
    var str = '';
    switch (star) {
      case 1: str = '一星级'; break;
      case 2: str = '二星级'; break;
      case 3: str = '三星级'; break;
    }
    return str;

  },

  strToArray: function (str) {
    var temp = str.split(',');
    temp.forEach(function (value, index, array) { array[index] = parseInt(value) })
    return temp;

  },

  onLoad(params) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        screenWidth = res.screenWidth;
        screenHeight = res.screenHeight;
      }
    })
    upperSlider = this.selectComponent('#us');
    swipperPage = this.selectComponent('#swipper-page');
    swipperPage.setPageChangeCallback(p => {
      that.data.isSelect = true;
      that.data.showPullTips = false;
      that.data.currentPage = swipperPage.getCurrentPageId();
      console.log('currentPage:' + swipperPage.getCurrentPageId())
      that.data.selectdata.selectedId = that.data.chooseList[swipperPage.getCurrentPageId()]
      that.setData(that.data);
      that.onPullDown();
    });
    swipperPage.setOnLoadPage(p => {
      that.getFields();
    })

    chooseList = params.chooseList == null ? [-1, -1, -1, -1, -1, -1] : this.strToArray(params.chooseList);
    this.data.chooseList = chooseList;
    this.data.isSelect = (params.chooseList != null);
    this.data.selectdata.selectedId = chooseList[0];
    this.getCoupons();
    stars = parseInt(params.item);

    type = params.type;
    this.data.type = params.type;


    if (params.type == 'exam') {
      groupId = 0;
      wx.setNavigationBarTitle({
        title: this.getStarString(stars) + '·认证'
      })
      this.getExam();
    } else if (params.type == 'practice') {
      groupId = params.group;
      wx.setNavigationBarTitle({
        title: this.getStarString(stars) + '·0' + params.group + '组'
      })
      this.pullQuestions();
    } else if (params.type == 'enroll') {
      groupId = params.group;
      wx.setNavigationBarTitle({
        title: '报名·基础测试'
      })
      this.pullQuestions(this.data.questionUrl);

    }
    var res = wx.getSystemInfoSync()
    screenWidth = res.screenWidth;
    this.setData(this.data)
  },

  onShow: function (e) {
    score = 0;
  },
  onReady: function () {

  },
})