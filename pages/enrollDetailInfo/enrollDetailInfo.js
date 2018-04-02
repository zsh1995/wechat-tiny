// pages/enrollDetailInfo/enrollDetailInfo.js
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');
var userUtil = require('../../utils/user.js')
var companyUtil = require('../../utils/company.js')
let giftContext = [
  { title: '\n3个解析券\n', content: '免费查看三个解析;\n' },
  { title: '\n1个星级测试券\n', content: '免费进行1次星级测试；\n\n' },
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showToast: true,
    steps: 1,
    schoolName: '选择您的学校',
    updataUserInfo: `https://${config.service.host}/userInfo/updateUserInfo`,
    nextStepText: '下一步：填写基本信息',
    giftContext: giftContext,
  },

  chooseSchool: function (e) {
    wx.navigateTo({
      url: '../../pages/schoolChoose/schoolChoose',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onSubmit: function (e) {
    console.log(e)
  },
  toPublicAccount(){
    wx.previewImage({
      urls: ['https://s1.ax1x.com/2018/03/27/9OWcJe.png'],
    })
  },
  onSubmit: function (e) {
    if (this.data.steps == 1) return;
    var userInfo = e.detail.value;
    var mSchool = this.data.schoolName
    mSchool = mSchool == '选择您的学校' ? '' : mSchool
    userInfo.school = mSchool
    userInfo.userChannel = '1';
    var that = this;
    let companys = [userInfo.wantedCompany1, userInfo.wantedCompany2, userInfo.wantedCompany3]
    Promise.all([userUtil.uploadUserInfo(userInfo), companyUtil.uploadCompanys(companys)])
      .then(p => {
        wx.showToast({
          title: '成功',
        })
        setTimeout(p => {
          that.setData({
            steps:3,
          })
        }, 1200)
      })
      .catch(p => {
        wx.showToast({
          title: p.message,
        })
      })

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
  navigator: function () {
    wx.switchTab({
      url: '../../pages/examItems/examItems'
    })
  },
  nextStep: function () {
    if (this.data.steps == 2) {

    } else {
      wx.setTopBarText({
        text: '报名·基本信息',
      })
      this.setData({
        steps: this.data.steps + 1,
        nextStepText: '我要报名',
      })
    }

  }

})