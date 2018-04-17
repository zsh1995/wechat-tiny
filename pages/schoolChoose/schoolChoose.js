// schoolChoose.js
let company = require('../../utils/company')
let utils = require('../../utils/util')
let page = 0
let allCount = 0
var lockOfPull = {
  lockPull: false,
  lock: function () {
    this.lockPull = true;
  },
  unlock: function () {
    this.lockPull = false;
  },
  isLocked: function () {
    return this.lockPull;
  }
};
let __search

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    isSearch: false,
    inputVal: "",
    schoolInfoList: [],
    load: true,
    oneMore: false,
  },
  inputSchool: function (e) {
    this.setData({
      scrollTop: 0,
      isSearch: false,
      inputShowed: true,
      inputVal: e.currentTarget.dataset.options
    });
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      schoolName: e.currentTarget.dataset.options
    })
    wx.navigateBack()

  },
  showInput: function () {
    this.setData({
      inputShowed: true,
      isSearch: true,
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  _inputTyping(value){
    page = 0
    this._search(value)
    this.setData({
      inputVal: value,
      load: true,
      oneMore: false,
    })
  },
  clearInput: function () {
    this._inputTyping("")
  },
  _search(name) {
    let that = this
    if (__search == null) {
      __search = utils.debounce(1500, function (name) {
        company.searchSchool(name, 0, 15)
          .then(p => {
            allCount = p.data.data[p.data.data.length - 1].allCount
            that.setData({
              schoolInfoList: p.data.data.slice(0, p.data.data.length - 1)
            })
          })
      })
      __search(name)
    }
    else
      __search(name)
  },
  onSearch: function (e) {
    page = 0
    this._search(name)
    this.setData({
      load: false,
    })
  },
  onScroll: function (e) {
    if (this.data.schoolInfoList.length == 0) return;
    this.setData({
      oneMore: true,
    })
  },
  inputTyping: function (e) {
    this._inputTyping(e.detail.value)
  },


  findShcool(schoolName) {
    company.searchSchool(schoolName, 0, 15)
      .then(p => {
        console.log(p.data.data)
        this.setData({
          schoolInfoList: p.data.data.slice(0, p.data.data.length - 1)
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    allCount = 0
    __search = null
    this.getPages(0, 15)
      .then(p => {
        this.setData({
          schoolInfoList: p.slice(0, p.length - 1)
        })
      })
  },
  getNextPage: function () {
    page++;
    var that = this;
    this.getPages(page * 15, 15)
      .then(p => {
        if (page * 15 >= allCount) that.data.load = false;
        that.data.schoolInfoList = that.data.schoolInfoList.concat(p)
        that.data.hideHeadFlag = true;
        lockOfPull.unlock();
        that.setData(that.data)
      });
  },
  getPages: function (page, count) {
    return company.searchSchool('', page, count)
      .then(p => {
        allCount = p.data.data[p.data.data.length - 1].allCount
        return Promise.resolve(p.data.data.slice(0, p.data.data.length - 1))
      })
  },

  onBottom(e) {
    if (lockOfPull.isLocked()) return;
    lockOfPull.lock();
    this.getNextPage();
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