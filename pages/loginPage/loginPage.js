// pages/loginPage/loginPage.js
let message = '高尚苑申请获取以下权限:'
let rightInfo = '获得你的公开信息（昵称、头像等）'
var utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: message,
    rightInfo: rightInfo,
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
  
  },

  bindgetuserinfo(e) {
    let that = this
    wx.setStorage({
      key: 'userResult',
      data: e.detail,
      success: function (res) {
        utils.qcloulogin()
          .then(() => {
            wx.showToast({
              title: '登陆成功！',
              duration: 1200,
              mask: true,
              success: function (res) {
                wx.navigateBack({
                  delta: 1
                })
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          })

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


})