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
    updataUserInfo: `https://${config.service.host}/userInfo/updateUserInfo`,
    requestUserInfoURL: `https://${config.service.host}/userInfo/getUserInfo`,
    region: ['', '广州市', ''],
    identities:["在职","学生"],
    genders:['女生','男生'],
    mIdentity:"",
    identityId:0,
    genderId:0,
    schoolName:"选择您的学校",
    subUserInfo:{name:''},
  },

  bindRegionChange: function (e) {
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
    console.log(userInfo.identityId)
    userInfo.type = this.data.identities[parseInt(userInfo.type)]
    var mSchool = this.data.schoolName
    mSchool = mSchool == '选择您的学校'?'':mSchool
    userInfo.school = mSchool
    userInfo.city = this.data.region[1]
    var that = this;
    //
    console.log(userInfo.student_name)
    for (var attr in userInfo){
      if (userInfo[attr] == ''){
        userInfo[attr] = this.data.subUserInfo[attr] == null ? '' : this.data.subUserInfo[attr]
      }
    }
    qcloud.request({
      url: this.data.updataUserInfo,
      login: true,
      data: userInfo,
      method: 'POST',
      success(result) {
        //that.requestUserInfo();
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

  requestUserInfo: function (a) {
    var that = this;
    qcloud.request({
      url: this.data.requestUserInfoURL,
      login: true,
      method: 'POST',
      data: {
        userName: "test1"
      },
      success(result) {
        if (result.data.data.userInfo.type == '学生'){
          that.data.identityId = 1;
        }
        if (result.data.data.userInfo.gender == '男生')
            that.data.genderId = 1;
        that.data.schoolName = result.data.data.userInfo.school == '' ? '选择您的学校' : result.data.data.userInfo.school;
        if (result.data.data.userInfo.city != ''){
          that.data.region[1] = result.data.data.userInfo.city
        }
        that.data.subUserInfo = result.data.data.userInfo
        that.data.subUserInfo.userName = result.data.data.userInfo.student_name
        that.data.subUserInfo.userMobile = result.data.data.userInfo.phoneNumber
        that.setData(that.data);
      },
      fail(error) {
        that.data.ourUserInfo = { userName: "未获取到数据" };
        that.setData(that.data);
      },
      complete() {
      }

    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // todo pull userinfo
      this.requestUserInfo();

      // todo fill data
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