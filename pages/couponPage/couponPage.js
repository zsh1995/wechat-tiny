// pages/couponPage/couponPage.js
let recordTypes = ['全部','解析券','测试券']
let couponUtil = require('../../utils/coupon.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordTypes: recordTypes,
    typeId:0,
  },

  chooseType(e){
    var that = this;
    let couponList
    let typeId = e.detail.value
    if (typeId == 0) {
      couponList = that.data.realcouponList
    } else if (typeId == 1) {
      couponList = that.data.realcouponList.filter(item => item.couponId == 1)
    } else if (typeId == 2) {
      couponList = that.data.realcouponList.filter(item => item.couponId == 2)
    }
    this.setData({
      typeId: e.detail.value,
      couponList: couponList,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    couponUtil.ajaxCoupons(p=>{
      for(var cnt in p){
        if(p[cnt].couponId == 1){
          console.log('1')
          p[cnt].name='解析券'
        }else{
          console.log('2')
          p[cnt].name='测试券'
        }
        if(p[cnt].source == 0){
          p[cnt].name +='·报名赠送'
        } else if (p[cnt].source == 1) {
          p[cnt].name += '·新用户赠'
        } else if (p[cnt].source == 2) {
          p[cnt].name += '·填邀请人赠'
        }
        if(p[cnt].usedFlag == 1){
          p[cnt].name += '（已使用）'
        }
      }
      this.setData({
        couponList: p,
        realcouponList: p,
      })
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