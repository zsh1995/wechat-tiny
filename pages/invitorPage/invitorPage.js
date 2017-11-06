// invitorPage.js

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    invitor_avator:"",
    updataUserInfo: `https://${config.service.host}/userInfo/setInvitor`,
    requestUserInfo: `https://${config.service.host}/userInfo/getInvitor`

  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  chooseInvitor:function(){

    var that = this;
    qcloud.request({
      url: this.data.updataUserInfo,
      login: true,
      method: 'POST',
      data: {
        invitorId: this.data.inputVal
      },
      success(result) {
        console.log("success:" + result);
        if (result.data.code == 0) { 
          wx.navigateBack({})
        }else{
          wx.showToast({
            title: result.data.message,
            icon: 'loading',
            mask:true
          })
        }
        
        
      },
      fail(error) {
        that.data.ourUserInfo = { userName: "未获取到数据" };
        that.setData(that.data);
      },
      complete() {
      }

    });

  },
  inputTyping: function (e) {
    var that = this;
    qcloud.request({
      url: this.data.requestUserInfo,
      login: true,
      method: 'POST',
      data: {
        invitorId: e.detail.value
      },
      success(result) {
        console.log("success:" + result);
        that.data.invitor_avator = result.data.data.avatar_url;
        that.data.invitor_name = result.data.data.name
        that.setData(that.data);
      },
      fail(error) {
        that.data.ourUserInfo = { userName: "未获取到数据" };
        that.setData(that.data);
      },
      complete() {
      }

    });
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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