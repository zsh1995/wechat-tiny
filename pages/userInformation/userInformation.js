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
    updataUserInfo: 'https://78662138.qcloud.la/gslm/userInfo/updateUserInfo', 
    requestUserInfo:'https://78662138.qcloud.la/gslm/userInfo/getUserInfo',
    onModify:false,
    ourUserInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.requestUserInfo();
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

  testlogin : function (){
    showBusy('正在登录');

    // 登录之前需要调用 qcloud.setLoginUrl() 设置登录地址，不过我们在 app.js 的入口里面已经调用过了，后面就不用再调用了
    qcloud.login({
      success(result) {
        showSuccess('登录成功');
        console.log('登录成功', result);
      },

      fail(error) {
        showModel('登录失败', error);
        console.log('登录失败', error);
      }
    });

  },
  requestUserInfo:function(e){
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
        that.setData(that.data);
      },
      fail(error) {
        that.data.ourUserInfo = {userName:"未获取到数据"};
        that.setData(that.data);
      },
      complete() {
      }

    });
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