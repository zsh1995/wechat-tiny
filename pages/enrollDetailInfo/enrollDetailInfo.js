// pages/enrollDetailInfo/enrollDetailInfo.js
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');
var userUtil = require('../../utils/user.js')
var companyUtil = require('../../utils/company.js')
<<<<<<< HEAD
=======
let upperSlider = null;
>>>>>>> 修改
let giftContext = [
  { title: '\n3个解析券\n', content: '免费查看三个解析;\n' },
  { title: '\n1个星级测试券\n', content: '免费进行1次星级测试；\n\n' },
]
<<<<<<< HEAD
Page({

=======
var enrollTips = [{ content: "可以暂时空缺\n\n" }, {
  content: "之后在“我 - 企业直推”中填写" }]

var oInformation = [{ content: "我们希望了解你的学校，年级\n\n" }, {
  content: "我们优先向企业的正式岗位推荐应届毕业生;\n\n"
}, {
    content: "需要实习推荐的同学也可以给我们留言\n\n"
  }]
Page({

  onstart (e) {
    upperSlider.ontouch(e)
  },
  onmove (e) {
    upperSlider.onmove(e)
  },
  onend(e) {
    upperSlider.onend(e)
  },
>>>>>>> 修改
  /**
   * 页面的初始数据
   */
  data: {
    showToast: true,
    steps: 1,
    schoolName: '选择您的学校',
    updataUserInfo: `https://${config.service.host}/userInfo/updateUserInfo`,
<<<<<<< HEAD
    nextStepText: '下一步：填写基本信息',
    giftContext: giftContext,
=======
    nextStepText: '下一步：基本信息',
    giftContext: giftContext,
    enrollTips: enrollTips,
>>>>>>> 修改
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
<<<<<<< HEAD
=======
          wx.setNavigationBarTitle({
            text: '报名完成！',
          })
>>>>>>> 修改
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
<<<<<<< HEAD
=======
    upperSlider = this.selectComponent('#us')
>>>>>>> 修改

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
<<<<<<< HEAD

=======
    setTimeout(() => {
      upperSlider.show()
    }, 1000)
>>>>>>> 修改
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
<<<<<<< HEAD
      wx.setTopBarText({
        text: '报名·基本信息',
      })
      this.setData({
        steps: this.data.steps + 1,
        nextStepText: '我要报名',
=======
      wx.setNavigationBarTitle({
        title: '报名·基本信息',
      })
      upperSlider.show()
      this.setData({
        steps: this.data.steps + 1,
        nextStepText: '最后一步·见面礼！',
        enrollTips: oInformation,
>>>>>>> 修改
      })
    }

  }

})