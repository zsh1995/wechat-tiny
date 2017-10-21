// userInformation.js
var app = getApp()

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');


// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});



Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    requestUrl: config.service.requestUrl,
    updataUserInfo: `https://${config.service.host}/gslm/userInfo/updateUserInfo`, 
    requestUserInfo:`https://${config.service.host}/gslm/userInfo/getUserInfo`,
    payrecordurl: `https://${config.service.host}/gslm/pay/getPurchRecord`,
    onModify:false,
    ourUserInfo:{}
  },
  turnOver: function(event){
    // 暂不启用
    /*
    setTimeout((function () {
      this.setData({
        cardboxStyle: 'opacity:0;transform: rotateX(180deg);',
        cardboxStyleAnti: 'opacity: 1;transform: rotateX(0);'
      })
    }).bind(this), 600)

    this.setData({
      cardboxStyle: 'animation:turnover .5s ease-in-out;animation-fill-mode:forwards;',
      cardboxStyleAnti: 'animation:turnback .5s ease-in-out;animation-fill-mode:forwards;'
    })
    */
  },
  turnBack: function (event) {
    this.setData({
      cardboxStyle: this.data.cardboxStyle+'animation:turnback .5s ease-in-out;animation-fill-mode:forwards;',
      cardboxStyleAnti: this.data.cardboxStyleAnti+'animation:turnover .5s ease-in-out;animation-fill-mode:forwards;'
    })
    setTimeout((function () {
      this.setData({
        cardboxStyle: '',
        cardboxStyleAnti: ''
      })
    }).bind(this), 600)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })  
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
    this.requestUserInfo('invitor', function (userdata) {
      console.log("debugger_userInformation:userdata.invitor" + userdata.invitor)
      if (userdata.invitor == null || userdata.invitor == '') {
        wx.showModal({
          content: 'Tip：你还没有填写邀请人',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../../pages/invitorPage/invitorPage',
              })
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  onModifyBind:function(e){
    this.data.onModify = !this.data.onModify;
    this.setData(this.data);
  },

  bindEdit:function(e){
    wx.navigateTo({
      url: '../../pages/detailInformation/detailInformation',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  getPayRecord:function(e){
    wx.navigateTo({
      url: '../../pages/purchRecord/purchRecord',
    })
  },
  
  requestUserInfo:function(e,callback){
    var that = this;
    qcloud.request({
      url: this.data.requestUserInfo,
      login: true,
      method: 'POST',
      data:{
        userName:"test"
      },
      success(result) {
        console.log("success:"+result);
        that.data.ourUserInfo = result.data.data.userInfo;
        var tempZero = '';
        that.data.ourUserInfo.id = that.data.ourUserInfo.id.toString();
        var len = that.data.ourUserInfo.id.length;
        for(var cnt = 0 ;cnt < 8 - len;cnt++){
          tempZero = tempZero.concat('0');
        }
        console.log('debug id');
        that.data.ourUserInfo.id = tempZero.concat(that.data.ourUserInfo.id)
        that.setData(that.data);
        if(callback){
          callback(result.data.data.userInfo);
        }
      },
      fail(error) {
        that.data.ourUserInfo = {userName:"未获取到数据"};
        that.setData(that.data);
      },
      complete() {
      }

    });
  },

  bindInvitor :function(e){
    wx.navigateTo({
      url: '../../pages/invitorList/invitorList',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onSubmit :function(event){
    showBusy('正在提交');
    var that = this;
    qcloud.request({
      url: this.data.updataUserInfo,
      login: true,
      data: event.detail.value,
      method: 'POST',
      success(result) {
        that.requestUserInfo();
        that.data.onModify = false;
        that.setData(that.data);
        showSuccess('提交成功！');
      },
      fail(error) {
        showModel('提交失败', error);
        console.log('request fail', error);
      },
      complete() {
        console.log('request complete');
      }

    });
    console.log(event.detail.value)
  }
})