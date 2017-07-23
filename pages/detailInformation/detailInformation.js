// detailInformation.js
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    updataUserInfo: 'https://78662138.qcloud.la/gslm/userInfo/updateUserInfo',
    requestUserInfo: 'https://78662138.qcloud.la/gslm/userInfo/getUserInfo',
    region: ['广东省', '广州市', '海珠区'],
    identities:["在职","学生"],
    genders:['女生','男生'],
    mIdentity:"",
    identityId:0,
    genderId:0,
    schoolName:"选择您的学校"
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  chooseGender: function (e){
    this.setData({
      genderId:e.detail.value
    })
  },

  chooseIdentity:function(e){
    this.setData({
      identityId: e.detail.value
    })
  },
  onSubmit:function(e){
    var userInfo = e.detail.value;
    userInfo.gender = this.data.genders[parseInt(userInfo.gender)]
    userInfo.type = this.data.identities[parseInt(userInfo.identity)]
    var mSchool = this.data.schoolName
    mSchool = mSchool == '选择您的学校'?null:mSchool
    userInfo.school = mSchool
    userInfo.city = userInfo.city[1]
    console.log('提交：' + userInfo)
    var that = this;
    qcloud.request({
      url: this.data.updataUserInfo,
      login: true,
      data: userInfo,
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
    wx.navigateBack()
  },
  chooseSchool:function(e){
    wx.navigateTo({
      url: '../../pages/schoolChoose/schoolChoose',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
  
  }
})