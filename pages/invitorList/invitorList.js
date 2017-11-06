// invitorList.js


// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    invitorList:[],
    myInvitor:{},
    invitorListUrl: `https://${config.service.host}/userInfo/getInvitedList`
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    qcloud.request({
      url: this.data.invitorListUrl,
      login: true,
      method: 'POST',
      data: {},
      success(result) {
        console.log("success:" + result);
        if (result.data.data.myInvitor.name == null && result.data.data.myInvitor.avatar_url == null){
          result.data.data.myInvitor={
            name:'无',
            avatar_url:null
          }
        }
        that.setData({
          invitorList:result.data.data.invitedList,
          myInvitor: result.data.data.myInvitor
        })
        
      },
      fail(error) {
        
      },
      complete() {
      }

    });
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